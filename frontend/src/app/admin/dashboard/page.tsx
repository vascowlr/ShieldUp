"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, LogOut, Search, Clock, User, Tag, MapPin, Building2, AlertCircle } from "lucide-react";
import Link from "next/link";

import { storage } from "@/lib/storage";
import ReportFeed from "@/components/ReportFeed";

export default function AdminDashboard() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adminUser, setAdminUser] = useState("");
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadDashboard = async () => {
            setMounted(true);
            const token = localStorage.getItem("adminToken");
            const user = localStorage.getItem("adminUser");

            if (!token) {
                router.push("/admin/login");
                return;
            }

            setAdminUser(user || "Admin");

            try {
                const data = await storage.getReports();
                setReports(data as any);
            } catch (err) {
                console.error("Erro ao carregar dashboard:", err);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/");
    };

    const handleUpdateStatus = async (id: string, status: any) => {
        await storage.updateReportStatus(id, status);
        const data = await storage.getReports();
        setReports(data as any);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja excluir esta denúncia permanentemente?")) {
            await storage.deleteReport(id);
            const data = await storage.getReports();
            setReports(data as any);
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
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Gerenciamento de Denúncias</h1>
                        <p className="text-slate-400 text-sm">Visualize e gerencie todas as ocorrências reportadas pelos usuários.</p>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass p-6 rounded-2xl border border-slate-700/50">
                        <p className="text-slate-400 text-sm font-medium mb-1">Total de Denúncias</p>
                        <h3 className="text-3xl font-bold text-white">{reports.length}</h3>
                    </div>
                    <div className="glass p-6 rounded-2xl border border-slate-700/50">
                        <p className="text-slate-400 text-sm font-medium mb-1">Pendentes</p>
                        <h3 className="text-3xl font-bold text-amber-500">
                            {reports.filter((r: any) => r.status === 'Pendente' || !r.status).length}
                        </h3>
                    </div>
                    <div className="glass p-6 rounded-2xl border border-slate-700/50">
                        <p className="text-slate-400 text-sm font-medium mb-1">Resolvidas</p>
                        <h3 className="text-3xl font-bold text-green-500">
                            {reports.filter((r: any) => r.status === 'Resolvida').length}
                        </h3>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Search className="w-5 h-5 text-indigo-400" />
                            Gerenciar Ocorrências
                        </h2>
                    </div>

                    <ReportFeed 
                        reports={reports} 
                        loading={loading} 
                        isAdmin={true}
                        onUpdateStatus={handleUpdateStatus}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </main>
    );
}
