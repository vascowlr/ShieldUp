"use client";

import ReportFeed from "@/components/ReportFeed";
import { Shield, Info, Activity, Lock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { storage } from "@/lib/storage";

export default function Home() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadData = async () => {
        setMounted(true);
        try {
            const data = await storage.getReports();
            setReports(data as any);
        } catch (error) {
            console.error("Erro ao carregar denúncias:", error);
        } finally {
            setLoading(false);
        }
    };
    
    loadData();
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center text-center space-y-4 py-12">
          <div className="absolute top-8 right-8">
            <Link href="/admin/login" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium glass px-4 py-2 rounded-lg">
              <Lock className="w-4 h-4" />
              Login Administrador
            </Link>
          </div>
          <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.5)] mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            ShieldUp
          </h1>
          <p className="text-slate-400 max-w-2xl md:text-lg">
            Um ambiente seguro e anônimo para reportar, analisar e prevenir de forma efetiva casos de bullying nas escolas e organizações.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/nova-denuncia" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Nova Denúncia
            </Link>
            <a href="#feed" className="px-6 py-3 glass hover:bg-slate-800 text-white font-medium rounded-xl transition-all flex items-center gap-2">
              <Info className="w-5 h-5" />
              Ver Feed
            </a>
          </div>
          <p className="text-slate-400 text-sm mt-2">
            Se precisar conversar com alguém, digite <span className="font-semibold text-white">188</span> no seu telefone ou acesse o site:{" "}
            <a
              href="https://cvv.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
            >
              cvv.org.br
            </a>
          </p>
        </header>

        {/* Dashboard/Feed Section */}
        <section id="feed" className="animate-in fade-in duration-700">
          <ReportFeed reports={reports} loading={loading} />
        </section>
      </div>
    </main>
  );
}

