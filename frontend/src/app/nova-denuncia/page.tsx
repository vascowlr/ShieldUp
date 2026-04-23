"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, ShieldAlert, AlertTriangle } from "lucide-react";

import { storage } from "@/lib/storage";

export default function NovaDenuncia() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Físico",
        location: "",
        institutionType: "Escola",
        institutionName: "",
        isAnonymous: true,
        authorName: "",
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // No GitHub Pages, salvamos no LocalStorage
            await storage.saveReport({
                ...formData,
                authorName: formData.isAnonymous ? 'Anônimo' : (formData.authorName || 'Identificado'),
                imageUrl: imagePreview || undefined, // Salvamos o Base64 da imagem
            });

            alert("Denúncia enviada com sucesso!");
            router.push("/");
        } catch (err) {
            console.error(err);
            setError("Ocorreu um erro ao enviar a denúncia. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <main className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8 flex flex-col items-center justify-center">
                <div className="glass max-w-md w-full p-8 rounded-2xl text-center space-y-6">
                    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldAlert className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold">Denúncia Registrada!</h2>
                    <p className="text-slate-300">
                        Sua denúncia foi registrada com sucesso e nossa equipe tomará as medidas adequadas com total sigilo.
                    </p>
                    <Link href="/" className="inline-block mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all font-medium">
                        Voltar para o Início
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8 animate-in fade-in duration-500">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 rounded-full glass hover:bg-slate-800 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold">Registrar Nova Denúncia</h1>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200 p-4 rounded-xl flex gap-3 text-sm">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p>
                        Você está em um ambiente seguro. Todas as informações fornecidas são tratadas com sigilosidade.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="glass p-6 md:p-8 rounded-2xl space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Título Ocorrência</label>
                        <input
                            required
                            type="text"
                            placeholder="Ex: Assédio no pátio..."
                            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Categoria</label>
                            <select
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Físico">Físico</option>
                                <option value="Verbal">Verbal</option>
                                <option value="Social">Social</option>
                                <option value="Cyberbullying">Cyberbullying</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Local (opcional)</label>
                            <input
                                type="text"
                                placeholder="Onde aconteceu?"
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Tipo de Instituição</label>
                            <select
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                value={formData.institutionType}
                                onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                            >
                                <option value="Escola">Escola</option>
                                <option value="Empresa">Empresa</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Nome da Instituição (opcional)</label>
                            <input
                                type="text"
                                placeholder="Nome da escola ou empresa"
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={formData.institutionName}
                                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Descrição detalhada</label>
                        <textarea
                            required
                            rows={5}
                            placeholder="Descreva o máximo de detalhes possível sobre o ocorrido..."
                            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Adicionar Fotos (evidências)</label>
                        <div className="flex flex-col gap-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-slate-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-600 file:text-white
                                hover:file:bg-indigo-700 transition-all"
                            />
                            {imagePreview && (
                                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-700">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <button 
                                        type="button"
                                        onClick={() => { setImagePreview(null); }}
                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 bg-slate-900/30 p-4 rounded-xl border border-slate-700/30">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="anonymous"
                                className="w-5 h-5 accent-indigo-500 rounded focus:ring-indigo-500"
                                checked={formData.isAnonymous}
                                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                            />
                            <label htmlFor="anonymous" className="text-sm text-slate-300 cursor-pointer select-none">
                                Quero manter minha denúncia 100% anônima
                            </label>
                        </div>
                        
                        {!formData.isAnonymous && (
                            <div className="mt-2 space-y-2 animate-in slide-in-from-top-2 duration-300">
                                <label className="text-sm font-medium text-slate-300">Seu Nome / Identificação</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Como deseja ser identificado?"
                                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    value={formData.authorName}
                                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                                />
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Enviar Denúncia Seguro
                            </>
                        )}
                    </button>

                </form>
            </div>
        </main>
    );
}
