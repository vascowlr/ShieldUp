import { supabase } from './supabase';

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

export const storage = {
    // Relatórios
    getReports: async (): Promise<Report[]> => {
        const { data, error } = await supabase
            .from('reports')
            .select('*')
            .order('createdAt', { ascending: false });
        
        if (error) {
            console.error("Erro ao buscar denúncias:", error);
            return [];
        }
        return data || [];
    },

    saveReport: async (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => {
        const { data, error } = await supabase
            .from('reports')
            .insert([{
                ...report,
                status: 'Pendente',
                createdAt: new Date().toISOString()
            }])
            .select();
        
        if (error) throw error;
        return data?.[0];
    },

    updateReportStatus: async (id: string, status: Report['status']) => {
        const { error } = await supabase
            .from('reports')
            .update({ status })
            .eq('id', id);
        
        if (error) throw error;
        return true;
    },

    deleteReport: async (id: string) => {
        const { error } = await supabase
            .from('reports')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        return true;
    },

    // Administradores (Usaremos a tabela 'admins' do Supabase)
    registerAdmin: async (admin: { username: string, password: string }, code: string) => {
        if (code !== 'ShieldUpADM1') {
            return { success: false, error: 'Código de registro inválido.' };
        }

        const { data: existing } = await supabase
            .from('admins')
            .select('*')
            .eq('username', admin.username)
            .single();

        if (existing) {
            return { success: false, error: 'Usuário já existe.' };
        }

        const { error } = await supabase
            .from('admins')
            .insert([admin]);

        if (error) return { success: false, error: error.message };
        return { success: true };
    },

    loginAdmin: async (admin: { username: string, password: string }) => {
        const { data, error } = await supabase
            .from('admins')
            .select('*')
            .eq('username', admin.username)
            .eq('password', admin.password)
            .single();

        if (error || !data) {
            return { success: false, error: 'Usuário ou senha incorretos.' };
        }
        return { success: true, token: 'supabase-token-' + data.username };
    }
};
