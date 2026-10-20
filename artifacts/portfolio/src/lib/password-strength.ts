export interface PasswordStrength {
  /** 0 إلى 4 */
  score: number;
  label: "weak" | "fair" | "good" | "strong";
  /** نصائح لتحسين كلمة المرور */
  hints: string[];
}

/**
 * تقييم قوة كلمة المرور.
 * لا يتم تخزين أو إرسال كلمة المرور لأي مكان — التقييم يتم داخل المتصفح فقط
 * لمساعدتك على اختيار كلمة مرور قوية.
 */
export function evaluatePassword(password: string): PasswordStrength {
  const hints: string[] = [];
  let score = 0;

  if (password.length >= 8) score += 1;
  else hints.push("8 أحرف على الأقل");

  if (password.length >= 14) score += 1;
  else if (password.length >= 8) hints.push("14 حرفاً أو أكثر");

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  else hints.push("حرف كبير وحرف صغير");

  if (/\d/.test(password)) score += 1;
  else hints.push("رقم واحد على الأقل");

  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else hints.push("رمز خاص مثل ! @ #");

  const clamped = Math.min(score, 4);
  const label: PasswordStrength["label"] =
    clamped <= 1 ? "weak" : clamped === 2 ? "fair" : clamped === 3 ? "good" : "strong";

  return { score: clamped, label, hints };
}

/** هل كلمة المرور قوية بما يكفي للوحة التحكم؟ */
export function isStrongEnough(password: string): boolean {
  const { score } = evaluatePassword(password);
  return (
    score >= 4 &&
    password.length >= 12 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}
