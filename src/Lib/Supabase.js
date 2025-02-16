import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl); // Verifica si se imprime correctamente
console.log('Supabase Key:', supabaseKey); // Verifica si se imprime correctamente

export const supabase = createClient(supabaseUrl, supabaseKey);
