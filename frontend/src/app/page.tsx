import ReportFeed from "@/components/ReportFeed";
import { Shield, Info, Activity } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const mockReports = [
    {
      id: "1",
      title: "Assédio no pátio",
      description: "Um grupo de alunos mais velhos estava intimidando alunos menores no pátio durante o intervalo.",
      category: "Físico",
      location: "Pátio Principal",
      institutionType: "Escola",
      institutionName: "Escola Estadual São Pedro",
      isAnonymous: true,
      authorName: "Anônimo",
      date: new Date().toISOString()
    },
    {
      id: "2",
      title: "Mensagens ofensivas",
      description: "Tomei conhecimento sobre mensagens de ódio e cyberbullying sendo espalhadas em um grupo escolar público.",
      category: "Cyberbullying",
      institutionType: "Empresa",
      institutionName: "Tech Solutions S.A.",
      isAnonymous: false,
      authorName: "João S.",
      date: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "3",
      title: "Exclusão intencional",
      description: "Uma aluna tem sido sistematicamente excluída das atividades em grupo e isolada durante o recreio.",
      category: "Social",
      location: "Sala 204",
      institutionType: "Escola",
      institutionName: "Colégio Santa Maria",
      isAnonymous: true,
      authorName: "Anônimo",
      date: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="flex flex-col items-center justify-center text-center space-y-4 py-12">
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
              Saiba Mais
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
          <ReportFeed reports={mockReports} loading={false} />
        </section>
      </div>
    </main>
  );
}
