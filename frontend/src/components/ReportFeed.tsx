'use client';

import { useState } from 'react';
import { ShieldAlert, Clock, MapPin, User, Tag, Search, Filter, Building2 } from 'lucide-react';

type Report = {
    id: string;
    title: string;
    description: string;
    category: string;
    location?: string;
    institutionType?: string;
    institutionName?: string;
    isAnonymous: boolean;
    authorName: string;
    imageUrl?: string;
    createdAt: string;
    status: 'Pendente' | 'Em Andamento' | 'Resolvida';
};

export default function ReportFeed({ reports, loading }: { reports: Report[], loading: boolean }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('Todas');
    const [filterInstitutionType, setFilterInstitutionType] = useState('Todas');

    const filteredReports = reports.filter(report => {
        const matchesSearch = Boolean(
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (report.location?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (report.institutionName?.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        const matchesCategory = filterCategory === 'Todas' || report.category === filterCategory;
        const matchesInstitution = filterInstitutionType === 'Todas' || report.institutionType === filterInstitutionType;

        return matchesSearch && matchesCategory && matchesInstitution;
    });

    if (loading) {
        return (
            <div className="w-full space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="glass rounded-2xl p-6 h-32 animate-pulse flex flex-col gap-3">
                        <div className="w-2/3 h-6 bg-slate-700/50 rounded-md"></div>
                        <div className="w-full h-4 bg-slate-700/30 rounded-md"></div>
                        <div className="w-1/2 h-4 bg-slate-700/30 rounded-md"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                    <ShieldAlert className="w-5 h-5 text-indigo-400" />
                    Feed de Ocorrências Recentes
                </h3>
            </div>

            <div className="glass rounded-xl p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar por termo ou local..."
                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative sm:w-48">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                    <select
                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="Todas">Todas as Categorias</option>
                        <option value="Físico">Físico</option>
                        <option value="Verbal">Verbal</option>
                        <option value="Social">Social</option>
                        <option value="Cyberbullying">Cyberbullying</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>
                <div className="relative sm:w-48">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                    <select
                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                        value={filterInstitutionType}
                        onChange={(e) => setFilterInstitutionType(e.target.value)}
                    >
                        <option value="Todas">Todas Instituições</option>
                        <option value="Escola">Escolas</option>
                        <option value="Empresa">Empresas</option>
                        <option value="Outro">Outras</option>
                    </select>
                </div>
            </div>

            {filteredReports.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center flex flex-col items-center gap-3">
                    <ShieldAlert className="w-12 h-12 text-slate-500" />
                    <h3 className="text-xl font-semibold text-slate-300">Nenhuma denúncia encontrada</h3>
                    <p className="text-sm text-slate-400">Tente ajustar os filtros de busca.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredReports.map((report) => (
                        <div key={report.id} className="glass rounded-xl overflow-hidden hover:bg-slate-800/40 transition-colors border-l-4 border-l-indigo-500 flex flex-col">
                            {report.imageUrl && (
                                <div className="w-full h-48 bg-slate-900">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={report.imageUrl} 
                                        alt={report.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="text-lg font-semibold text-white">{report.title}</h4>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center gap-1">
                                            <Tag className="w-3 h-3" />
                                            {report.category}
                                        </span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                            report.status === 'Resolvida' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                            report.status === 'Em Andamento' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                                            'bg-slate-500/10 border-slate-500/30 text-slate-400'
                                        }`}>
                                            {(report.status || 'Pendente').toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
                                    {report.description}
                                </p>

                                <div className="mt-auto flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
                                    <div className="flex items-center gap-1.5 bg-slate-900/50 px-2 py-1 rounded-md">
                                        <User className="w-3.5 h-3.5" />
                                        {report.isAnonymous ? 'Anônimo' : report.authorName}
                                    </div>
                                    {report.location && (
                                        <div className="flex items-center gap-1.5 bg-slate-900/50 px-2 py-1 rounded-md">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {report.location}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5 bg-slate-900/50 px-2 py-1 rounded-md">
                                        <Clock className="w-3.5 h-3.5" />
                                        {new Date(report.createdAt).toLocaleDateString('pt-BR')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
