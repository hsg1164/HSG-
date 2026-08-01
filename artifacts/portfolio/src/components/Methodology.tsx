import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function Methodology() {
  const { t, lang } = useLanguage();
  const steps = [
    {
      num: "01",
      title: t('method_1_title'),
      subtitle: t('method_1_subtitle'),
      desc: t('method_1_desc'),
      tags: t('method_1_tags') as unknown as string[]
    },
    {
      num: "02",
      title: t('method_2_title'),
      subtitle: t('method_2_subtitle'),
      desc: t('method_2_desc'),
      tags: t('method_2_tags') as unknown as string[]
    },
    {
      num: "03",
      title: t('method_3_title'),
      subtitle: t('method_3_subtitle'),
      desc: t('method_3_desc'),
      tags: t('method_3_tags') as unknown as string[]
    },
    {
      num: "04",
      title: t('method_4_title'),
      subtitle: t('method_4_subtitle'),
      desc: t('method_4_desc'),
      tags: t('method_4_tags') as unknown as string[]
    },
    {
      num: "05",
      title: t('method_5_title'),
      subtitle: t('method_5_subtitle'),
      desc: t('method_5_desc'),
      tags: t('method_5_tags') as unknown as string[]
    },
    {
      num: "06",
      title: t('method_6_title'),
      subtitle: t('method_6_subtitle'),
      desc: t('method_6_desc'),
      tags: t('method_6_tags') as unknown as string[]
    },
    {
      num: "07",
      title: t('method_7_title'),
      subtitle: t('method_7_subtitle'),
      desc: t('method_7_desc'),
      tags: t('method_7_tags') as unknown as string[]
    },
    {
      num: "08",
      title: t('method_8_title'),
      subtitle: t('method_8_subtitle'),
      desc: t('method_8_desc'),
      tags: t('method_8_tags') as unknown as string[]
    }
  ];

  return (
    <section className="py-24 px-4 overflow-hidden relative">
      {/* Dotted Background Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#ffffff15_1px,_transparent_1px)] bg-[length:30px_30px] opacity-30 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[#00E5A0] font-bold tracking-wider text-base mb-4 inline-block uppercase">{t('methodology_section_title')}</span>
          <h2 
            className="text-5xl md:text-[5rem] text-white leading-tight uppercase"
            style={lang === 'ar' ? { fontFamily: "'ThmanyahSerifDisplay', sans-serif" } : {}}
          >
            {t('methodology_title')}
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className={`absolute top-0 bottom-0 w-[1px] bg-white/5 ${lang === 'ar' ? 'right-[80px] md:right-[150px]' : 'left-[80px] md:left-[150px]'}`}>
            <motion.div 
              className="absolute top-0 right-0 w-full bg-gradient-to-b from-[#00E5A0] via-[#00E5A0]/50 to-transparent"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col gap-20 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center w-full relative">
                
                {/* Right/Left side: Giant Number */}
                <motion.div
                  initial={{ opacity: 0, x: lang === 'ar' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-[80px] md:w-[150px] shrink-0 flex justify-center items-center pointer-events-none"
                >
                  <span 
                    className="text-6xl md:text-[5.5rem] text-[#00E5A0] leading-none"
                    style={{ fontFamily: "'ThmanyahSerifDisplay', sans-serif" }}
                  >
                    {step.num}
                  </span>
                </motion.div>

                {/* The Dot on the line */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className={`absolute translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#00E5A0] shadow-[0_0_15px_3px_#00E5A0] ${lang === 'ar' ? 'right-[80px] md:right-[150px]' : 'left-[75px] md:left-[145px]'}`}
                />

                {/* Left/Right side: Content Box */}
                <motion.div 
                  initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`flex-1 ${lang === 'ar' ? 'pr-12 md:pr-24 text-right' : 'pl-12 md:pl-24 text-left'}`}
                >
                  <h3 
                    className="text-4xl md:text-5xl text-white mb-2"
                    style={lang === 'ar' ? { fontFamily: "'ThmanyahSerifDisplay', sans-serif" } : {}}
                  >
                    {step.title}
                  </h3>
                  <span className="text-[#00E5A0] text-sm md:text-base font-bold mb-6 inline-block">{step.subtitle}</span>
                  
                  <p className={`text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-xl ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {step.desc}
                  </p>
                  
                  <div className={`flex flex-wrap gap-3 ${lang === 'ar' ? 'justify-start' : 'justify-start'}`}>
                    {step.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-5 py-2 bg-[#00E5A0]/5 border border-[#00E5A0]/30 rounded-full text-xs font-bold text-[#00E5A0] hover:bg-[#00E5A0]/15 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Horizontal separator (subtle) */}
                {idx !== steps.length - 1 && (
                  <div className={`absolute -bottom-16 left-0 h-[1px] bg-white/5 ${lang === 'ar' ? 'right-[80px] md:right-[150px]' : 'left-[80px] md:left-[150px]'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
