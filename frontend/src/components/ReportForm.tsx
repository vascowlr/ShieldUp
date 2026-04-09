'use client';

import { useState } from 'react';
import { Send, AlertTriangle } from 'lucide-react';

export default function ReportForm({ onReportAdded }: { onReportAdded: () => void }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Físico',
        location: '',
        isAnonymous: true,
        authorName: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:5000/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(true);
                setFormData({ title: '', description: '', category: 'Físico', location: '', isAnonymous: true, authorName: '' });
                onReportAdded();
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Error submitting report:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass rounded-2xl p-6 md:p-8 w-full max-w-xl mx-auto shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                            Faça uma Denúncia
                        </h2>
                        <p className="text-sm text-slate-400">Seu relato é seguro e pode ser totalmente anônimo.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Título da Ocorrência *</label>
                        <input
                            required
                            type="text"
                            placeholder="Ex: Agressão no pátio"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Categoria *</label>
                            <select
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Local (Opcional)</label>
                            <input
                                type="text"
                                placeholder="Onde aconteceu?"
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Descrição Detalhada *</label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Descreva o que aconteceu com o máximo de detalhes possível..."
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="flex items-center gap-3 py-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={formData.isAnonymous}
                                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                            <span className="ml-3 text-sm font-medium text-slate-300">Denúncia Anônima</span>
                        </label>
                    </div>

                    {!formData.isAnonymous && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-medium text-slate-300 mb-1">Seu Nome</label>
                            <input
                                type="text"
                                placeholder="Como deseja se identificar?"
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                value={formData.authorName}
                                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-indigo-600/30"
                    >
                        {loading ? 'Enviando...' : (
                            <>
                                <Send className="w-5 h-5" />
                                Enviar Denúncia Segura
                            </>
                        )}
                    </button>

                    {success && (
                        <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center text-sm font-medium animate-in fade-in zoom-in duration-300">
                            Denúncia enviada com sucesso! Obrigado por ajudar.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
