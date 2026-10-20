import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  ClipboardPaste,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { evaluatePassword, isStrongEnough } from "@/lib/password-strength";
import {
  ADMIN_EMAIL,
  MAX_LOGIN_ATTEMPTS,
  LOCKOUT_MINUTES,
} from "@/lib/admin-config";
import type { AdminAuth, AuthErrorKind } from "@/hooks/use-admin-auth";

type Mode = "login" | "setup";

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
  const { t, lang } = useLanguage();
  const isRtl = lang === "ar";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ kind: AuthErrorKind; message: string } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [showEmail, setShowEmail] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const strength = useMemo(() => evaluatePassword(password), [password]);
  const now = Date.now();
  const isLocked = lockedUntil > now;

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(ATTEMPT_KEY) ?? 0);
      if (Number.isFinite(stored)) setAttempts(stored);
    } catch {
      /* تجاهل */
    }
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

    if (!email.trim() || !password) {
      setError({ kind: "generic", message: t("admin_err_generic") });
      return;
    }

    if (mode === "setup") {
      if (!isStrongEnough(password)) {
        setError({ kind: "generic", message: t("admin_pwd_hint") });
        return;
      }
      if (password !== confirm) {
        setError({ kind: "generic", message: t("admin_err_password_mismatch") });
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const res = await auth.signIn(email, password);
        if (res.error) {
          const next = attempts + 1;
          saveAttempts(next);
          if (next >= MAX_LOGIN_ATTEMPTS) {
            setLockedUntil(Date.now() + LOCKOUT_MINUTES * 60_000);
            saveAttempts(0);
          }
          setError({ kind: res.kind, message: res.error });
        } else {
          saveAttempts(0);
        }
      } else {
        const res = await auth.signUp(email, password);
        if (res.error) {
          setError({ kind: res.kind, message: res.error });
        } else if (res.needsConfirmation) {
          setNotice(t("admin_err_confirm_email"));
          setMode("login");
        }
      }
    } catch (err) {
      setError({ kind: "generic", message: err instanceof Error ? err.message : t("admin_err_generic") });
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

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
    setNotice(null);
    setConfirm("");
    setPassword("");
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
        className="relative w-full max-w-[26rem]"
      >
        {/* الأيقونة */}
        <div className="text-center mb-7">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-3xl bg-gradient-to-br from-[#4FF0A7] via-emerald-400 to-emerald-600 mb-5 shadow-[0_18px_50px_-10px_rgba(79,240,167,0.85)] relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-[#4FF0A7]/30 blur-xl" />
            {mode === "login" ? (
              <Lock className="w-8 h-8 text-black relative" />
            ) : (
              <UserPlus className="w-8 h-8 text-black relative" />
            )}
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {mode === "login" ? t("admin_login_title") : t("admin_setup_title")}
          </h1>
          <p className="text-white/45 text-[13px] leading-relaxed">
            {mode === "login" ? t("admin_login_desc") : t("admin_setup_desc")}
          </p>
        </div>

        {/* البطاقة */}
        <div className="bg-card/85 backdrop-blur-2xl border border-card-border rounded-[1.75rem] p-7 shadow-[0_35px_90px_-35px_rgba(0,0,0,0.95)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" dir={isRtl ? "rtl" : "ltr"}>
            {/* البريد — مخفي افتراضياً حتى يبقى التركيز على كلمة المرور */}
            <AnimatePresence initial={false}>
              {mode === "setup" || showEmail ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-2 pb-1">
                    <label htmlFor="admin-email" className="text-[11px] font-bold text-white/60">
                      {t("admin_email")}
                    </label>
                    <div className="relative">
                      <Mail className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                      <input
                        id="admin-email"
                        type="email"
                        autoComplete="username"
                        dir="ltr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("admin_email_ph")}
                        className="w-full bg-background/70 border border-border rounded-xl py-3.5 ps-11 pe-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#4FF0A7] focus:ring-2 focus:ring-[#4FF0A7]/20 transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

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
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  autoFocus
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full bg-background/70 border border-border rounded-xl py-4 ps-11 pe-24 text-white text-[15px] tracking-[0.2em] placeholder:text-white/20 placeholder:tracking-normal focus:outline-none focus:border-[#4FF0A7] focus:ring-2 focus:ring-[#4FF0A7]/20 transition-all"
                />
                <div className="absolute end-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {mode === "setup" && (
                    <button
                      type="button"
                      onClick={pastePassword}
                      aria-label="لصق"
                      className="w-9 h-9 rounded-lg text-white/35 hover:text-[#4FF0A7] hover:bg-white/5 flex items-center justify-center transition-colors"
                    >
                      <ClipboardPaste className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                    className="w-9 h-9 rounded-lg text-white/35 hover:text-[#4FF0A7] hover:bg-white/5 flex items-center justify-center transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* مقياس القوة */}
              {mode === "setup" && password.length > 0 && (
                <div className="mt-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-white/40">{t("admin_strength")}</span>
                    <span className={`text-[11px] font-bold ${STRENGTH_STYLE[strength.label].text}`}>
                      {t(STRENGTH_LABEL_KEY[strength.label])}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${STRENGTH_STYLE[strength.label].bar} ${STRENGTH_STYLE[strength.label].width}`}
                    />
                  </div>
                  {strength.hints.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {strength.hints.slice(0, 3).map((hint) => (
                        <li key={hint} className="text-[11px] text-white/40 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-white/30" />
                          {hint}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* تأكيد كلمة المرور */}
            {mode === "setup" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="admin-confirm" className="text-[11px] font-bold text-white/60">
                  {t("admin_password_confirm")}
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  <input
                    id="admin-confirm"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    dir="ltr"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full bg-background/70 border border-border rounded-xl py-3.5 ps-11 pe-4 text-white text-sm tracking-[0.2em] placeholder:text-white/20 placeholder:tracking-normal focus:outline-none focus:border-[#4FF0A7] focus:ring-2 focus:ring-[#4FF0A7]/20 transition-all"
                  />
                </div>
              </div>
            )}

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
              ) : mode === "login" ? (
                <Lock className="w-4 h-4 relative" />
              ) : (
                <UserPlus className="w-4 h-4 relative" />
              )}
              <span className="relative">
                {loading
                  ? mode === "login"
                    ? t("admin_login_loading")
                    : t("admin_setup_loading")
                  : mode === "login"
                    ? t("admin_login_btn")
                    : t("admin_setup_btn")}
              </span>
            </button>

            {/* مفاتيح التبديل */}
            <div className="flex items-center justify-between gap-3 -mt-1">
              {mode === "login" ? (
                <button
                  type="button"
                  onClick={() => setShowEmail((v) => !v)}
                  className="text-[11px] text-white/35 hover:text-[#4FF0A7] transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {showEmail ? t("admin_hide_email") : t("admin_change_email")}
                </button>
              ) : (
                <span className="text-[11px] text-white/30">{t("admin_min_length")}</span>
              )}

              <button
                type="button"
                onClick={() => switchMode(mode === "login" ? "setup" : "login")}
                className="text-[11px] text-white/45 hover:text-[#4FF0A7] transition-colors flex items-center gap-1.5"
              >
                {mode === "login" ? t("admin_setup_link") : t("admin_setup_back")}
                <Arrow className="w-3.5 h-3.5" />
              </button>
            </div>
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
