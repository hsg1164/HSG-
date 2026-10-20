/**
 * إعدادات الموقع الموحّدة (Site-wide configuration)
 * كل بيانات التواصل في مكان واحد حتى يسهل تعديلها مرة واحدة فقط.
 */

export const siteConfig = {
  name: "محمد زياد",
  nameEn: "Mohamed Ziad",

  /** الرقم بصيغة العرض (لاinternational format) */
  phoneDisplay: "+972 59-231-1460",

  /** الرقم بصيغة الاتصال من فضلك */
  phoneTel: "+972592311460",

  /** الرقم بصيغة واتساب الدولية بدون + */
  phoneWhatsapp: "972592311460",

  /** رابط واتساب المطلوب */
  whatsappUrl: "https://api.whatsapp.com/message/4TYV7IWEUNAXN1",

  email: "cpshzt@gmail.com",

  location: {
    line1: "201 Lormont BLVD, Stoney Creek ON",
    line2: "Canada - Postal Code: L8J 0K1",
  },

  socials: {
    github: "https://github.com/HSG6",
    x: "https://x.com/Moh_HSG",
    linkedin: "https://www.linkedin.com/in/hsg6/",
  },
} as const;

/** رابط واتساب مع نص جاهز (للرد على رسالة من لوحة التحكم) */
export function whatsappDirectLink(text?: string) {
  const base = `https://wa.me/${siteConfig.phoneWhatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** رابط واتساب الرسمي المعتمد في الموقع */
export const WHATSAPP_LINK = siteConfig.whatsappUrl;
