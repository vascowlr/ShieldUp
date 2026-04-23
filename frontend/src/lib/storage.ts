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
    status: 'Pendente' | 'Em Andamento' | 'Resolvida';
};

export type Admin = {
    username: string;
    password?: string;
};

const REPORTS_KEY = 'shieldup_reports';
const ADMINS_KEY = 'shieldup_admins';

export const storage = {
    getReports: (): Report[] => {
        if (typeof window === 'undefined') return [];
        try {
            const data = localStorage.getItem(REPORTS_KEY);
            if (!data) return [];
            const parsed = JSON.parse(data);
            
            // Correção automática: garante que cada denúncia tenha id e status
            return Array.isArray(parsed) ? parsed.map((r: any) => ({
                ...r,
                id: r.id || r._id || Math.random().toString(36).substr(2, 9),
                status: r.status || 'Pendente',
                authorName: r.authorName || (r.isAnonymous ? 'Anônimo' : 'Identificado'),
                createdAt: r.createdAt || new Date().toISOString()
            })) : [];
        } catch (e) {
            console.error("Erro ao ler LocalStorage", e);
            return [];
        }
    },

    saveReport: (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => {
        const reports = storage.getReports();
        const newReport: Report = {
            ...report,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            status: 'Pendente'
        };
        reports.unshift(newReport);
        localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
        return newReport;
    },

    updateReportStatus: (id: string, status: Report['status']) => {
        const reports = storage.getReports();
        const index = reports.findIndex(r => r.id === id);
        if (index !== -1) {
            reports[index].status = status;
            localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
            return true;
        }
        return false;
    },

    deleteReport: (id: string) => {
        const reports = storage.getReports();
        const filtered = reports.filter(r => r.id !== id);
        localStorage.setItem(REPORTS_KEY, JSON.stringify(filtered));
        return true;
    },

    getAdmins: (): Admin[] => {
        if (typeof window === 'undefined') return [];
        try {
            const data = localStorage.getItem(ADMINS_KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    registerAdmin: (admin: Admin, code: string) => {
        if (code !== 'ShieldUpADM1') {
            return { success: false, error: 'Código de registro inválido.' };
        }
        const admins = storage.getAdmins();
        if (admins.find(a => a.username === admin.username)) {
            return { success: false, error: 'Usuário já existe.' };
        }
        admins.push(admin);
        localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
        return { success: true };
    },

    loginAdmin: (admin: Admin) => {
        const admins = storage.getAdmins();
        const found = admins.find(a => a.username === admin.username && a.password === admin.password);
        if (found) {
            return { success: true, token: 'mock-token-' + found.username };
        }
        return { success: false, error: 'Usuário ou senha incorretos.' };
    }
};
