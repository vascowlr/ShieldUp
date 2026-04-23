"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, LogOut, Search, Clock, User, Tag, MapPin, Building2, AlertCircle } from "lucide-react";
import Link from "next/link";

import { storage } from "@/lib/storage";

export default function AdminDashboard() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adminUser, setAdminUser] = useState("");
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);

        const token = localStorage.getItem("adminToken");
        const user = localStorage.getItem("adminUser");

        if (!token) {
            router.push("/admin/login");
            return;
        }

        setAdminUser(user || "Admin");

        // Carregar do LocalStorage
        setReports(storage.getReports() as any);
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/");
    };

    const handleUpdateStatus = (id: string, status: any) => {
        storage.updateReportStatus(id, status);
        setReports(storage.getReports() as any);
    };

    const handleDelete = (id: string) => {
        if (confirm("Tem certeza que deseja excluir esta denúncia permanentemente?")) {
            storage.deleteReport(id);
            setReports(storage.getReports() as any);
        }
    };
    if (!mounted) return null;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f172a] text-white">
            {/* Sidebar/Nav */}
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">ShieldUp <span className="text-indigo-400">Admin</span></span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
                                <User className="w-4 h-4" />
                                Olá, {adminUser}
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all text-sm font-medium"
                            >
                                <LogOut className="w-4 h-4" />
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-6 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Gerenciamento de Denúncias</h1>
                        <p className="text-slate-400 text-sm">Visualize e gerencie todas as ocorrências reportadas pelos usuários.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium border border-indigo-500/20">
                        <AlertCircle className="w-4 h-4" />
                        {reports.length} Ocorrências Totais
                    </div>
                </div>

                {reports.length === 0 ? (
                    <div className="glass rounded-2xl p-20 text-center space-y-4">
                        <Shield className="w-16 h-16 text-slate-700 mx-auto" />
                        <h2 className="text-xl font-semibold text-slate-400">Nenhuma denúncia registrada ainda.</h2>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {reports.map((report: any) => (
                            <div key={report.id} className="glass rounded-2xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all group">
                                <div className="flex flex-col md:flex-row">
                                    {report.imageUrl && (
                                        <div className="md:w-64 h-48 md:h-auto bg-slate-900 border-r border-slate-700/50">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={report.imageUrl} 
                                                alt={report.title} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6 flex-1 space-y-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                                                        {report.category}
                                                    </span>
                                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(report.createdAt).toLocaleString('pt-BR')}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">{report.title}</h3>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${report.isAnonymous ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                                                    {report.isAnonymous ? 'Anônima' : 'Identificada'}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                                            {report.description}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-slate-500">Autor</p>
                                                    <p className="font-medium text-slate-200">{report.authorName}</p>
                                                </div>
                                            </div>
                                            
                                            {report.location && (
                                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                                                        <MapPin className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase font-bold text-slate-500">Local</p>
                                                        <p className="font-medium text-slate-200">{report.location}</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-3 text-sm text-slate-400">
                                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                                                    <Building2 className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-bold text-slate-500">Instituição</p>
                                                    <p className="font-medium text-slate-200">{report.institutionName || 'Não informada'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-slate-800">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-[10px] uppercase font-bold text-slate-500">Status Atual:</p>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                                        report.status === 'Resolvida' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                                                        report.status === 'Em Andamento' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                                                        'bg-slate-500/10 border-slate-500/30 text-slate-400'
                                                    }`}>
                                                        {report.status || 'Pendente'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                <button 
                                                    onClick={() => handleUpdateStatus(report.id, 'Em Andamento')}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-lg transition-all text-xs font-bold border border-amber-500/20"
                                                >
                                                    Marcar em Andamento
                                                </button>
                                                <button 
                                                    onClick={() => handleUpdateStatus(report.id, 'Resolvida')}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-all text-xs font-bold border border-green-500/20"
                                                >
                                                    Marcar como Resolvida
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(report.id)}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all text-xs font-bold border border-red-500/20"
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
