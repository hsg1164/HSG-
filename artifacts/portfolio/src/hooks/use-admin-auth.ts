import { useCallback, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type AuthStatus = "loading" | "signed_out" | "signed_in";

export type AuthErrorKind =
  | "invalid_credentials"
  | "email_taken"
  | "not_allowed"
  | "needs_confirmation"
  | "signups_disabled"
  | "generic";

export interface AdminAuth {
  status: AuthStatus;
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null; kind: AuthErrorKind }>;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null; kind: AuthErrorKind; needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
}

/** ترجمة أخطاء Supabase إلى أنواع مفهومة */
function classifyError(message: string): AuthErrorKind {
  const msg = message.toLowerCase();
  if (msg.includes("invalid login credentials")) return "invalid_credentials";
  if (msg.includes("already registered") || msg.includes("already been registered")) return "email_taken";
  if (msg.includes("not authorized as an administrator")) return "not_allowed";
  if (msg.includes("email not confirmed")) return "needs_confirmation";
  if (msg.includes("signups not allowed") || msg.includes("signup is disabled")) return "signups_disabled";
  return "generic";
}

/**
 * إدارة جلسة المدير عبر Supabase Auth.
 * كلمات المرور تُخزَّن مُجزّأة (bcrypt) داخل Supabase ولا تمرّ على المتصفح،
 * والجلسة عبارة عن JWT موقّع تنتهي صلاحيتها تلقائياً.
 */
export function useAdminAuth(): AdminAuth {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session ?? null);
      setStatus(data.session ? "signed_in" : "signed_out");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setStatus(nextSession ? "signed_in" : "signed_out");
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) return { error: error.message, kind: classifyError(error.message) };
    setSession(data.session);
    setStatus("signed_in");
    return { error: null, kind: "generic" as AuthErrorKind };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { role: "admin" } },
    });
    if (error) return { error: error.message, kind: classifyError(error.message), needsConfirmation: false };
    const needsConfirmation = !data.session;
    if (data.session) {
      setSession(data.session);
      setStatus("signed_in");
    }
    return { error: null, kind: "generic" as AuthErrorKind, needsConfirmation };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setStatus("signed_out");
  }, []);

  return {
    status,
    user: session?.user ?? null,
    session,
    signIn,
    signUp,
    signOut,
  };
}
