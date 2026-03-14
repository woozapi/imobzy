import React, { useState } from 'react';
import {
  Layout,
  Plus,
  Copy,
  Eye,
  Trash2,
  Palette,
  Code,
  FileText,
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  type: 'landing_page' | 'email' | 'contract' | 'report';
  category: string;
  description: string;
  preview: string;
  isDefault: boolean;
}

const TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Landing Fazenda Premium',
    type: 'landing_page',
    category: 'Rural',
    description: 'Template premium para fazendas com mapa e ficha técnica',
    preview: '🏡',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Landing Apartamento',
    type: 'landing_page',
    category: 'Urbano',
    description: 'Template para apartamentos com galeria e financiamento',
    preview: '🏢',
    isDefault: true,
  },
  {
    id: '3',
    name: 'Landing Empreendimento',
    type: 'landing_page',
    category: 'Urbano',
    description: 'Template para lançamentos com tabela de preços',
    preview: '🏗',
    isDefault: true,
  },
  {
    id: '4',
    name: 'Email - Novo Lead',
    type: 'email',
    category: 'Geral',
    description: 'Template de email para novos leads',
    preview: '📧',
    isDefault: true,
  },
  {
    id: '5',
    name: 'Email - Follow Up',
    type: 'email',
    category: 'Geral',
    description: 'Template de email para follow up automático',
    preview: '📬',
    isDefault: true,
  },
  {
    id: '6',
    name: 'Contrato de Venda',
    type: 'contract',
    category: 'Geral',
    description: 'Modelo padrão de contrato de compra e venda',
    preview: '📄',
    isDefault: true,
  },
  {
    id: '7',
    name: 'Contrato de Locação',
    type: 'contract',
    category: 'Urbano',
    description: 'Modelo padrão de contrato de locação residencial',
    preview: '🔑',
    isDefault: true,
  },
  {
    id: '8',
    name: 'Relatório Mensal',
    type: 'report',
    category: 'Geral',
    description: 'Template de relatório mensal para proprietários',
    preview: '📊',
    isDefault: true,
  },
  {
    id: '9',
    name: 'Dossiê Rural',
    type: 'report',
    category: 'Rural',
    description: 'Template de dossiê técnico para propriedades rurais',
    preview: '📋',
    isDefault: true,
  },
];

const typeLabels: Record<string, { label: string; color: string; bg: string }> =
  {
    landing_page: {
      label: 'Landing Page',
      color: 'text-blue-700',
      bg: 'bg-blue-100',
    },
    email: { label: 'Email', color: 'text-purple-700', bg: 'bg-purple-100' },
    contract: {
      label: 'Contrato',
      color: 'text-emerald-700',
      bg: 'bg-emerald-100',
    },
    report: { label: 'Relatório', color: 'text-amber-700', bg: 'bg-amber-100' },
  };

const TemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>(TEMPLATES);
  const [activeType, setActiveType] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = templates.filter((t) => {
    const typeMatch = activeType === 'all' || t.type === activeType;
    const catMatch = activeCategory === 'all' || t.category === activeCategory;
    return typeMatch && catMatch;
  });

  const handleDuplicate = (t: Template) => {
    const copy: Template = {
      ...t,
      id: Date.now().toString(),
      name: `${t.name} (Cópia)`,
      isDefault: false,
    };
    setTemplates((prev) => [...prev, copy]);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Excluir este template?')) return;
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Layout className="text-purple-600" size={28} />
            Template Manager
          </h1>
          <p className="text-gray-500 mt-1">
            Gerencie templates globais de landing pages, emails, contratos e
            relatórios.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-purple-500 transition-all shadow-lg">
          <Plus size={18} /> Novo Template
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(typeLabels).map(([key, config]) => {
          const count = templates.filter((t) => t.type === key).length;
          return (
            <div
              key={key}
              className={`rounded-xl p-5 ${config.bg} cursor-pointer transition-all hover:shadow-lg ${activeType === key ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
              onClick={() => setActiveType(activeType === key ? 'all' : key)}
            >
              <p className={`text-2xl font-bold ${config.color}`}>{count}</p>
              <p
                className={`text-xs font-bold uppercase tracking-wider ${config.color}`}
              >
                {config.label}s
              </p>
            </div>
          );
        })}
      </div>

      {/* Category Filters */}
      <div className="flex gap-2">
        {['all', 'Geral', 'Rural', 'Urbano'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeCategory === cat
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat === 'all' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((template) => {
          const typeConf = typeLabels[template.type];
          return (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{template.preview}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${typeConf.bg} ${typeConf.color}`}
                  >
                    {typeConf.label}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">
                  {template.name}
                </h3>
                <p className="text-xs text-gray-400 mb-3">
                  {template.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-500 uppercase">
                    {template.category}
                  </span>
                  {template.isDefault && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-purple-100 text-purple-600 uppercase">
                      Padrão
                    </span>
                  )}
                </div>
              </div>
              <div className="border-t border-gray-100 p-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100">
                  <Eye size={14} /> Ver
                </button>
                <button
                  onClick={() => handleDuplicate(template)}
                  className="flex-1 flex items-center justify-center gap-1 p-2 bg-purple-50 text-purple-600 rounded-lg text-xs font-medium hover:bg-purple-100"
                >
                  <Copy size={14} /> Duplicar
                </button>
                {!template.isDefault && (
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="flex-1 flex items-center justify-center gap-1 p-2 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100"
                  >
                    <Trash2 size={14} /> Excluir
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateManager;
