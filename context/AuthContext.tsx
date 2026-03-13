import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabase';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'broker' | 'superadmin';
  avatar_url?: string;
  organization_id?: string;
  organization?: {
    id: string;
    name: string;
    slug: string;
    niche: 'rural' | 'traditional' | 'hybrid';
  };
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  impersonateOrganization: (orgId: string) => Promise<void>;
  stopImpersonation: () => void;
  isImpersonating: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isImpersonating, setIsImpersonating] = useState(false);

  useEffect(() => {
    // Check for existing impersonation - ONLY if already logged in or session found
    const impOrgId = sessionStorage.getItem('impersonated_org_id');
    // We don't set isImpersonating to true here blindly anymore, 
    // we let loadProfile handle it after verifying the role.

    // BUG 3 FIX: Removed redundant getSession(). 
    // onAuthStateChange fires with INITIAL_SESSION immediately on mount,
    // so getSession() creates a race condition where loadProfile is called twice.

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('🔄 [AuthContext] Auth Event:', _event, 'User:', session?.user?.id);
      if (session?.user) {
        setUser(session.user);
        await loadProfile(session.user.id);
      } else {
        console.log('🔄 [AuthContext] Auth Event: User is null');
        setUser(null);
        setProfile(null);
        setIsImpersonating(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Ref to prevent multiple simultaneous profile fetches
  const fetchInProgress = React.useRef<string | null>(null);

  const loadProfile = async (userId: string) => {
    // If already fetching THIS user, don't repeat
    if (fetchInProgress.current === userId) return;
    
    try {
      fetchInProgress.current = userId;
      // Define a flag to track if we're silently refreshing so we don't flicker the loading state
      const isSilentRefresh = profile && profile.id === userId;
      if (!isSilentRefresh) {
        setLoading(true);
      }
      console.log('📡 [AuthContext] Querying profile for:', userId);
      
      // Add a timeout promise to detect if query is hanging
      const queryPromise = supabase
        .from('profiles')
        .select('*, full_name:name, organization:organizations(*)')
        .eq('id', userId)
        .single();
        
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile query timeout')), 15000)
      );

      const { data: profileData, error: profileError } = await Promise.race([queryPromise, timeoutPromise]) as any;

      console.log('📡 [AuthContext] Profile query resolved. Data:', !!profileData, 'Error:', profileError?.message);

      if (profileError) {
        console.error('❌ [AuthContext] Error loading profile:', profileError);
        setProfile(prev => (prev && prev.id === userId) ? prev : null);
        if (!profile) setIsImpersonating(false);
      } else if (profileData) {
        console.log('✅ [AuthContext] Profile core data loaded:', profileData.role);
        let finalProfile = { ...profileData };
        
        // Handle impersonation
        const impOrgId = sessionStorage.getItem('impersonated_org_id');
        
        if (profileData.role === 'superadmin' && impOrgId && impOrgId !== 'null' && impOrgId !== 'undefined') {
          console.log('🚀 [AuthContext] Checking impersonated org:', impOrgId);
          const { data: orgData, error: orgError } = await supabase
            .from('organizations')
            .select('*')
            .eq('id', impOrgId)
            .single();
            
          if (!orgError && orgData) {
            console.log('✅ [AuthContext] Impersonation active:', orgData.name);
            finalProfile = {
              ...profileData,
              organization_id: orgData.id,
              organization: orgData
            };
            setIsImpersonating(true);
          } else {
            console.warn('⚠️ [AuthContext] Impersonation failed or org not found:', orgError);
            sessionStorage.removeItem('impersonated_org_id');
            setIsImpersonating(false);
          }
        } else {
          setIsImpersonating(false);
          if (impOrgId === 'null' || impOrgId === 'undefined') {
            sessionStorage.removeItem('impersonated_org_id');
          }
        }
        
        console.log('✅ [AuthContext] Final profile set.');
        setProfile(finalProfile);
      } else {
        console.warn('⚠️ [AuthContext] Profile query returned no data.');
        setProfile(prev => (prev && prev.id === userId) ? prev : null);
      }
    } catch (err: any) {
      console.error('❌ [AuthContext] Critical exception in loadProfile:', err);
      // FIXED: Only sign out if it's explicitly a JWT expiration to avoid loops on slow networks or DB timeouts
      if (err?.message?.includes('JWT expired')) {
          console.warn('⚠️ Token expired, logging out...');
          await signOut();
      } else {
          // If it's a network error or timeout, we ONLY set profile to null if we don't already have one for this user
          setProfile(prev => (prev && prev.id === userId) ? prev : null);
      }
    } finally {
      console.log('🏁 [AuthContext] loadProfile finished.');
      fetchInProgress.current = null;
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Clear any existing impersonation data on new login
    sessionStorage.removeItem('impersonated_org_id');
    setIsImpersonating(false);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        role: 'broker'
      });
    }
  };

  const signOut = async () => {
    sessionStorage.removeItem('impersonated_org_id');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) throw error;
    await loadProfile(user.id);
  };

  const impersonateOrganization = async (orgId: string) => {
    // Basic check for superadmin (will be enforced by RLS/Backend too)
    // We fetch current role again to be sure
    const { data: currentProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user?.id)
        .single();

    if (currentProfile?.role !== 'superadmin') throw new Error('Unauthorized');
    
    console.log('🚀 Starting impersonation of:', orgId);
    sessionStorage.setItem('impersonated_org_id', orgId);
    await loadProfile(user!.id);
  };

  const stopImpersonation = () => {
    console.log('🛑 Stopping impersonation');
    sessionStorage.removeItem('impersonated_org_id');
    if (user) loadProfile(user.id);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      updateProfile, 
      impersonateOrganization,
      stopImpersonation,
      isImpersonating
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
