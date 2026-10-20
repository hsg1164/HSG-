import { useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { adminTranslations, type AdminTranslationKey } from "@/lib/admin-translations";

/**
 * جلب نصوص لوحة التحكم حسب اللغة الحالية.
 * منفصلة عن نصوص الموقع العام حتى تبقى كل نصوص الإدارة في ملف واحد.
 */
export function useAdminT(): (key: AdminTranslationKey) => string {
  const { lang } = useLanguage();

  return useCallback(
    (key: AdminTranslationKey): string => {
      const value = adminTranslations[lang][key];
      return typeof value === "string" ? value : key;
    },
    [lang],
  );
}
