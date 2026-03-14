import React, { useState } from 'react';
import {
  Home,
  Eye,
  FileText,
  DollarSign,
  BarChart3,
  ChevronRight,
  Bell,
  Calendar,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Clock,
  CheckCircle,
} from 'lucide-react';

const PortalProprietarioRural: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'docs' | 'financeiro'
  >('overview');

  const properties = [
    {
      id: 1,
      name: 'Fazenda São José',
      area: '1.200 ha',
      city: 'Uberaba/MG',
      status: 'ativo',
      score: 92,
      views: 145,
      leads: 8,
      price: 'R$ 28.000.000',
    },
    {
      id: 2,
      name: 'Sítio Bela Vista',
      area: '48 ha',
      city: 'Araguari/MG',
      status: 'ativo',
      score: 78,
      views: 62,
      leads: 3,
      price: 'R$ 2.400.000',
    },
  ];

  const docs = [
    { name: 'Matrícula Atualizada', status: 'ok', date: '10/03/2026' },
    { name: 'CCIR', status: 'ok', date: '05/02/2026' },
    { name: 'CAR', status: 'pendente', date: '—' },
    { name: 'ITR', status: 'ok', date: '15/01/2026' },
    { name: 'Georreferenciamento', status: 'pendente', date: '—' },
    { name: 'Reserva Legal', status: 'ok', date: '20/12/2025' },
  ];

  const timeline = [
    {
      date: '10/03',
      event: 'Investidor visitou Fazenda São José',
      type: 'visit',
    },
    {
      date: '08/03',
      event: 'Novo lead interessado em Sítio Bela Vista',
      type: 'lead',
    },
    {
      date: '05/03',
      event: 'Dossiê técnico gerado - Fazenda São José',
      type: 'doc',
    },
    { date: '01/03', event: 'Relatório mensal disponível', type: 'report' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black uppercase italic tracking-tighter flex items-center gap-3">
            <Home className="text-emerald-600" size={32} />
            Portal do Proprietário
          </h1>
          <p className="text-black/60 font-medium">
            Acompanhe suas propriedades rurais, documentação e propostas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-3 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'overview', label: 'Visão Geral' },
          { key: 'docs', label: 'Documentação' },
          { key: 'financeiro', label: 'Financeiro' },
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

      {activeTab === 'overview' && (
        <>
          {/* Property Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-black text-lg">
                      {prop.name}
                    </h3>
                    <p className="text-sm text-slate-400 flex items-center gap-1">
                      <MapPin size={14} />
                      {prop.city} · {prop.area}
                    </p>
                  </div>
                  <div
                    className={`w-14 h-14 rounded-full border-4 ${prop.score >= 80 ? 'border-emerald-500' : 'border-amber-500'} flex items-center justify-center`}
                  >
                    <span
                      className={`text-lg font-black ${prop.score >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}
                    >
                      {prop.score}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-slate-50 p-3 rounded-xl text-center">
                    <Eye size={16} className="mx-auto text-blue-500 mb-1" />
                    <p className="text-lg font-black text-black">
                      {prop.views}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Visualizações
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl text-center">
                    <TrendingUp
                      size={16}
                      className="mx-auto text-emerald-500 mb-1"
                    />
                    <p className="text-lg font-black text-black">
                      {prop.leads}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Leads
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl text-center">
                    <DollarSign
                      size={16}
                      className="mx-auto text-amber-500 mb-1"
                    />
                    <p className="text-sm font-black text-black">
                      {prop.price}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Valor
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-emerald-100 text-emerald-700">
                  {prop.status}
                </span>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-black mb-4">Atividade Recente</h3>
            <div className="space-y-3">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-xl bg-slate-50"
                >
                  <span className="text-xs font-bold text-slate-400 w-12">
                    {item.date}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${item.type === 'visit' ? 'bg-blue-500' : item.type === 'lead' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  />
                  <span className="text-sm text-slate-600">{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'docs' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-black mb-6">
            Documentação Fundiária & Ambiental
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
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${doc.status === 'ok' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                  >
                    {doc.status === 'ok' ? 'Aprovado' : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'financeiro' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-black mb-4">Resumo Financeiro</h3>
            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">
                  Valor Total em Carteira
                </span>
                <span className="font-bold text-emerald-600">
                  R$ 30.400.000
                </span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">
                  Propostas Recebidas
                </span>
                <span className="font-bold text-blue-600">2</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">
                  Comissão Estimada
                </span>
                <span className="font-bold text-amber-600">5%</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-black mb-4">Propostas</h3>
            <div className="text-center py-8 text-slate-400">
              <FileText className="mx-auto text-slate-300 mb-3" size={40} />
              <p>Nenhuma proposta ativa no momento</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortalProprietarioRural;
