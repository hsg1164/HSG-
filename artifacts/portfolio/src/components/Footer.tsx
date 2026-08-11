import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t, lang } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full relative">
      
      {/* Main Green Section (CTA + Footer Links) */}
      <div className="bg-[#4FF0A7] text-black rounded-t-[2rem] md:rounded-t-[3rem] pt-16 pb-10 px-4 shadow-[0_-10px_40px_rgba(79,240,167,0.1)] relative z-10">
        
        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold mb-3 opacity-80 uppercase"
          >
            {t('footer_ready')}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-black uppercase"
            style={lang === 'ar' ? { fontFamily: "'ThmanyahSerifDisplay', sans-serif" } : {}}
          >
            {t('footer_build')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs md:text-sm font-medium opacity-80 mb-8 max-w-md mx-auto"
          >
            {t('footer_desc')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-3"
          >
            <a 
              href="#contact" 
              className="px-5 py-2 bg-white text-black font-bold border border-black rounded-full hover:bg-black hover:text-white transition-all flex items-center gap-1.5 text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" style={{ transform: lang === 'en' ? 'rotate(180deg)' : 'none' }} /> {t('footer_start')}
            </a>
            <a 
              href="#contact" 
              className="px-5 py-2 bg-white text-black font-bold border border-black rounded-full hover:bg-black hover:text-white transition-all text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              {t('footer_hi')}
            </a>
          </motion.div>
        </div>

        {/* Footer Links Section */}
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 ${lang === 'ar' ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
            
            {/* Brand / Bio */}
            <div className={`flex flex-col items-center ${lang === 'ar' ? 'md:items-start' : 'md:items-start'}`}>
              <h3 className="text-lg font-bold mb-3">{t('footer_name')} <span className="text-black/50">.</span></h3>
              <p className={`text-xs font-medium opacity-80 leading-relaxed max-w-xs mb-4 text-center ${lang === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
                {t('footer_bio')}
              </p>
              <div className="flex gap-3">
                <a href="mailto:cpshzt@gmail.com" className="w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  <FaEnvelope className="w-3.5 h-3.5" />
                </a>
                <a href="https://github.com/HSG6" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  <FiGithub className="w-3.5 h-3.5" />
                </a>
                <a href="https://x.com/Moh_HSG" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  <FaXTwitter className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col items-center">
              <h4 className="text-xs font-bold mb-4 opacity-70 uppercase">{t('footer_nav')}</h4>
              <ul className="space-y-2">
                {[t('nav_about'), t('nav_services'), t('nav_projects'), t('nav_experience'), t('nav_contact')].map((link, i) => (
                  <li key={i}>
                    <a href={`#${["about", "services", "projects", "experience", "contact"][i]}`} className="text-xs font-bold hover:opacity-70 transition-opacity">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className={`flex flex-col items-center ${lang === 'ar' ? 'md:items-end' : 'md:items-end'}`}>
              <h4 className="text-xs font-bold mb-4 opacity-70 uppercase">{t('footer_contact')}</h4>
              <ul className={`space-y-2 text-center mb-4 ${lang === 'ar' ? 'md:text-left' : 'md:text-right'}`} dir="ltr">
                <li>
                  <a href="mailto:cpshzt@gmail.com" className="text-xs font-bold hover:opacity-70 transition-opacity">
                    cpshzt@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+14167377776" className="text-xs font-bold hover:opacity-70 transition-opacity">
                    +1 416 737 7776
                  </a>
                </li>
                <li className="text-xs font-bold">
                  {t('about_location')}
                </li>
              </ul>
              <button 
                onClick={scrollToTop}
                className="px-4 py-1.5 bg-black text-white rounded-full text-[10px] font-bold hover:opacity-80 transition-opacity flex items-center gap-1.5"
              >
                {t('footer_top')} <ArrowUp className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Very Bottom Dark Bar */}
      <div className={`bg-[#0a0a0a] border-t border-white/5 py-4 px-4 text-center relative z-0 ${lang === 'ar' ? 'md:text-left' : 'md:text-right'}`}>
        <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4 ${lang === 'ar' ? 'justify-between' : 'justify-between'}`}>
          <p className="text-[10px] text-white/40 font-medium">
            {t('footer_credit')}
          </p>
          <p className="text-[10px] text-white/40 font-medium" dir="ltr">
            © {new Date().getFullYear()} {t('footer_name')}. {t('footer_rights')}
          </p>
        </div>
      </div>

    </footer>
  );
}
