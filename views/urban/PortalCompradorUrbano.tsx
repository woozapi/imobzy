import React, { useState } from 'react';
import {
  Search,
  Heart,
  MapPin,
  Building2,
  Eye,
  Calendar,
  DollarSign,
  ArrowRight,
  Filter,
  Home,
  Key,
  Bed,
  Bath,
  Car,
  Maximize,
} from 'lucide-react';

const PortalCompradorUrbano: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'buscar' | 'favoritos' | 'visitas'
  >('buscar');
  const [tipo, setTipo] = useState('');

  const properties = [
    {
      id: 1,
      name: 'Apt 3Q - Ed. Primavera',
      type: 'Apartamento',
      city: 'São Paulo/SP',
      bairro: 'Vila Mariana',
      bedrooms: 3,
      baths: 2,
      parking: 2,
      area: '98m²',
      price: 'R$ 890.000',
      priceM2: 'R$ 9.082/m²',
      saved: true,
    },
    {
      id: 2,
      name: 'Cobertura Duplex',
      type: 'Cobertura',
      city: 'São Paulo/SP',
      bairro: 'Moema',
      bedrooms: 4,
      baths: 3,
      parking: 3,
      area: '250m²',
      price: 'R$ 3.200.000',
      priceM2: 'R$ 12.800/m²',
      saved: false,
    },
    {
      id: 3,
      name: 'Casa - Condomínio Verde',
      type: 'Casa',
      city: 'Campinas/SP',
      bairro: 'Barão Geraldo',
      bedrooms: 4,
      baths: 3,
      parking: 4,
      area: '320m²',
      price: 'R$ 1.850.000',
      priceM2: 'R$ 5.781/m²',
      saved: true,
    },
    {
      id: 4,
      name: 'Studio Premium',
      type: 'Studio',
      city: 'São Paulo/SP',
      bairro: 'Pinheiros',
      bedrooms: 1,
      baths: 1,
      parking: 1,
      area: '35m²',
      price: 'R$ 420.000',
      priceM2: 'R$ 12.000/m²',
      saved: false,
    },
    {
      id: 5,
      name: 'Sala Comercial',
      type: 'Comercial',
      city: 'São Paulo/SP',
      bairro: 'Faria Lima',
      bedrooms: 0,
      baths: 1,
      parking: 2,
      area: '85m²',
      price: 'R$ 1.100.000',
      priceM2: 'R$ 12.941/m²',
      saved: false,
    },
    {
      id: 6,
      name: 'Apt 2Q - Lançamento',
      type: 'Lançamento',
      city: 'Guarulhos/SP',
      bairro: 'Centro',
      bedrooms: 2,
      baths: 1,
      parking: 1,
      area: '56m²',
      price: 'R$ 380.000',
      priceM2: 'R$ 6.786/m²',
      saved: false,
    },
  ];

  const visits = [
    {
      property: 'Apt 3Q - Ed. Primavera',
      date: '12/03/2026',
      time: '14:00',
      status: 'confirmada',
    },
    {
      property: 'Cobertura Duplex',
      date: '18/03/2026',
      time: '10:00',
      status: 'pendente',
    },
  ];

  const filtered = properties.filter((p) => !tipo || p.type === tipo);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-black uppercase italic tracking-tighter flex items-center gap-3">
          <Building2 className="text-blue-600" size={32} />
          Portal do Comprador
        </h1>
        <p className="text-black/60 font-medium">
          Encontre o imóvel ideal. Venda, locação e lançamentos.
        </p>
      </div>

      <div className="flex gap-2">
        {[
          { key: 'buscar', label: 'Buscar Imóveis' },
          { key: 'favoritos', label: 'Favoritos' },
          { key: 'visitas', label: 'Visitas' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab.key ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'buscar' && (
        <>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Search size={20} className="text-slate-400" />
              <input
                placeholder="Buscar por bairro, cidade ou nome..."
                className="flex-1 outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none"
              >
                <option value="">Tipo</option>
                <option>Apartamento</option>
                <option>Casa</option>
                <option>Cobertura</option>
                <option>Comercial</option>
                <option>Studio</option>
                <option>Lançamento</option>
              </select>
              <select className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none">
                <option>Quartos</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
              </select>
              <select className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none">
                <option>Preço</option>
                <option>Até R$ 500k</option>
                <option>R$ 500k - 1M</option>
                <option>R$ 1M - 3M</option>
                <option>R$ 3M+</option>
              </select>
              <select className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none">
                <option>Finalidade</option>
                <option>Venda</option>
                <option>Locação</option>
              </select>
              <button className="bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
                <Filter size={16} /> Filtrar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="h-36 bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center relative">
                  <Building2 size={40} className="text-blue-300" />
                  <button
                    className={`absolute top-3 right-3 p-2 rounded-full ${prop.saved ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-400'} transition-all hover:scale-110`}
                  >
                    <Heart size={16} fill={prop.saved ? 'white' : 'none'} />
                  </button>
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full bg-white/90 text-blue-700 uppercase">
                    {prop.type}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-black mb-1">{prop.name}</h3>
                  <p className="text-sm text-slate-400 flex items-center gap-1 mb-3">
                    <MapPin size={14} />
                    {prop.bairro}, {prop.city}
                  </p>
                  <div className="flex items-center gap-4 mb-4 text-slate-500 text-sm">
                    {prop.bedrooms > 0 && (
                      <span className="flex items-center gap-1">
                        <Bed size={14} />
                        {prop.bedrooms}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Bath size={14} />
                      {prop.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <Car size={14} />
                      {prop.parking}
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize size={14} />
                      {prop.area}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-black text-blue-600">
                        {prop.price}
                      </p>
                      <p className="text-xs text-slate-400">{prop.priceM2}</p>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-100 transition-all">
                      Ver <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'favoritos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties
            .filter((p) => p.saved)
            .map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Building2 size={28} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-black">{prop.name}</h3>
                  <p className="text-sm text-slate-400">
                    {prop.bairro}, {prop.city} · {prop.area}
                  </p>
                </div>
                <p className="text-lg font-black text-blue-600">{prop.price}</p>
              </div>
            ))}
        </div>
      )}

      {activeTab === 'visitas' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-black mb-4">Visitas Agendadas</h3>
          <div className="space-y-3">
            {visits.map((v, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-blue-500" />
                  <div>
                    <p className="text-sm font-bold text-black">{v.property}</p>
                    <p className="text-xs text-slate-400">
                      {v.date} às {v.time}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${v.status === 'confirmada' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                >
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortalCompradorUrbano;
