'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ReportForm from '../components/ReportForm';
import ReportFeed from '../components/ReportFeed';

export default function Home() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/reports');
      if (res.ok) {
        const data = await res.json();
        setReports(data);
      }
    } catch (e) {
      console.error("Failed to fetch reports", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // Poll for new reports every 30 seconds
    const interval = setInterval(fetchReports, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen pb-12 flex flex-col items-center">
      <Navbar />

      <div className="w-full max-w-6xl px-4 md:px-8 mt-10 md:mt-16 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
              Não se cale.
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              O ShieldUp é o seu espaço seguro para relatar incidentes de bullying.
              Sua voz é fundamental para construirmos um ambiente melhor para todos.
            </p>
          </div>
          <ReportForm onReportAdded={fetchReports} />
        </div>

        {/* Right Side - Feed */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <ReportFeed reports={reports} loading={loading} />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-16 w-full text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} ShieldUp. Juntos contra o bullying.</p>
      </footer>
    </main>
  );
}
