'use client';

import { useState } from 'react';
import { ShieldAlert, Clock, MapPin, User, Tag, Search, Filter } from 'lucide-react';

type Report = {
    id: string;
    title: string;
    description: string;
    category: string;
    location?: string;
    isAnonymous: boolean;
    authorName: string;
    date: string;
};

export default function ReportFeed({ reports, loading }: { reports: Report[], loading: boolean }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('Todas');

    const filteredReports = reports.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (report.location && report.location.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = filterCategory === 'Todas' || report.category === filterCategory;

        return matchesSearch && matchesCategory;
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
            </div>

            {filteredReports.length === 0 ? (
                <div className="glass rounded-2xl p-8 text-center flex flex-col items-center gap-3">
                    <ShieldAlert className="w-12 h-12 text-slate-500" />
                    <h3 className="text-xl font-semibold text-slate-300">Nenhuma denúncia encontrada</h3>
                    <p className="text-sm text-slate-400">Tente ajustar os filtros de busca.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredReports.map((report) => (
                        <div key={report.id} className="glass rounded-xl p-5 hover:bg-slate-800/40 transition-colors border-l-4 border-l-indigo-500">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="text-lg font-semibold text-white">{report.title}</h4>
                                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center gap-1">
                                    <Tag className="w-3 h-3" />
                                    {report.category}
                                </span>
                            </div>

                            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                                {report.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
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
                                    {new Date(report.date).toLocaleDateString('pt-BR')} as {new Date(report.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
