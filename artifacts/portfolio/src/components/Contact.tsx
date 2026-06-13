import { motion } from "framer-motion";
import { MapPin, Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 inline-block">تواصل</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">لنعمل معاً</h2>
          <p className="text-white/60 text-lg max-w-xl">لديك مشروع في ذهنك؟ دعنا نحوّل رؤيتك إلى واقع. املأ النموذج وسأرد عليك في أقرب وقت.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 bg-card border border-card-border p-8 rounded-2xl"
          >
            <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/80">الاسم</label>
                  <input type="text" placeholder="اسمك الكريم" className="bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/80">البريد الإلكتروني</label>
                  <input type="email" placeholder="example@email.com" className="bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-left" dir="ltr" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/80">الموضوع</label>
                <input type="text" placeholder="موضوع الرسالة" className="bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white/80">الرسالة</label>
                <textarea rows={5} placeholder="كيف يمكنني مساعدتك؟" className="bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
              </div>
              <button type="button" className="bg-primary text-black font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors text-lg mt-2">
                أرسل الرسالة
              </button>
            </form>
          </motion.div>

          {/* Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex flex-col gap-4"
          >
            <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary"><MapPin className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-white mb-1">الموقع</h4>
                <p className="text-sm text-white/60">مُقيم في القاهرة، مصر<br/>متاح للعمل من الشرق الأوسط والعالم</p>
              </div>
            </div>
            
            <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary"><Mail className="w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-white mb-1">البريد الإلكتروني</h4>
                <a href="mailto:hello@mohammedz.dev" className="text-sm text-primary hover:underline font-mono" dir="ltr">hello@mohammedz.dev</a>
              </div>
            </div>

            <div className="bg-card border border-card-border p-6 rounded-2xl flex flex-col gap-4 flex-1 justify-between">
              <div>
                <div className="w-12 h-12 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mb-4"><MessageCircle className="w-6 h-6" /></div>
                <h4 className="font-bold text-white mb-1">واتساب</h4>
                <p className="text-sm text-white/60 mb-6">متاح للرد السريع على استفساراتك.</p>
              </div>
              <a href="#" className="w-full py-3 bg-[#25D366] text-black font-bold rounded-xl text-center hover:bg-[#25D366]/90 transition-colors">
                تواصل الآن
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
