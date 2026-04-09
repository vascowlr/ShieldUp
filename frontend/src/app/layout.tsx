import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShieldUp - Voz Contra o Bullying',
  description: 'Plataforma segura e anônima para denúncia de casos de bullying. Dê voz às vítimas e ajude a combater esse problema.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
