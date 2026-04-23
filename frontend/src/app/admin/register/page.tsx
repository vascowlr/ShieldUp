"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, ArrowLeft, UserPlus, Lock, Key } from "lucide-react";

import { storage } from "@/lib/storage";

export default function AdminRegister() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        registrationCode: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await storage.registerAdmin(
                { username: formData.username, password: formData.password },
                formData.registrationCode
            );

            if (result.success) {
                alert("Administrador criado com sucesso! Faça login agora.");
                router.push("/admin/login");
            } else {
                setError(result.error || "Erro ao registrar.");
            }
        } catch (err) {
            setError("Erro ao conectar com o banco de dados.");
        } finally {
            setLoading(false);
        }
    };

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
                    <h1 className="text-3xl font-bold">Criar Conta Admin</h1>
                    <p className="text-slate-400">Use o código de convite para se registrar.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Código de Registro</label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                             <input
                                required
                                type="text"
                                autoComplete="off"
                                placeholder="Digite o código de convite..."
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={formData.registrationCode}
                                onChange={(e) => setFormData({ ...formData, registrationCode: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Usuário</label>
                        <div className="relative">
                            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                             <input
                                required
                                type="text"
                                autoComplete="off"
                                placeholder="Escolha um nome de usuário..."
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
                                autoComplete="new-password"
                                placeholder="Crie uma senha forte..."
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
                            "Registrar Administrador"
                        )}
                    </button>

                    <div className="text-center">
                        <Link href="/admin/login" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                            Já tem uma conta? Entrar
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
