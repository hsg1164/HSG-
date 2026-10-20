import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox,
  MailOpen,
  Mail,
  CalendarDays,
  RefreshCw,
  LogOut,
  ArrowRight,
  ArrowLeft,
  Search,
  Trash2,
  CheckCheck,
  CircleDot,
  Copy,
  Download,
  ShieldAlert,
  Loader2,
  ExternalLink,
  MessageSquare,
  ChevronDown,
  Phone,
  PhoneCall,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAdminT } from "@/hooks/use-admin-t";
import { siteConfig, whatsappDirectLink } from "@/lib/site";
import { getProjectType, PROJECT_TYPES } from "@/lib/project-types";
import {
  fetchMessages,
  setMessageRead,
  deleteMessage,
  messagesToCsv,
  checkAdminAccess,
  isMessagesPubliclyExposed,
  type AdminMessage,
} from "@/lib/admin-api";
import type { AdminAuth } from "@/hooks/use-admin-auth";

interface Props {
  auth: AdminAuth;
}

type Filter = "all" | "unread" | "read";

const FILTER_LABEL_KEY = {
  all: "admin_filter_all",
  unread: "admin_filter_unread",
  read: "admin_filter_read",
} as const;

const READ_STATE_KEY = "admin_read_state";

function loadReadState(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(READ_STATE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function formatDate(iso: string | null | undefined, lang: "ar" | "en"): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function relativeTime(iso: string | null | undefined, lang: "ar" | "en"): string {
  if (!iso) return "";
  const time = new Date(iso).getTime();
  if (Number.isNaN(time)) return "";
  const diff = Date.now() - time;
  const minutes = Math.round(diff / 60000);
  const rtf = new Intl.RelativeTimeFormat(lang === "ar" ? "ar" : "en", { numeric: "auto" });
  if (Math.abs(minutes) < 1) return rtf.format(0, "minute");
  if (Math.abs(minutes) < 60) return rtf.format(-minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 30) return rtf.format(-days, "day");
  return rtf.format(-Math.round(days / 30), "month");
}

function initials(name: string): string {
  const clean = (name || "?").trim();
  const parts = clean.split(/\s+/).slice(0, 2);
  return parts.map((p) => p.charAt(0)).join("").toUpperCase() || "?";
}

export default function AdminDashboard({ auth }: Props) {
  const { lang } = useLanguage();
  const t = useAdminT();
  const isRtl = lang === "ar";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setupRequired, setSetupRequired] = useState(false);
  const [notListed, setNotListed] = useState(false);
  const [publiclyExposed, setPubliclyExposed] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [readState, setReadState] = useState<Record<string, boolean>>(loadReadState);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sqlCopied, setSqlCopied] = useState(false);

  const load = useCallback(async (silent = false) => {
    if (silent) setRefreshing(true);
    else setLoading(true);

    // تشخيص صلاحيات المدير أولاً
    const email = auth.user?.email;
    if (email) {
      const access = await checkAdminAccess(email);
      setSetupRequired(access.setupRequired);
      setNotListed(access.notListed);
    }

    // فحص مكشوف البيانات
    setPubliclyExposed(await isMessagesPubliclyExposed());

    const result = await fetchMessages();
    setMessages(result.messages);
    setError(result.error);
    if (result.setupRequired) setSetupRequired(true);
    setLastUpdate(new Date());
    setLoading(false);
    setRefreshing(false);
  }, [auth.user?.email]);

  useEffect(() => {
    void load();
  }, [load]);

  // تحديث تلقائي كل 45 ثانية
  useEffect(() => {
    const id = window.setInterval(() => void load(true), 45000);
    return () => window.clearInterval(id);
  }, [load]);

  useEffect(() => {
    try {
      localStorage.setItem(READ_STATE_KEY, JSON.stringify(readState));
    } catch {
      /* تجاهل */
    }
  }, [readState]);

  const isRead = useCallback(
    (m: AdminMessage) => {
      const override = readState[m.id];
      if (typeof override === "boolean") return override;
      if (typeof m.is_read === "boolean") return m.is_read;
      return (m.status ?? "").toLowerCase() === "read";
    },
    [readState],
  );

  const stats = useMemo(() => {
    const today = new Date();
    const isToday = (iso?: string | null) => {
      if (!iso) return false;
      const d = new Date(iso);
      return (
        d.getFullYear() === today.getFullYear() &&
        d.getMonth() === today.getMonth() &&
        d.getDate() === today.getDate()
      );
    };
    const unread = messages.filter((m) => !isRead(m)).length;
    return {
      total: messages.length,
      unread,
      read: messages.length - unread,
      today: messages.filter((m) => isToday(m.created_at)).length,
    };
  }, [messages, isRead]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return messages.filter((m) => {
      if (filter === "unread" && isRead(m)) return false;
      if (filter === "read" && !isRead(m)) return false;
      if (projectFilter !== "all" && (m.project_type ?? "other") !== projectFilter) return false;
      if (!term) return true;
      return (
        (m.name ?? "").toLowerCase().includes(term) ||
        (m.email ?? "").toLowerCase().includes(term) ||
        (m.phone ?? "").toLowerCase().includes(term) ||
        (m.message ?? "").toLowerCase().includes(term) ||
        (m.subject ?? "").toLowerCase().includes(term)
      );
    });
  }, [messages, filter, search, isRead, projectFilter]);

  /** عدد الرسائل لكل نوع مشروع (لعرضه على أزرار الفلترة) */
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const m of messages) {
      const key = m.project_type ?? "other";
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return counts;
  }, [messages]);

  const toggleRead = async (m: AdminMessage) => {
    const next = !isRead(m);
    // تحديث فوري في الواجهة، ثم مزامنة مع قاعدة البيانات
    setReadState((prev) => ({ ...prev, [m.id]: next }));
    await setMessageRead(m.id, next);
  };

  const handleDelete = async (m: AdminMessage) => {
    if (!window.confirm(t("admin_delete_confirm"))) return;
    const ok = await deleteMessage(m.id);
    if (ok) {
      setMessages((prev) => prev.filter((x) => x.id !== m.id));
    }
  };

  const handleExport = () => {
    const csv = messagesToCsv(filtered);
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `messages-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(SETUP_SQL);
      setSqlCopied(true);
      window.setTimeout(() => setSqlCopied(false), 2500);
    } catch {
      /* تجاهل */
    }
  };

  const replyWhatsapp = (m: AdminMessage) => {
    const text = `مرحباً ${m.name}،\nشكراً لتواصلك معي عبر الموقع بخصوص: ${m.subject || "استفساركم"}.\n`;
    // لو الزائر كتب رقمه، نردّ عليه مباشرة على رقمه — وإلا نستخدم رقم الموقع
    const customerPhone = (m.phone ?? "").replace(/[^\d]/g, "");
    const url =
      customerPhone.length >= 8
        ? `https://wa.me/${customerPhone}?text=${encodeURIComponent(text)}`
        : whatsappDirectLink(text);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const callPhone = (m: AdminMessage) => {
    const phone = (m.phone ?? "").replace(/[^\d+]/g, "");
    if (phone) window.location.href = `tel:${phone}`;
  };

  const replyEmail = (m: AdminMessage) => {
    const subject = m.subject ? `Re: ${m.subject}` : "Re: استفسار من موقعك";
    const body = `\n\n---\n${m.message}`;
    window.location.href = `mailto:${m.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const StatCard = ({
    icon: Icon,
    label,
    value,
    tone,
  }: {
    icon: typeof Inbox;
    label: string;
    value: number;
    tone: string;
  }) => (
    <div className="bg-card/70 backdrop-blur border border-card-border rounded-2xl p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tone}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-white leading-none font-display">{value}</p>
        <p className="text-[11px] text-white/45 mt-1.5 truncate">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* الهيدر */}
      <header className="sticky top-0 z-40 bg-[#07070a]/85 backdrop-blur-xl border-b border-card-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4FF0A7] to-emerald-600 flex items-center justify-center shrink-0 shadow-[0_8px_25px_-8px_rgba(79,240,167,0.8)]">
            <Inbox className="w-5 h-5 text-black" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-bold text-white truncate">{t("admin_title")}</h1>
            <p className="text-[11px] text-white/40 truncate">
              {auth.user?.email && (
                <>
                  {t("admin_signed_in_as")} <span className="text-[#4FF0A7]">{auth.user.email}</span>
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => void load(true)}
              title={t("admin_refresh")}
              aria-label={t("admin_refresh")}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <a
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-bold transition-colors"
            >
              {t("admin_back_site")}
              <BackArrow className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => void auth.signOut()}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 text-xs font-bold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t("admin_logout")}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* الإحصائيات */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Inbox} label={t("admin_total")} value={stats.total} tone="bg-[#4FF0A7]/15 text-[#4FF0A7]" />
          <StatCard icon={Mail} label={t("admin_unread")} value={stats.unread} tone="bg-amber-500/15 text-amber-400" />
          <StatCard icon={MailOpen} label={t("admin_read")} value={stats.read} tone="bg-emerald-500/15 text-emerald-400" />
          <StatCard icon={CalendarDays} label={t("admin_today")} value={stats.today} tone="bg-sky-500/15 text-sky-400" />
        </div>

        {/* لوحة إعداد قاعدة البيانات */}
        {setupRequired && (
          <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] p-6">
            <div className="flex items-start gap-3 mb-4">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-bold text-amber-300">{t("admin_setup_required_title")}</h2>
                <p className="text-xs text-white/55 mt-1 leading-relaxed">{t("admin_setup_required_desc")}</p>
              </div>
            </div>
            <pre
              dir="ltr"
              className="text-[11px] leading-relaxed bg-black/50 border border-white/10 rounded-xl p-4 overflow-x-auto max-h-72 text-white/70 font-mono"
            >
              {SETUP_SQL}
            </pre>
            <button
              onClick={handleCopySql}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-black text-xs font-bold hover:brightness-110 transition-all"
            >
              {sqlCopied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {sqlCopied ? t("admin_sql_copied") : t("admin_copy_sql")}
            </button>
          </div>
        )}

        {/* تنبيه حرج: جدول الرسائل مكشوف لأي زائر */}
        {publiclyExposed && (
          <div className="mb-8 rounded-2xl border border-red-500/40 bg-red-500/[0.09] p-6">
            <div className="flex items-start gap-3 mb-4">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-bold text-red-300">{t("admin_exposed_title")}</h2>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">{t("admin_exposed_desc")}</p>
              </div>
            </div>
            <button
              onClick={handleCopySql}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 text-white text-xs font-bold hover:brightness-110 transition-all"
            >
              {sqlCopied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {sqlCopied ? t("admin_sql_copied") : t("admin_copy_sql")}
            </button>
          </div>
        )}

        {/* تنبيه: البريد غير مُدرج في قائمة المديرين */}
        {notListed && (
          <div className="mb-8 rounded-2xl border border-sky-500/30 bg-sky-500/[0.07] p-6">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-bold text-sky-300">{t("admin_not_listed_title")}</h2>
                <p className="text-xs text-white/55 mt-1 leading-relaxed">{t("admin_not_listed_desc")}</p>
                <code className="inline-block mt-3 text-[11px] bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white/70 font-mono" dir="ltr">
                  insert into public.admin_users (email) values ('{auth.user?.email ?? ""}');
                </code>
              </div>
            </div>
          </div>
        )}

        {/* أدوات البحث */}
        <div className="bg-card/70 backdrop-blur border border-card-border rounded-2xl p-4 mb-6 flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("admin_search_ph")}
              className="w-full bg-background/70 border border-border rounded-xl py-3 ps-11 pe-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#4FF0A7] focus:ring-2 focus:ring-[#4FF0A7]/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            {(["all", "unread", "read"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  filter === f
                    ? "bg-[#4FF0A7] text-black"
                    : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t(FILTER_LABEL_KEY[f])}
              </button>
            ))}
            <button
              onClick={handleExport}
              title={t("admin_export")}
              aria-label={t("admin_export")}
              className="ms-auto w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors shrink-0"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* فلترة حسب نوع المشروع */}
        {Object.keys(projectCounts).length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-[11px] text-white/30 ms-1">{t("admin_project_type")}</span>
            <button
              onClick={() => setProjectFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                projectFilter === "all"
                  ? "bg-white/15 text-white"
                  : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/70"
              }`}
            >
              {t("admin_filter_all")} ({messages.length})
            </button>
            {PROJECT_TYPES.map((p) => {
              const count = projectCounts[p.value] ?? 0;
              if (!count) return null;
              const Icon = p.icon;
              const active = projectFilter === p.value;
              return (
                <button
                  key={p.value}
                  onClick={() => setProjectFilter(active ? "all" : p.value)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                    active ? "bg-[#4FF0A7] text-black" : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {lang === "ar" ? p.label : p.labelEn}
                  <span className={active ? "opacity-70" : "text-white/35"}>({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* قائمة الرسائل */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-white/40">
            <Loader2 className="w-7 h-7 animate-spin text-[#4FF0A7]" />
            <p className="text-sm">{t("admin_login_loading")}</p>
          </div>
        ) : error && !setupRequired ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.07] p-8 text-center">
            <p className="text-sm text-red-300 mb-4">{error}</p>
            <button
              onClick={() => void load()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 text-red-200 text-xs font-bold hover:bg-red-500/30 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              {t("admin_refresh")}
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-5">
              <MessageSquare className="w-9 h-9 text-white/25" />
            </div>
            <h3 className="text-base font-bold text-white/80 mb-1.5">
              {messages.length === 0 ? t("admin_empty") : t("admin_no_results")}
            </h3>
            <p className="text-xs text-white/35">{t("admin_empty_desc")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {filtered.map((m) => {
                const read = isRead(m);
                const open = expanded === m.id;
                const project = getProjectType(m.project_type);
                const ProjectIcon = project.icon;
                const projectLabel = lang === "ar" ? project.label : project.labelEn;
                const projectTone = project.tone;
                return (
                  <motion.article
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className={`rounded-2xl border transition-colors overflow-hidden ${
                      read
                        ? "bg-card/50 border-card-border"
                        : "bg-card/85 border-[#4FF0A7]/25 shadow-[0_0_0_1px_rgba(79,240,167,0.06)]"
                    }`}
                  >
                    <button
                      onClick={() => {
                        setExpanded(open ? null : m.id);
                        if (!read && !open) void toggleRead(m);
                      }}
                      className="w-full text-start p-5 flex items-start gap-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                          read ? "bg-white/5 text-white/40" : "bg-[#4FF0A7]/15 text-[#4FF0A7]"
                        }`}
                      >
                        {initials(m.name)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-sm font-bold ${read ? "text-white/60" : "text-white"}`}>
                            {m.name}
                          </span>
                          {!read && <CircleDot className="w-3.5 h-3.5 text-[#4FF0A7] shrink-0" />}
                          {m.project_type && (
                            <span
                              className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md ${projectTone}`}
                            >
                              <ProjectIcon className="w-3 h-3" />
                              {projectLabel}
                            </span>
                          )}
                          {m.subject && (
                            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/8 text-white/55 truncate max-w-[16rem]">
                              {m.subject}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-white/35 mb-2 flex items-center gap-3 flex-wrap" dir="ltr">
                          <span>{m.email}</span>
                          {m.phone && (
                            <span className="inline-flex items-center gap-1 text-[#4FF0A7]/70">
                              <Phone className="w-3 h-3" />
                              {m.phone}
                            </span>
                          )}
                        </p>
                        <p
                          className={`text-xs leading-relaxed line-clamp-2 ${read ? "text-white/40" : "text-white/65"}`}
                        >
                          {m.message}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-[10px] text-white/30 whitespace-nowrap">
                          {relativeTime(m.created_at, lang)}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-white/25 transition-transform ${open ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-card-border/60 pt-4">
                            <p className="text-sm text-white/85 leading-loose whitespace-pre-wrap mb-5">
                              {m.message}
                            </p>

                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => replyWhatsapp(m)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-black text-xs font-bold hover:brightness-110 transition-all"
                              >
                                <FaWhatsapp className="w-4 h-4" />
                                {t("admin_reply_whatsapp")}
                              </button>
                              <button
                                onClick={() => replyEmail(m)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4FF0A7]/15 text-[#4FF0A7] text-xs font-bold hover:bg-[#4FF0A7]/25 transition-all"
                              >
                                <Mail className="w-4 h-4" />
                                {t("admin_reply_email")}
                              </button>
                              {m.phone && (
                                <button
                                  onClick={() => callPhone(m)}
                                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-white/65 text-xs font-bold hover:bg-white/10 transition-all"
                                >
                                  <PhoneCall className="w-4 h-4" />
                                  {t("admin_call")}
                                </button>
                              )}
                              <button
                                onClick={() => void toggleRead(m)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-white/65 text-xs font-bold hover:bg-white/10 transition-all"
                              >
                                {read ? <CircleDot className="w-4 h-4" /> : <CheckCheck className="w-4 h-4" />}
                                {read ? t("admin_mark_unread") : t("admin_mark_read")}
                              </button>
                              <button
                                onClick={() => void handleDelete(m)}
                                className="ms-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-300 text-xs font-bold hover:bg-red-500/20 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                                {t("admin_delete")}
                              </button>
                            </div>

                            <p className="mt-4 text-[10px] text-white/25">
                              {formatDate(m.created_at, lang)}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* تذييل */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/30">
          <span>
            {lastUpdate
              ? `${t("admin_last_update")}: ${new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(lastUpdate)}`
              : ""}
          </span>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#4FF0A7] transition-colors"
          >
            <FaWhatsapp className="w-3.5 h-3.5" />
            {siteConfig.phoneDisplay}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </main>
    </div>
  );
}

/** كود SQL المطلوب تنفيذه في Supabase مرة واحدة لتفعيل الأمان والصلاحيات */
const SETUP_SQL = `-- 1) جدول المديرين المسموح لهم
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  created_at timestamptz not null default now()
);

-- 2) ضع بريدك هنا (مُعبّأ مسبقاً — عدّله لو أردت بريداً آخر)
insert into public.admin_users (email, full_name)
values ('cpshzt@gmail.com', 'Mohamed Ziad')
on conflict (email) do update set full_name = excluded.full_name;

-- 3) تجهيز جدول الرسائل
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null default '',
  project_type text,
  subject text,
  status text not null default 'new',
  is_read boolean not null default false,
  replied_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;
alter table public.messages add column if not exists created_at timestamptz not null default now();
alter table public.messages add column if not exists status text not null default 'new';
alter table public.messages add column if not exists is_read boolean not null default false;
alter table public.messages add column if not exists subject text;
alter table public.messages add column if not exists phone text;
alter table public.messages add column if not exists project_type text;
create index if not exists messages_project_type_idx on public.messages (project_type);

-- 4) دالة فحص المدير
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- 5) السياسات
drop policy if exists "public select messages" on public.messages;
create policy "public select messages" on public.messages
  for select to anon using (false);

drop policy if exists "public insert messages" on public.messages;
create policy "public insert messages" on public.messages
  for insert to anon, authenticated with check (true);

drop policy if exists "admins read messages" on public.messages;
create policy "admins read messages" on public.messages
  for select to authenticated using (public.is_admin());

drop policy if exists "admins update messages" on public.messages;
create policy "admins update messages" on public.messages
  for update to authenticated using (public.is_admin()) with check (true);

drop policy if exists "admins delete messages" on public.messages;
create policy "admins delete messages" on public.messages
  for delete to authenticated using (public.is_admin());

alter table public.admin_users enable row level security;
drop policy if exists "admins read admin_users" on public.admin_users;
create policy "admins read admin_users" on public.admin_users
  for select to authenticated
  using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

-- 6) منع إنشاء أي حساب خارج القائمة البيضاء
create or replace function public.enforce_admin_signup()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if not exists (
    select 1 from public.admin_users where lower(email) = lower(new.email)
  ) then
    raise exception 'Email % is not authorized as an administrator.', new.email;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_enforce_admin on auth.users;
create trigger on_auth_user_created_enforce_admin
  before insert on auth.users
  for each row execute function public.enforce_admin_signup();`;
