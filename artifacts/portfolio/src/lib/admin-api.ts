import { supabase, supabasePublic } from "@/lib/supabase";

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  subject?: string | null;
  project_type?: string | null;
  status?: string | null;
  is_read?: boolean | null;
  created_at?: string | null;
}

export interface FetchResult {
  messages: AdminMessage[];
  error: string | null;
  /** خطأ إعدادات: الجدول غير موجود أو صلاحيات RLS غير مطبّقة */
  setupRequired: boolean;
}

const MESSAGES_TABLE = "messages";

/**
 * أخطاء Supabase التي تعني أن إعدادات الأمان (RLS) غير مطبّقة بعد.
 * 42P01 = undefined_table, 42501 = insufficient_privilege
 */
export function isSetupError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  const code = error.code ?? "";
  const msg = (error.message ?? "").toLowerCase();
  return (
    code === "42P01" ||
    code === "42501" ||
    code === "PGRST205" ||
    msg.includes("relation") ||
    msg.includes("row-level security") ||
    msg.includes("permission denied") ||
    msg.includes("schema cache")
  );
}

function normalize(raw: Record<string, unknown>): AdminMessage {
  const message = String(raw.message ?? "");
  // استخراج الموضوع من نص الرسالة إن كان مدمجاً
  const subjectMatch = message.match(/^الموضوع:\s*(.+)$/m);
  const body = message
    .replace(/^الموضوع:\s*.+$/m, "")
    .replace(/^الرسالة:\s*$/m, "")
    .trim();

  return {
    id: String(raw.id ?? ""),
    name: String(raw.name ?? "—"),
    email: String(raw.email ?? ""),
    phone: (raw.phone as string | null) ?? null,
    message: body || message,
    subject: (raw.subject as string | null) ?? (subjectMatch ? subjectMatch[1].trim() : null),
    project_type: (raw.project_type as string | null) ?? null,
    status: (raw.status as string | null) ?? null,
    is_read: typeof raw.is_read === "boolean" ? raw.is_read : null,
    created_at: (raw.created_at as string | null) ?? null,
  };
}

function sortByDateDesc(list: AdminMessage[]): AdminMessage[] {
  return [...list].sort((a, b) => {
    const ta = a.created_at ? Date.parse(a.created_at) : 0;
    const tb = b.created_at ? Date.parse(b.created_at) : 0;
    return tb - ta;
  });
}

/** جلب كل الرسائل (يتطلب صلاحية إدارية عبر RLS) */
export async function fetchMessages(): Promise<FetchResult> {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .select("*")
    .limit(1000);

  if (error) {
    return { messages: [], error: error.message, setupRequired: isSetupError(error) };
  }

  const rows = (data ?? []) as Record<string, unknown>[];
  return {
    messages: sortByDateDesc(rows.map(normalize)),
    error: null,
    setupRequired: false,
  };
}

/**
 * تحديث حالة القراءة.
 * نحاول أولاً العمود `is_read`، وإن لم يكن موجوداً نستخدم `status`.
 */
export async function setMessageRead(id: string, read: boolean): Promise<boolean> {
  const attempts: Record<string, unknown>[] = [{ is_read: read }, { status: read ? "read" : "new" }];

  for (const patch of attempts) {
    const { error } = await supabase.from(MESSAGES_TABLE).update(patch).eq("id", id);
    if (!error) return true;
  }
  return false;
}

/** حذف رسالة */
export async function deleteMessage(id: string): Promise<boolean> {
  const { error } = await supabase.from(MESSAGES_TABLE).delete().eq("id", id);
  return !error;
}

export interface AccessCheck {
  ok: boolean;
  /** الجداول أو السياسات غير مهيّأة بعد */
  setupRequired: boolean;
  /** البريد مسجّل الدخول لكنه غير مُدرج في قائمة المديرين */
  notListed: boolean;
  message: string | null;
}

/**
 * تشخيص صلاحيات المدير.
 * نستعلم من جدول `admin_users` — وهو محمي بـ RLS ولا يمكن لأي زائر قراءته.
 * الخطأ هنا يعني أن سكربت SQL لم يُنفَّذ بعد.
 */
export async function checkAdminAccess(email: string): Promise<AccessCheck> {
  const { data, error } = await supabase
    .from("admin_users")
    .select("email")
    .ilike("email", email)
    .limit(1);

  if (error) {
    return {
      ok: false,
      setupRequired: isSetupError(error),
      notListed: false,
      message: error.message,
    };
  }

  if (!data || data.length === 0) {
    return {
      ok: false,
      setupRequired: false,
      notListed: true,
      message: null,
    };
  }

  return { ok: true, setupRequired: false, notListed: false, message: null };
}

/**
 * فحص أمني: هل جدول الرسائل مكشوف لأي زائر؟
 * نستخدم عميلاً عاماً بدون جلسة — إذا أعاد صفوفاً فالمحتوى مكشوف ويجب تنفيذ سكربت SQL.
 */
export async function isMessagesPubliclyExposed(): Promise<boolean> {
  try {
    const { data, error } = await supabasePublic.from(MESSAGES_TABLE).select("id").limit(1);
    if (error) return false; // مرفوض = محمي
    return (data ?? []).length > 0;
  } catch {
    return false;
  }
}

/** تصدير الرسائل إلى CSV */
export function messagesToCsv(messages: AdminMessage[]): string {
  const escape = (value: string) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const header = ["id", "name", "email", "phone", "subject", "message", "project_type", "created_at"];
  const rows = messages.map((m) =>
    [
      m.id,
      m.name,
      m.email,
      m.phone ?? "",
      m.subject ?? "",
      m.message,
      m.project_type ?? "",
      m.created_at ?? "",
    ]
      .map(escape)
      .join(","),
  );
  return [header.join(","), ...rows].join("\n");
}
