import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ClipboardPaste,
  Sparkles,
  CheckCircle2,
  Fingerprint,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAdminT } from "@/hooks/use-admin-t";
import { evaluatePassword } from "@/lib/password-strength";
import { ADMIN_EMAIL, MAX_LOGIN_ATTEMPTS, LOCKOUT_MINUTES } from "@/lib/admin-config";
import type { AdminAuth, AuthErrorKind } from "@/hooks/use-admin-auth";

interface Props {
  auth: AdminAuth;
}

const STRENGTH_LABEL_KEY = {
  weak: "admin_strength_weak",
  fair: "admin_strength_fair",
  good: "admin_strength_good",
  strong: "admin_strength_strong",
} as const;

const STRENGTH_STYLE: Record<string, { bar: string; text: string; width: string }> = {
  weak: { bar: "bg-red-500", text: "text-red-400", width: "w-1/4" },
  fair: { bar: "bg-amber-500", text: "text-amber-400", width: "w-2/4" },
  good: { bar: "bg-lime-500", text: "text-lime-400", width: "w-3/4" },
  strong: { bar: "bg-[#4FF0A7]", text: "text-[#4FF0A7]", width: "w-full" },
};

const ATTEMPT_KEY = "admin_login_attempts";

export default function AdminGate({ auth }: Props) {
  const { lang } = useLanguage();
  const t = useAdminT();
  const isRtl = lang === "ar";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ kind: AuthErrorKind; message: string } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const provisionedRef = useRef(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const strength = useMemo(() => evaluatePassword(password), [password]);
  const isLocked = lockedUntil > Date.now();

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(ATTEMPT_KEY) ?? 0);
      if (Number.isFinite(stored)) setAttempts(stored);
    } catch {
      /* تجاهل */
    }
    passwordRef.current?.focus();
  }, []);

  const saveAttempts = (value: number) => {
    setAttempts(value);
    try {
      localStorage.setItem(ATTEMPT_KEY, String(value));
    } catch {
      /* تجاهل */
    }
  };

  const errorText = (kind: AuthErrorKind, message: string) => {
    switch (kind) {
      case "invalid_credentials":
        return t("admin_err_invalid_credentials");
      case "email_taken":
        return t("admin_err_email_taken");
      case "not_allowed":
        return t("admin_err_email_not_allowed");
      case "needs_confirmation":
        return t("admin_err_confirm_email");
      case "signups_disabled":
        return t("admin_err_signups_disabled");
      case "network":
        return t("admin_err_network");
      default:
        return message || t("admin_err_generic");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (isLocked) {
      setError({ kind: "generic", message: t("admin_err_locked") });
      return;
    }

    if (!password) {
      setError({ kind: "generic", message: t("admin_err_generic") });
      return;
    }

    setLoading(true);
    try {
      // 1) محاولة تسجيل الدخول العادية
      const res = await auth.signIn(ADMIN_EMAIL, password);

      if (!res.error) {
        saveAttempts(0);
        return;
      }

      // 2) أول دخول على هذا الجهاز: إنشاء حساب المدير تلقائياً
      //    (مسموح فقط للبريد الموجود في قائمة admin_users داخل القاعدة)
      if (res.kind === "invalid_credentials" && !provisionedRef.current) {
        provisionedRef.current = true;
        const created = await auth.signUp(ADMIN_EMAIL, password);

        if (!created.error) {
          const again = await auth.signIn(ADMIN_EMAIL, password);
          if (!again.error) {
            saveAttempts(0);
            setNotice(t("admin_provisioned_notice"));
            return;
          }
          setError({ kind: again.kind, message: again.error ?? "" });
          setLoading(false);
          return;
        }

        if (created.kind === "signups_disabled" || created.kind === "not_allowed") {
          setError({ kind: created.kind, message: created.error ?? "" });
          setLoading(false);
          return;
        }
      }

      const next = attempts + 1;
      saveAttempts(next);
      if (next >= MAX_LOGIN_ATTEMPTS) {
        setLockedUntil(Date.now() + LOCKOUT_MINUTES * 60_000);
        saveAttempts(0);
      }
      setError({ kind: res.kind, message: res.error ?? "" });
    } catch (err) {
      setError({
        kind: "generic",
        message: err instanceof Error ? err.message : t("admin_err_generic"),
      });
    } finally {
      setLoading(false);
    }
  };

  const pastePassword = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setPassword(text);
        passwordRef.current?.focus();
      }
    } catch {
      /* تجاهل */
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* الخلفية المتوهجة */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 start-1/4 w-[30rem] h-[30rem] rounded-full bg-[#4FF0A7]/12 blur-[130px]"
        />
        <motion.div
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-48 end-0 w-[28rem] h-[28rem] rounded-full bg-emerald-600/12 blur-[130px]"
        />
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--card-border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--card-border)) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[25rem]"
      >
        {/* الأيقونة */}
        <div className="text-center mb-7">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-3xl bg-gradient-to-br from-[#4FF0A7] via-emerald-400 to-emerald-600 mb-5 shadow-[0_18px_50px_-10px_rgba(79,240,167,0.85)] relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-[#4FF0A7]/30 blur-xl" />
            <Fingerprint className="w-9 h-9 text-black relative" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{t("admin_login_title")}</h1>
          <p className="text-white/45 text-[13px] leading-relaxed">{t("admin_login_desc")}</p>
        </div>

        {/* البطاقة */}
        <div className="bg-card/85 backdrop-blur-2xl border border-card-border rounded-[1.75rem] p-7 shadow-[0_35px_90px_-35px_rgba(0,0,0,0.95)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" dir={isRtl ? "rtl" : "ltr"}>
            {/* كلمة المرور */}
            <div className="flex flex-col gap-2">
              <label htmlFor="admin-password" className="text-[11px] font-bold text-white/60">
                {t("admin_password")}
              </label>
              <div className="relative">
                <KeyRound className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  id="admin-password"
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  autoFocus
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full bg-background/70 border border-border rounded-xl py-4 ps-11 pe-24 text-white text-[15px] tracking-[0.2em] placeholder:text-white/20 placeholder:tracking-normal focus:outline-none focus:border-[#4FF0A7] focus:ring-2 focus:ring-[#4FF0A7]/20 transition-all"
                />
                <div className="absolute end-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={pastePassword}
                    aria-label={t("admin_paste")}
                    title={t("admin_paste")}
                    className="w-9 h-9 rounded-lg text-white/35 hover:text-[#4FF0A7] hover:bg-white/5 flex items-center justify-center transition-colors"
                  >
                    <ClipboardPaste className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? t("admin_hide_password") : t("admin_show_password")}
                    title={showPassword ? t("admin_hide_password") : t("admin_show_password")}
                    className="w-9 h-9 rounded-lg text-white/35 hover:text-[#4FF0A7] hover:bg-white/5 flex items-center justify-center transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* مقياس القوة — يظهر أثناء الكتابة */}
              <AnimatePresence>
                {password.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-white/35">{t("admin_strength")}</span>
                        <span className={`text-[10px] font-bold ${STRENGTH_STYLE[strength.label].text}`}>
                          {t(STRENGTH_LABEL_KEY[strength.label])}
                        </span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${STRENGTH_STYLE[strength.label].bar} ${STRENGTH_STYLE[strength.label].width}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* الأخطاء والتنبيهات */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/25 px-4 py-3 text-red-300 text-[12px] leading-relaxed"
                >
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorText(error.kind, error.message)}</span>
                </motion.div>
              )}
              {notice && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-start gap-2.5 rounded-xl bg-[#4FF0A7]/10 border border-[#4FF0A7]/25 px-4 py-3 text-[#4FF0A7] text-[12px] leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{notice}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* الزر */}
            <button
              type="submit"
              disabled={loading || isLocked}
              className="group relative w-full py-4 rounded-xl bg-gradient-to-r from-[#4FF0A7] via-emerald-400 to-emerald-600 text-black font-extrabold text-sm hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_16px_40px_-14px_rgba(79,240,167,0.9)] overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin relative" />
              ) : (
                <Lock className="w-4 h-4 relative" />
              )}
              <span className="relative">
                {loading ? t("admin_login_loading") : t("admin_login_btn")}
              </span>
            </button>
          </form>
        </div>

        {/* شريط الأمان */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11px] text-white/30"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4FF0A7]" />
            {t("admin_secure_badge")}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/15" />
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#4FF0A7]" />
            {t("admin_session_expires")}
          </span>
        </motion.div>

        {/* رابط العودة للموقع */}
        <div className="mt-5 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/70 transition-colors"
          >
            {t("admin_back_site")}
            <Arrow className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
