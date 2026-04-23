// Simulação de Banco de Dados usando LocalStorage
// Isso permite que o projeto funcione no GitHub Pages sem um servidor real

export type Report = {
    id: string;
    title: string;
    description: string;
    category: string;
    location?: string;
    institutionType?: string;
    institutionName?: string;
    isAnonymous: boolean;
    authorName: string;
    imageUrl?: string;
    createdAt: string;
};

export type Admin = {
    username: string;
    password: string; // Em um app real, isso nunca seria salvo puro, mas aqui é para fins didáticos/demo
};

const REPORTS_KEY = 'shieldup_reports';
const ADMINS_KEY = 'shieldup_admins';

export const storage = {
    // Relatórios
    getReports: (): Report[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(REPORTS_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveReport: (report: Omit<Report, 'id' | 'createdAt'>): Report => {
        const reports = storage.getReports();
        const newReport: Report = {
            ...report,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
        };
        reports.unshift(newReport); // Adiciona no início
        localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
        return newReport;
    },

    // Admin
    getAdmins: (): Admin[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(ADMINS_KEY);
        return data ? JSON.parse(data) : [];
    },

    registerAdmin: (admin: Admin, code: string): { success: boolean; error?: string } => {
        if (code !== 'ShieldUpADM1') {
            return { success: false, error: 'Código de registro inválido.' };
        }
        const admins = storage.getAdmins();
        if (admins.find(a => a.username === admin.username)) {
            return { success: false, error: 'Este usuário já existe.' };
        }
        admins.push(admin);
        localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
        return { success: true };
    },

    loginAdmin: (credentials: Admin): { success: boolean; token?: string; error?: string } => {
        const admins = storage.getAdmins();
        const admin = admins.find(a => a.username === credentials.username && a.password === credentials.password);
        if (admin) {
            return { success: true, token: 'mock_token_' + admin.username };
        }
        return { success: false, error: 'Usuário ou senha incorretos.' };
    }
};
