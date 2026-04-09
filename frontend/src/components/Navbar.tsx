'use client';

import { ShieldCheck, Info, Map } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="glass sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between shadow-lg shadow-indigo-900/20">
            <div className="flex items-center gap-2 text-indigo-400">
                <ShieldCheck className="w-8 h-8" />
                <span className="text-2xl font-bold tracking-tight text-white">ShieldUp</span>
            </div>
            <div className="flex gap-4">
                <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    <Map className="w-4 h-4" /> Feed
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    <Info className="w-4 h-4" /> Sobre
                </button>
            </div>
        </nav>
    );
}
