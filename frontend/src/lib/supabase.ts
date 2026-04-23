import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://chsmczpvejerwemmlsxm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoc21jenB2ZWplcndlbW1sc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NTEyODUsImV4cCI6MjA5MjUyNzI4NX0.6eJg4osDsHEgk5sFHehS7df97HdpFsw18resdcaBbHA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
