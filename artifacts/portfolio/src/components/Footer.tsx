import { motion } from "framer-motion";
import { FaLinkedinIn, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { ArrowLeft, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Footer CTA */}
      <section className="bg-primary py-24 px-4 text-black text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            مستعد للبداية؟ <br/>لنبنِ شيئاً مختلفاً.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-medium opacity-80 mb-12 max-w-2xl mx-auto"
          >
            لديك مشروع أو فكرة أو تريد أن تقول مرحباً؟ يسعدني التواصل.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="#contact" className="px-8 py-4 bg-black text-primary font-bold rounded-xl hover:bg-black/90 transition-colors flex items-center justify-center gap-2 text-lg">
              ابدأ مشروعاً <ArrowLeft className="w-5 h-5" />
            </a>
            <a href="#contact" className="px-8 py-4 bg-transparent border-2 border-black text-black font-bold rounded-xl hover:bg-black/5 transition-colors text-lg flex items-center justify-center">
              قُل مرحباً
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-black pt-20 pb-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Brand */}
            <div className="md:col-span-5">
              <a href="#" className="text-3xl font-bold text-white tracking-wider mb-6 inline-block">
                <span className="text-primary">.</span>محمد زياد
              </a>
              <p className="text-white/60 leading-relaxed max-w-sm mb-8">
                أصمم وأدير منظومات نمو رقمية متكاملة تجمع بين التسويق، التقنية، والبيانات.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-colors">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-colors">
                  <FaWhatsapp />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-colors">
                  <FaEnvelope />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-3">
              <h4 className="text-lg font-bold text-white mb-6">التصفح</h4>
              <ul className="space-y-4">
                {["عني", "الخدمات", "المشاريع", "الخبرات", "الشهادات", "تواصل"].map((link, i) => (
                  <li key={i}>
                    <a href={`#${["about", "services", "projects", "experience", "certificates", "contact"][i]}`} className="text-white/60 hover:text-primary transition-colors text-sm font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h4 className="text-lg font-bold text-white mb-6">تواصل مباشر</h4>
              <ul className="space-y-4">
                <li className="flex flex-col gap-1">
                  <span className="text-xs text-white/40 uppercase tracking-widest">البريد الإلكتروني</span>
                  <a href="mailto:hello@mohammedz.dev" className="text-white/80 hover:text-primary transition-colors font-mono text-sm" dir="ltr">hello@mohammedz.dev</a>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-xs text-white/40 uppercase tracking-widest">واتساب</span>
                  <a href="#" className="text-white/80 hover:text-primary transition-colors font-mono text-sm" dir="ltr">+20 100 000 0000</a>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-xs text-white/40 uppercase tracking-widest">الموقع</span>
                  <span className="text-white/80 text-sm">القاهرة، مصر (متاح عالمياً)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} محمد زياد. جميع الحقوق محفوظة.
            </p>
            <button 
              onClick={scrollToTop}
              className="px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full text-sm font-medium transition-colors flex items-center gap-2"
            >
              اذهب للأعلى <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
