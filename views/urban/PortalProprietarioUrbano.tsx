import React, { useState } from 'react';
import {
  Home,
  Eye,
  FileText,
  DollarSign,
  Bell,
  MapPin,
  Clock,
  CheckCircle,
  Key,
  Calendar,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

const PortalProprietarioUrbano: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'docs' | 'financeiro'
  >('overview');

  const properties = [
    {
      id: 1,
      name: 'Apt 302 - Ed. Primavera',
      type: 'Apartamento',
      city: 'São Paulo/SP',
      status: 'locado',
      rent: 'R$ 3.200',
      views: 89,
      leads: 5,
    },
    {
      id: 2,
      name: 'Sala 1204 - Torre Norte',
      type: 'Comercial',
      city: 'São Paulo/SP',
      status: 'venda',
      price: 'R$ 890.000',
      views: 42,
      leads: 2,
    },
    {
      id: 3,
      name: 'Casa - Jardim Europa',
      type: 'Casa',
      city: 'Campinas/SP',
      status: 'venda',
      price: 'R$ 1.250.000',
      views: 67,
      leads: 4,
    },
  ];

  const docs = [
    { name: 'Matrícula Atualizada', status: 'ok', date: '10/03/2026' },
    { name: 'IPTU 2026', status: 'ok', date: '15/01/2026' },
    { name: 'Habite-se', status: 'ok', date: '—' },
    { name: 'Contrato de Locação', status: 'ok', date: '01/02/2026' },
    { name: 'Laudo de Vistoria', status: 'pendente', date: '—' },
    { name: 'Certidão Negativa', status: 'pendente', date: '—' },
  ];

  const financials = [
    { month: 'Mar/2026', rent: 3200, tax: 320, net: 2880, status: 'pago' },
    { month: 'Fev/2026', rent: 3200, tax: 320, net: 2880, status: 'pago' },
    { month: 'Jan/2026', rent: 3200, tax: 320, net: 2880, status: 'pago' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black uppercase italic tracking-tighter flex items-center gap-3">
            <Home className="text-blue-600" size={32} />
            Portal do Proprietário
          </h1>
          <p className="text-black/60 font-medium">
            Acompanhe seus imóveis, documentação, locações e propostas.
          </p>
        </div>
        <button className="p-3 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            2
          </span>
        </button>
      </div>

      <div className="flex gap-2">
        {[
          { key: 'overview', label: 'Visão Geral' },
          { key: 'docs', label: 'Documentação' },
          { key: 'financeiro', label: 'Financeiro' },
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

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${prop.status === 'locado' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}
                  >
                    {prop.status === 'locado' ? 'Locado' : 'À Venda'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-500 uppercase">
                    {prop.type}
                  </span>
                </div>
                <h3 className="font-bold text-black mb-1">{prop.name}</h3>
                <p className="text-sm text-slate-400 flex items-center gap-1 mb-4">
                  <MapPin size={14} />
                  {prop.city}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 p-2 rounded-lg text-center">
                    <p className="text-lg font-black text-black">
                      {prop.views}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Views
                    </p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg text-center">
                    <p className="text-lg font-black text-black">
                      {prop.leads}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Leads
                    </p>
                  </div>
                </div>
                <p className="text-lg font-black text-blue-600">
                  {prop.rent || prop.price}
                </p>
                {prop.rent && (
                  <p className="text-xs text-slate-400">Aluguel mensal</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'docs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-black mb-6">
            Documentação dos Imóveis
          </h3>
          <div className="space-y-3">
            {docs.map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  {doc.status === 'ok' ? (
                    <CheckCircle size={20} className="text-emerald-500" />
                  ) : (
                    <Clock size={20} className="text-amber-500" />
                  )}
                  <span className="text-sm font-medium text-slate-700">
                    {doc.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{doc.date}</span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${doc.status === 'ok' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                  >
                    {doc.status === 'ok' ? 'OK' : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'financeiro' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm text-slate-400 mb-1">
                Receita Mensal Bruta
              </p>
              <p className="text-2xl font-black text-emerald-600">R$ 3.200</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm text-slate-400 mb-1">
                Taxa de Administração
              </p>
              <p className="text-2xl font-black text-red-500">- R$ 320</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm text-slate-400 mb-1">Receita Líquida</p>
              <p className="text-2xl font-black text-blue-600">R$ 2.880</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-bold text-slate-400 uppercase">
                    Mês
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-slate-400 uppercase">
                    Aluguel
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-slate-400 uppercase">
                    Taxa
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-slate-400 uppercase">
                    Líquido
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-slate-400 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {financials.map((f, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="px-6 py-4 text-sm font-medium text-black">
                      {f.month}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      R$ {f.rent.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-500">
                      - R$ {f.tax}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-emerald-600">
                      R$ {f.net.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 uppercase">
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortalProprietarioUrbano;
