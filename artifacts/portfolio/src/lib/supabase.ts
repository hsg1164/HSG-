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

/**
 * هل الخطأ بسبب عمود غير موجود في الجدول؟
 * (مثال: عمود project_type لسه ما اتضافش في قاعدة البيانات)
 */
export function isMissingColumnError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  const code = error.code ?? "";
  const msg = (error.message ?? "").toLowerCase();
  return (
    code === "42703" ||
    code === "PGRST204" ||
    msg.includes("column") ||
    msg.includes("does not exist") ||
    msg.includes("unknown column") ||
    msg.includes("schema cache")
  );
}
