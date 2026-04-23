"use client";

import React, { useState } from "react";
import { Clock, Tag, User, MapPin, Building2, AlertCircle, X, ChevronRight, CheckCircle, RotateCcw, Trash2 } from "lucide-react";
import { Report } from "@/lib/storage";

interface ReportFeedProps {
    reports: Report[];
    loading: boolean;
    isAdmin?: boolean;
    onUpdateStatus?: (id: string, status: Report['status']) => void;
    onDelete?: (id: string) => void;
}

export default function ReportFeed({ reports, loading, isAdmin, onUpdateStatus, onDelete }: ReportFeedProps) {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    if (loading) {
        return (
            <div className="grid gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-slate-800 rounded-xl"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-4 bg-slate-800 rounded w-1/4"></div>
                                <div className="h-6 bg-slate-800 rounded w-3/4"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (reports.length === 0) {
        return (
            <div className="glass rounded-2xl p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
                    <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Nenhuma denúncia encontrada</h3>
                <p className="text-slate-400">Tudo parece tranquilo por aqui no momento.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4">
                {reports.map((report) => (
                    <div 
                        key={report.id} 
                        onClick={() => setSelectedReport(report)}
                        className="glass rounded-2xl p-5 border border-slate-700/50 hover:border-indigo-500/50 transition-all group cursor-pointer active:scale-[0.98]"
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {report.imageUrl && (
                                <div className="md:w-32 md:h-32 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/50 shrink-0">
                                    <img src={report.imageUrl} alt={report.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            )}
                            
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                            report.status === 'Resolvida' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                            report.status === 'Em Andamento' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                                            'bg-slate-500/10 border-slate-500/30 text-slate-400'
                                        }`}>
                                            {report.status || 'Pendente'}
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider bg-slate-800/50 px-2 py-0.5 rounded flex items-center gap-1">
                                            <Tag className="w-3 h-3" />
                                            {report.category}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(report.createdAt).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors line-clamp-1">{report.title}</h3>
                                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                                    {report.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-800/30 px-3 py-1 rounded-full">
                                        <User className="w-3.5 h-3.5 text-indigo-400" />
                                        {report.authorName}
                                    </div>
                                    {report.institutionName && (
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-800/30 px-3 py-1 rounded-full">
                                            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                                            {report.institutionName}
                                        </div>
                                    )}
                                    <div className="ml-auto text-indigo-400 text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Ver detalhes <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Detalhes */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    <div 
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        onClick={() => setSelectedReport(null)}
                    ></div>
                    
                    <div className="glass w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl relative z-10 border border-slate-700 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md p-4 border-b border-slate-800 flex items-center justify-between z-20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                                    <AlertCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg leading-tight">Detalhes da Denúncia</h2>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Protocolo: {selectedReport.id?.substring(0, 8)}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedReport(null)}
                                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 md:p-8 space-y-8">
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase border ${
                                        selectedReport.status === 'Resolvida' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                        selectedReport.status === 'Em Andamento' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                                        'bg-slate-500/10 border-slate-500/30 text-slate-400'
                                    }`}>
                                        Status: {selectedReport.status || 'Pendente'}
                                    </span>
                                    <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center gap-1.5">
                                        <Tag className="w-3.5 h-3.5" />
                                        {selectedReport.category}
                                    </span>
                                </div>
                                <h1 className="text-3xl font-extrabold text-white leading-tight">{selectedReport.title}</h1>
                            </div>

                            {selectedReport.imageUrl && (
                                <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                                    <img src={selectedReport.imageUrl} alt="Evidência" className="w-full h-auto max-h-[400px] object-contain" />
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="glass-light p-4 rounded-2xl space-y-1">
                                    <p className="text-[10px] uppercase font-bold text-slate-500">Autor</p>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <User className="w-4 h-4 text-indigo-400" />
                                        <span className="font-medium">{selectedReport.authorName}</span>
                                    </div>
                                </div>
                                <div className="glass-light p-4 rounded-2xl space-y-1">
                                    <p className="text-[10px] uppercase font-bold text-slate-500">Data do Registro</p>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <Clock className="w-4 h-4 text-indigo-400" />
                                        <span className="font-medium">{new Date(selectedReport.createdAt).toLocaleString('pt-BR')}</span>
                                    </div>
                                </div>
                                <div className="glass-light p-4 rounded-2xl space-y-1">
                                    <p className="text-[10px] uppercase font-bold text-slate-500">Localização</p>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <MapPin className="w-4 h-4 text-cyan-400" />
                                        <span className="font-medium">{selectedReport.location || "Não informado"}</span>
                                    </div>
                                </div>
                                <div className="glass-light p-4 rounded-2xl space-y-1">
                                    <p className="text-[10px] uppercase font-bold text-slate-500">Instituição</p>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <Building2 className="w-4 h-4 text-cyan-400" />
                                        <span className="font-medium">
                                            {selectedReport.institutionName ? `${selectedReport.institutionName} (${selectedReport.institutionType})` : "Não informada"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                                    Descrição da Ocorrência
                                </h3>
                                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                    {selectedReport.description}
                                </p>
                            </div>

                            {/* Área do Administrador dentro do Modal */}
                            {isAdmin && (
                                <div className="pt-8 border-t border-slate-800 space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Ações Administrativas</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <button 
                                            onClick={() => {
                                                onUpdateStatus?.(selectedReport.id, 'Em Andamento');
                                                setSelectedReport({...selectedReport, status: 'Em Andamento'});
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-xl transition-all font-bold border border-amber-500/20"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            Em Andamento
                                        </button>
                                        <button 
                                            onClick={() => {
                                                onUpdateStatus?.(selectedReport.id, 'Resolvida');
                                                setSelectedReport({...selectedReport, status: 'Resolvida'});
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-xl transition-all font-bold border border-green-500/20"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Resolvida
                                        </button>
                                        <button 
                                            onClick={() => {
                                                if (confirm("Excluir esta denúncia permanentemente?")) {
                                                    onDelete?.(selectedReport.id);
                                                    setSelectedReport(null);
                                                }
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all font-bold border border-red-500/20"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
