import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Loader2, Copy, Check, Phone, Store, Building2, Globe, Share2, Shapes } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { supabase, isMissingColumnError } from "@/lib/supabase";
import { siteConfig } from "@/lib/site";
import { PROJECT_TYPES, type ProjectType } from "@/lib/project-types";
import { useLanguage } from "../contexts/LanguageContext";

export default function Contact() {
  const { toast } = useToast();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    projectType: "general" as ProjectType
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.phoneTel);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: lang === 'ar' ? "رقم الواتساب" : "WhatsApp number",
        description: siteConfig.phoneDisplay,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: lang === 'ar' ? "خطأ" : "Error",
        description: lang === 'ar' ? "يرجى تعبئة جميع الحقول المطلوبة." : "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const fullMessage = formData.subject
        ? `الموضوع: ${formData.subject}\n\nالرسالة:\n${formData.message}`
        : formData.message;

      // 1) المحاولة الكاملة — تتطلّب الأعمدة الجديدة (phone / subject / project_type)
      const { error } = await supabase.from('messages').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject || null,
          message: formData.message,
          project_type: formData.projectType,
        }
      ]);

      // 2) احتياطي: لو الأعمدة الجديدة لسه ما اتضافتش في القاعدة
      //    (نفّذ supabase/add-contact-fields.sql) نُرسل بالشكل القديم — ما يفشلش النموذج
      if (error && isMissingColumnError(error)) {
        const { error: fallbackError } = await supabase.from('messages').insert([
          {
            name: formData.name,
            email: formData.email,
            message: fullMessage,
          }
        ]);
        if (fallbackError) throw fallbackError;
      } else if (error) {
        throw error;
      }

      toast({
        title: t('contact_success'),
        description: lang === 'ar' ? "شكراً لتواصلك، سأرد عليك في أقرب وقت." : "Thank you for reaching out, I will get back to you shortly."
      });
      
      setFormData({ name: "", email: "", phone: "", subject: "", message: "", projectType: "general" });
    } catch (error) {
      console.error(error);
      toast({
        title: lang === 'ar' ? "حدث خطأ" : "Error",
        description: lang === 'ar'
          ? "تعذّر إرسال الرسالة. تأكد من تنفيذ ملف SQL (supabase/add-contact-fields.sql) في Supabase."
          : "Could not send the message. Make sure you ran supabase/add-contact-fields.sql in Supabase.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-16 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 inline-block">{t('contact_section_title')}</span>
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase"
            style={lang === 'ar' ? { fontFamily: "'ThmanyahSerifDisplay', sans-serif" } : {}}
          >
            {t('contact_title')}
          </h2>
          <p className="text-white/60 text-lg max-w-xl">{t('contact_desc')}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`w-full lg:w-2/3 bg-card border border-card-border p-8 rounded-2xl ${lang === 'ar' ? 'text-right' : 'text-left'}`}
          >
            <form className="flex flex-col gap-6" onSubmit={handleSubmit} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/80">{t('contact_form_name')}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder={t('contact_form_name_ph')} className={`bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors ${lang === 'ar' ? 'text-right' : 'text-left'}`} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/80">{t('contact_form_email')}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder={t('contact_form_email_ph')} className="bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-left" dir="ltr" />
                </div>
              </div>

              {/* رقم الواتساب أو الهاتف */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  {t('contact_form_phone')}
                  <span className="text-[10px] font-normal text-white/35">({t('contact_form_phone_optional')})</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('contact_form_phone_ph')}
                  className={`bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  dir="ltr"
                />
              </div>

              {/* نوع المشروع */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-white/80">{t('contact_form_project_type')}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PROJECT_TYPES.map((type) => {
                    const Icon = type.icon;
                    const selected = formData.projectType === type.value;
                    return (
                      <button
                        type="button"
                        key={type.value}
                        onClick={() => setFormData((prev) => ({ ...prev, projectType: type.value }))}
                        aria-pressed={selected}
                        className={`group flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-start transition-all ${
                          selected
                            ? "border-primary bg-primary/10 shadow-[0_0_0_1px_hsl(var(--primary))]"
                            : "border-border bg-background hover:border-primary/40 hover:bg-white/[0.03]"
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${type.tone} ${selected ? "ring-1 ring-primary/40" : "opacity-70 group-hover:opacity-100"}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className={`text-[11px] font-bold leading-tight ${selected ? "text-primary" : "text-white/60"}`}>
                          {lang === 'ar' ? type.label : type.labelEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/80">{t('contact_form_subject')}</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={t('contact_form_subject_ph')} className={`bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors ${lang === 'ar' ? 'text-right' : 'text-left'}`} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/80">{t('contact_form_message')}</label>
                <textarea rows={5} name="message" value={formData.message} onChange={handleChange} required placeholder={t('contact_form_message_ph')} className={`bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none ${lang === 'ar' ? 'text-right' : 'text-left'}`}></textarea>
              </div>
              <button type="submit" disabled={loading} className="bg-primary text-black font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors text-lg mt-2 flex items-center justify-center gap-2">
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? t('contact_btn_sending') : t('contact_btn')}
              </button>
            </form>
          </motion.div>

          {/* Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`w-full lg:w-1/3 flex flex-col gap-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
          >
            <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col gap-4">
              <div className={`w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary ${lang === 'ar' ? 'self-start' : 'self-start'}`}><MapPin className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-white mb-1">{t('contact_location')}</h4>
                <p className="text-sm text-white/60">201 Lormont BLVD, Stoney Creek ON<br />Canada - Postal Code: L8J 0K1</p>
              </div>
            </div>

            <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col gap-4">
              <div className={`w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary ${lang === 'ar' ? 'self-start' : 'self-start'}`}><Mail className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-white mb-1">{t('contact_form_email')}</h4>
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-primary hover:underline font-mono inline-block" dir="ltr">{siteConfig.email}</a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#25D366]/70 via-[#25D366]/15 to-transparent overflow-hidden flex-1"
            >
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#25D366]/20 blur-3xl pointer-events-none" />
              <div className="relative bg-card border border-card-border rounded-2xl p-6 flex flex-col gap-4 h-full overflow-hidden">
                <div className="absolute inset-x-0 -top-24 h-40 bg-[#25D366]/10 blur-3xl pointer-events-none" />

                <div className="relative flex items-center gap-4">
                  <div className="relative shrink-0">
                    <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping" />
                    <div className="relative w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.35)]">
                      <FaWhatsapp className="w-8 h-8 text-black" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white mb-0.5">{t('contact_whatsapp')}</h4>
                    <p className="text-xs text-[#25D366] font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                      {t('contact_whatsapp_online')}
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center gap-2 bg-background/60 border border-card-border rounded-xl px-4 py-3 group">
                  <p className="text-base text-white font-mono tracking-wider truncate" dir="ltr">
                    {siteConfig.phoneDisplay}
                  </p>
                  <button
                    type="button"
                    onClick={copyPhone}
                    aria-label={lang === 'ar' ? 'نسخ الرقم' : 'Copy number'}
                    className="ms-auto shrink-0 w-8 h-8 rounded-lg bg-white/5 hover:bg-[#25D366]/20 text-white/60 hover:text-[#25D366] flex items-center justify-center transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <p className="relative text-sm text-white/60 leading-relaxed">{t('contact_whatsapp_desc')}</p>

                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-auto w-full py-3.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-black font-bold rounded-xl text-center hover:brightness-110 transition-all shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] overflow-hidden group"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <span className="relative flex items-center justify-center gap-2">
                    <FaWhatsapp className="w-5 h-5" />
                    {t('contact_whatsapp_btn')}
                  </span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
