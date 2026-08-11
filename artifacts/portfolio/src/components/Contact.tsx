import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, MessageCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "../contexts/LanguageContext";

export default function Contact() {
  const { toast } = useToast();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

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
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.subject ? `الموضوع: ${formData.subject}\n\nالرسالة:\n${formData.message}` : formData.message,
            project_type: 'other',
          }
        ]);

      if (error) throw error;

      toast({
        title: t('contact_success'),
        description: lang === 'ar' ? "شكراً لتواصلك، سأرد عليك في أقرب وقت." : "Thank you for reaching out, I will get back to you shortly."
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      toast({
        title: lang === 'ar' ? "حدث خطأ" : "Error",
        description: t('contact_error'),
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
                <p className="text-sm text-white/60" dangerouslySetInnerHTML={{ __html: t('contact_location_desc') }}></p>
              </div>
            </div>
            
            <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col gap-4">
              <div className={`w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary ${lang === 'ar' ? 'self-start' : 'self-start'}`}><Mail className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-white mb-1">{t('contact_form_email')}</h4>
                <a href="mailto:cpshzt@gmail.com" className={`text-sm text-primary hover:underline font-mono inline-block ${lang === 'ar' ? '' : ''}`} dir="ltr">cpshzt@gmail.com</a>
              </div>
            </div>

            <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col gap-4 flex-1 justify-between">
              <div>
                <div className={`w-12 h-12 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mb-4 ${lang === 'ar' ? 'self-start' : 'self-start'}`}><MessageCircle className="w-6 h-6" /></div>
                <h4 className="font-bold text-white mb-1">{t('contact_whatsapp')}</h4>
                <p className="text-sm text-white/60 mb-6">{t('contact_whatsapp_desc')}</p>
              </div>
              <a href="https://wa.me/qr/EYLZ3L2G2EYEK1" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-[#25D366] text-black font-bold rounded-xl text-center hover:bg-[#25D366]/90 transition-colors">
                {t('contact_whatsapp_btn')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
