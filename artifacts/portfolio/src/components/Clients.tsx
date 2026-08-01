import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function Clients() {
  const { t, lang } = useLanguage();
  const row1 = t('tech_row1') as unknown as string[];
  const row2 = t('tech_row2') as unknown as string[];

  return (
    <section className="py-24 px-4 overflow-hidden bg-transparent relative">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>

      <div className="max-w-6xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-[#00E5A0] font-bold tracking-wider text-sm mb-3 inline-block uppercase">{t('tech_section_title')}</span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-white uppercase"
            style={lang === 'ar' ? { fontFamily: "'ThmanyahSerifDisplay', sans-serif" } : {}}
          >
            {t('tech_title')}
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full max-w-[90rem] mx-auto mask-gradient" dir="ltr">
        
        {/* Row 1: Moving Left */}
        <div className="flex w-max animate-marquee-left mb-8 md:mb-12">
          {/* We duplicate the array to create a seamless loop */}
          {[...row1, ...row1].map((client, idx) => (
            <div 
              key={`r1-${idx}`} 
              className="flex items-center justify-center px-6 md:px-12"
            >
              <span className="text-xl md:text-2xl font-bold tracking-widest text-white/40 hover:text-white transition-colors duration-500 cursor-default whitespace-nowrap">
                ✳ {client}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Moving Right */}
        <div className="flex w-max animate-marquee-right">
          {[...row2, ...row2].map((client, idx) => (
            <div 
              key={`r2-${idx}`} 
              className="flex items-center justify-center px-6 md:px-12"
            >
              <span className="text-xl md:text-2xl font-bold tracking-widest text-white/40 hover:text-white transition-colors duration-500 cursor-default whitespace-nowrap">
                ✳ {client}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
