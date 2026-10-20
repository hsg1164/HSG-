import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

/**
 * عميل عام (بدون جلسة) — يُستخدم فقط للتحقق الأمني:
 * التأكد من أن جدول الرسائل غير قابل للقراءة من أي زائر.
 */
export const supabasePublic = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
