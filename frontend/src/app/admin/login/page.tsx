"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, ArrowLeft, User, Lock } from "lucide-react";

import { storage } from "@/lib/storage";

export default function AdminLogin() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await storage.loginAdmin(formData);

            if (result.success) {
                localStorage.setItem("adminToken", result.token || "");
                localStorage.setItem("adminUser", formData.username);
                router.push("/admin/dashboard");
            } else {
                setError(result.error || "Erro ao fazer login.");
            }
        } catch (err) {
            setError("Ocorreu um erro na conexão com o banco.");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-[#0f172a] text-white p-4 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center space-y-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para o Início
                    </Link>
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(79,70,229,0.4)]">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold">Acesso Restrito</h1>
                    <p className="text-slate-400">Entre com suas credenciais de administrador.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Usuário</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                required
                                type="text"
                                placeholder="Digite seu usuário..."
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                required
                                type="password"
                                placeholder="Digite sua senha..."
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Entrar no Painel"
                        )}
                    </button>

                    <div className="text-center">
                        <Link href="/admin/register" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                            Não tem conta? Criar conta de administrador
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
