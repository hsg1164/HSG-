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
          {/* Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`w-full lg:w-1/3 flex flex-col gap-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
          >
            <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col gap-4">
              <div className={`w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary ${lang === 'ar' ? 'self-start' : 'self-start'}`}><MapPin className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-white mb-1">{t('contact_location')}</h4>
                <p className="text-sm text-white/60">{lang === 'ar' ? 'كندا' : 'Canada'}</p>
              </div>
            </div>
            
            <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col gap-4 flex-1 justify-between">
              <div>
                <div className={`w-12 h-12 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mb-4 ${lang === 'ar' ? 'self-start' : 'self-start'}`}><MessageCircle className="w-6 h-6" /></div>
                <h4 className="font-bold text-white mb-1">{t('contact_whatsapp')}</h4>
                <p className="text-sm text-white/60 font-mono mb-2" dir="ltr">+1 416-737-7776</p>
                <p className="text-sm text-white/60 mb-6">{t('contact_whatsapp_desc')}</p>
              </div>
            </div>
          </motion.div>

          {/* WhatsApp Direct */}
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`w-full lg:w-2/3 bg-card border border-card-border p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-6`}
          >
            <div className="text-6xl mb-4 text-[#25D366]"><MessageCircle className="w-16 h-16 inline-block" /></div>
            <h3 className="text-2xl font-bold text-white">{lang === 'ar' ? 'تواصل معي مباشرة عبر واتساب' : 'Contact Me Directly via WhatsApp'}</h3>
            <p className="text-white/60 text-lg max-w-md mx-auto">{lang === 'ar' ? 'أنا متاح للرد على جميع استفساراتك ومناقشة مشروعك الجديد. اضغط على الزر أدناه لبدء المحادثة.' : 'I am available to answer all your inquiries and discuss your new project. Click the button below to start chatting.'}</p>
            <a href="https://api.whatsapp.com/send/?phone=14167377776" target="_blank" rel="noopener noreferrer" className="w-full max-w-sm py-4 bg-[#25D366] text-black font-bold rounded-xl text-center hover:bg-[#25D366]/90 transition-colors text-lg mt-4">
              {t('contact_whatsapp_btn')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
