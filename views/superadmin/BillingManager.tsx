import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Building2,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Search,
  Eye,
} from 'lucide-react';
import { supabase } from '../../services/supabase';

interface Tenant {
  id: string;
  name: string;
  niche: string;
  plan: string;
  status: string;
  created_at: string;
}

const planPrices: Record<string, number> = {
  starter: 97,
  professional: 197,
  enterprise: 497,
  custom: 0,
};

const BillingManager: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });
      setTenants(data || []);
    };
    load();
  }, []);

  const filteredTenants = tenants.filter((t) =>
    t.name?.toLowerCase().includes(filter.toLowerCase())
  );
  const totalMRR = tenants.reduce(
    (sum, t) => sum + (planPrices[t.plan] || 97),
    0
  );
  const activeCount = tenants.filter((t) => t.status === 'active').length;
  const overdueCount = 0; // placeholder

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <DollarSign className="text-emerald-600" size={28} />
          Billing Manager
        </h1>
        <p className="text-gray-500 mt-1">
          Gestão de receita, planos e faturamento dos tenants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            icon: DollarSign,
            label: 'MRR Total',
            value: `R$ ${totalMRR.toLocaleString('pt-BR')}`,
            color: 'bg-emerald-500',
          },
          {
            icon: Building2,
            label: 'Tenants Ativos',
            value: String(activeCount),
            color: 'bg-blue-500',
          },
          {
            icon: CreditCard,
            label: 'Em dia',
            value: String(activeCount - overdueCount),
            color: 'bg-green-500',
          },
          {
            icon: AlertTriangle,
            label: 'Inadimplentes',
            value: String(overdueCount),
            color: 'bg-red-500',
          },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {s.label}
              </p>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${s.color} text-white shadow-lg`}>
              <s.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Revenue by Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Receita por Plano
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['starter', 'professional', 'enterprise'].map((plan) => {
            const count = tenants.filter((t) => t.plan === plan).length;
            const revenue = count * (planPrices[plan] || 0);
            return (
              <div
                key={plan}
                className="p-4 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700 capitalize">
                    {plan}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {count} tenants
                  </span>
                </div>
                <p className="text-xl font-bold text-emerald-600">
                  R$ {revenue.toLocaleString('pt-BR')}/mês
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  R$ {planPrices[plan]}/tenant
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tenant Billing Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search size={18} className="text-gray-400" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Buscar imobiliária..."
            className="flex-1 outline-none text-sm"
          />
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Imobiliária
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Nicho
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Plano
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Valor
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  Nenhum tenant encontrado
                </td>
              </tr>
            ) : (
              filteredTenants.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {t.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                    {t.niche || 'traditional'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                    {t.plan || 'starter'}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-600">
                    R$ {(planPrices[t.plan] || 97).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${t.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {t.status || 'active'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingManager;
