import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function for anonymous sign in
export const signInAnonymously = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'anonymous@example.com',
    password: 'anonymous'
  });
  return { data, error };
};