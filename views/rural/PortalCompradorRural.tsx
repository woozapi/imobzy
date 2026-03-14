import React, { useState } from 'react';
import {
  Search,
  Heart,
  MapPin,
  Wheat,
  Eye,
  Calendar,
  DollarSign,
  FileText,
  ArrowRight,
  Filter,
  ChevronDown,
  SlidersHorizontal,
  Star,
} from 'lucide-react';

const PortalCompradorRural: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'buscar' | 'favoritos' | 'visitas'
  >('buscar');
  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');

  const properties = [
    {
      id: 1,
      name: 'Fazenda São José',
      area: '1.200 ha',
      city: 'Uberaba/MG',
      biome: 'Cerrado',
      aptitude: 'Pecuária',
      price: 'R$ 28M',
      priceHa: 'R$ 23.333/ha',
      score: 92,
      saved: true,
    },
    {
      id: 2,
      name: 'Fazenda Bom Retiro',
      area: '3.500 ha',
      city: 'Formosa/GO',
      biome: 'Cerrado',
      aptitude: 'Agricultura',
      price: 'R$ 52M',
      priceHa: 'R$ 14.857/ha',
      score: 88,
      saved: false,
    },
    {
      id: 3,
      name: 'Sítio Bela Vista',
      area: '48 ha',
      city: 'Araguari/MG',
      biome: 'Mata Atlântica',
      aptitude: 'Mista',
      price: 'R$ 2.4M',
      priceHa: 'R$ 50.000/ha',
      score: 78,
      saved: false,
    },
    {
      id: 4,
      name: 'Fazenda Alto Rio',
      area: '8.000 ha',
      city: 'Balsas/MA',
      biome: 'Cerrado',
      aptitude: 'Agricultura',
      price: 'R$ 96M',
      priceHa: 'R$ 12.000/ha',
      score: 95,
      saved: true,
    },
  ];

  const visits = [
    { property: 'Fazenda São José', date: '15/03/2026', status: 'confirmada' },
    { property: 'Fazenda Bom Retiro', date: '20/03/2026', status: 'pendente' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-black uppercase italic tracking-tighter flex items-center gap-3">
          <Wheat className="text-emerald-600" size={32} />
          Portal do Investidor Rural
        </h1>
        <p className="text-black/60 font-medium">
          Encontre a propriedade rural ideal para seu investimento.
        </p>
      </div>

      <div className="flex gap-2">
        {[
          { key: 'buscar', label: 'Buscar Propriedades' },
          { key: 'favoritos', label: 'Favoritos' },
          { key: 'visitas', label: 'Visitas Agendadas' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab.key ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'buscar' && (
        <>
          {/* Search & Filters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Search size={20} className="text-slate-400" />
              <input
                placeholder="Buscar por cidade, estado ou nome..."
                className="flex-1 outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <select className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none">
                <option>Aptidão</option>
                <option>Pecuária</option>
                <option>Agricultura</option>
                <option>Mista</option>
              </select>
              <select className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none">
                <option>Bioma</option>
                <option>Cerrado</option>
                <option>Amazônia</option>
                <option>Mata Atlântica</option>
              </select>
              <input
                placeholder="Área mín (ha)"
                value={areaMin}
                onChange={(e) => setAreaMin(e.target.value)}
                className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none"
              />
              <input
                placeholder="Área máx (ha)"
                value={areaMax}
                onChange={(e) => setAreaMax(e.target.value)}
                className="px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none"
              />
              <button className="bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2">
                <Filter size={16} /> Filtrar
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="h-40 bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center relative">
                  <Wheat size={48} className="text-emerald-300" />
                  <button
                    className={`absolute top-3 right-3 p-2 rounded-full ${prop.saved ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-400'} transition-all hover:scale-110`}
                  >
                    <Heart size={16} fill={prop.saved ? 'white' : 'none'} />
                  </button>
                  <div className="absolute top-3 left-3">
                    <div
                      className={`w-10 h-10 rounded-full border-3 ${prop.score >= 90 ? 'border-emerald-500 bg-white' : 'border-amber-500 bg-white'} flex items-center justify-center`}
                    >
                      <span
                        className={`text-xs font-black ${prop.score >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}
                      >
                        {prop.score}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-black text-lg mb-1">
                    {prop.name}
                  </h3>
                  <p className="text-sm text-slate-400 flex items-center gap-1 mb-3">
                    <MapPin size={14} />
                    {prop.city}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 uppercase">
                      {prop.area}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700 uppercase">
                      {prop.biome}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-700 uppercase">
                      {prop.aptitude}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-black text-emerald-600">
                        {prop.price}
                      </p>
                      <p className="text-xs text-slate-400">{prop.priceHa}</p>
                    </div>
                    <button className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-all">
                      Ver Dossiê <ArrowRight size={16} />
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
                <div className="w-16 h-16 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Wheat size={28} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-black">{prop.name}</h3>
                  <p className="text-sm text-slate-400">
                    {prop.city} · {prop.area}
                  </p>
                </div>
                <p className="text-lg font-black text-emerald-600">
                  {prop.price}
                </p>
              </div>
            ))}
        </div>
      )}

      {activeTab === 'visitas' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-black mb-4">
            Visitas Técnicas Agendadas
          </h3>
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
                    <p className="text-xs text-slate-400">{v.date}</p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${v.status === 'confirmada' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
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

export default PortalCompradorRural;
