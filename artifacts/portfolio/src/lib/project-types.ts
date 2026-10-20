import { Share2, Store, Building2, Globe, Shapes, type LucideIcon } from "lucide-react";

export type ProjectType = "social" | "ecommerce" | "company" | "general" | "other";

export interface ProjectTypeOption {
  value: ProjectType;
  label: string;
  labelEn: string;
  icon: LucideIcon;
  /** لون الأيقونة داخل الكارت */
  tone: string;
}

/**
 * أنواع المشاريع — تظهر في نموذج التواصل وتُحفظ في عمود project_type
 * وتظهر في لوحة التحكم كشارة على كل رسالة.
 */
export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    value: "social",
    label: "موقع تواصل اجتماعي",
    labelEn: "Social media site",
    icon: Share2,
    tone: "text-sky-400 bg-sky-500/15",
  },
  {
    value: "ecommerce",
    label: "متجر إلكتروني",
    labelEn: "E-commerce store",
    icon: Store,
    tone: "text-amber-400 bg-amber-500/15",
  },
  {
    value: "company",
    label: "موقع شركة",
    labelEn: "Company website",
    icon: Building2,
    tone: "text-violet-400 bg-violet-500/15",
  },
  {
    value: "general",
    label: "موقع عام",
    labelEn: "General website",
    icon: Globe,
    tone: "text-emerald-400 bg-emerald-500/15",
  },
  {
    value: "other",
    label: "موقع آخر",
    labelEn: "Other website",
    icon: Shapes,
    tone: "text-white/60 bg-white/10",
  },
];

export const PROJECT_TYPE_MAP: Record<string, ProjectTypeOption> = Object.fromEntries(
  PROJECT_TYPES.map((p) => [p.value, p]),
) as Record<string, ProjectTypeOption>;

/** رابط الأيقونة الافتراضية (للمستخدمين القدامى) */
export function getProjectType(value?: string | null): ProjectTypeOption {
  if (!value) return PROJECT_TYPE_MAP.other;
  return PROJECT_TYPE_MAP[value] ?? PROJECT_TYPE_MAP.other;
}
