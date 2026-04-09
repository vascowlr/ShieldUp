'use client';

import { ShieldAlert, Clock, MapPin, User, Tag } from 'lucide-react';

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

    if (reports.length === 0) {
        return (
            <div className="glass rounded-2xl p-8 text-center flex flex-col items-center gap-3">
                <ShieldAlert className="w-12 h-12 text-slate-500" />
                <h3 className="text-xl font-semibold text-slate-300">Nenhuma denúncia recente</h3>
                <p className="text-sm text-slate-400">Ajude a manter o ambiente seguro relatando incidentes que você presenciar.</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <ShieldAlert className="w-5 h-5 text-indigo-400" />
                Feed de Ocorrências Recentes
            </h3>

            {reports.map((report) => (
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
    );
}
