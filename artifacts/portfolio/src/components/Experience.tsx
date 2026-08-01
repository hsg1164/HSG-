import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiMongodb, SiFirebase, SiTailwindcss, SiSocketdotio, SiExpress, SiJsonwebtokens, SiVercel, SiFigma } from "react-icons/si";
import { useLanguage } from "../contexts/LanguageContext";

export default function Experience() {
  const { t, lang } = useLanguage();
  const experiences = [
    {
      company: t('exp_1_company'),
      role: t('exp_1_title'),
      subtitle: t('exp_1_company'),
      location: t('exp_remote'),
      period: t('exp_1_date'),
      type: t('exp_fulltime'),
      badge: t('exp_current'),
      desc: t('exp_1_desc'),
      bullets: [
        t('exp_1_ach1'),
        t('exp_1_ach2'),
        t('exp_1_ach3'),
        t('exp_1_ach4'),
      ],
      tools: [
        { label: "React", icon: <FaReact className="text-[#61DAFB] text-lg" /> },
        { label: "TypeScript", icon: <SiTypescript className="text-[#3178C6] text-lg" /> },
        { label: "Node.js", icon: <FaNodeJs className="text-[#339933] text-lg" /> },
        { label: "Express", icon: <SiExpress className="text-gray-700 text-lg" /> },
        { label: "MongoDB", icon: <SiMongodb className="text-[#47A248] text-lg" /> },
        { label: "Socket.IO", icon: <SiSocketdotio className="text-black text-lg" /> },
        { label: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4] text-lg" /> },
        { label: "JWT", icon: <SiJsonwebtokens className="text-pink-500 text-lg" /> },
        { label: "Git", icon: <FaGitAlt className="text-[#F05032] text-lg" /> },
        { label: "Vercel", icon: <SiVercel className="text-black text-lg" /> }
      ],
      bg: "bg-white",
      textColor: "text-black",
      pillBg: "bg-black/5 text-black/70",
      typePillBg: "bg-black/10 text-black/70",
      badgeBg: "bg-[#00E5A0] text-black",
      buttonBg: "bg-[#00E5A0] text-black",
      isRight: true
    },
    {
      company: t('exp_2_company'),
      role: t('exp_2_title'),
      subtitle: t('exp_2_company'),
      location: t('exp_remote'),
      period: t('exp_2_date'),
      type: t('exp_freelance'),
      desc: t('exp_2_desc'),
      bullets: [
        t('exp_2_ach1'),
        t('exp_2_ach2'),
        t('exp_2_ach3'),
        t('exp_2_ach4'),
      ],
      tools: [
        { label: "React", icon: <FaReact className="text-[#61DAFB] text-lg" /> },
        { label: "Next.js", icon: <SiNextdotjs className="text-black text-lg" /> },
        { label: "TypeScript", icon: <SiTypescript className="text-[#3178C6] text-lg" /> },
        { label: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4] text-lg" /> },
        { label: "Node.js", icon: <FaNodeJs className="text-[#339933] text-lg" /> },
        { label: "MongoDB", icon: <SiMongodb className="text-[#47A248] text-lg" /> },
        { label: "Firebase", icon: <SiFirebase className="text-[#FFCA28] text-lg" /> },
        { label: "Git", icon: <FaGitAlt className="text-[#F05032] text-lg" /> }
      ],
      bg: "bg-[#4FF0A7]",
      textColor: "text-black",
      pillBg: "bg-white/80 text-black",
      typePillBg: "bg-black/10 text-black/70",
      buttonBg: "bg-white text-black",
      isRight: false
    },
    {
      company: t('exp_3_company'),
      role: t('exp_3_title'),
      subtitle: t('exp_3_company'),
      location: t('exp_3_company'),
      period: t('exp_3_date'),
      type: t('exp_contract'),
      desc: t('exp_3_desc'),
      bullets: [
        t('exp_3_ach1'),
        t('exp_3_ach2'),
        t('exp_3_ach3'),
        t('exp_3_ach4'),
      ],
      tools: [
        { label: "React", icon: <FaReact className="text-[#61DAFB] text-lg" /> },
        { label: "TypeScript", icon: <SiTypescript className="text-[#3178C6] text-lg" /> },
        { label: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4] text-lg" /> },
        { label: "SEO", icon: <span className="font-bold text-gray-800">SEO</span> },
        { label: "Figma", icon: <SiFigma className="text-purple-500 text-lg" /> }
      ],
      bg: "bg-white",
      textColor: "text-black",
      pillBg: "bg-black/5 text-black/70",
      typePillBg: "bg-black/10 text-black/70",
      buttonBg: "bg-[#00E5A0] text-black",
      isRight: true
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[#00E5A0] font-bold tracking-wider text-sm mb-3 inline-block uppercase">{t('exp_section_title')}</span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-white leading-tight uppercase"
          >
            {t('exp_title')}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute right-[20px] md:right-[50%] top-0 bottom-0 w-[2px] bg-[#00E5A0] md:translate-x-1/2 z-0"></div>

          <div className="flex flex-col gap-10 relative z-10">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col md:flex-row w-full relative ${!exp.isRight ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Circle */}
                <div className="absolute right-[14px] md:right-[50%] md:translate-x-1/2 top-8 w-3 h-3 rounded-full border-[2px] border-[#00E5A0] bg-[#0d0d0d] z-20"></div>

                {/* Card Container */}
                <div className={`w-full md:w-1/2 pl-0 md:pl-0 pt-0 ${exp.isRight ? (lang === 'ar' ? 'pr-12 md:pr-0 md:pl-10' : 'pl-12 md:pl-0 md:pr-10') : (lang === 'ar' ? 'pr-12 md:pr-10 md:pl-0' : 'pl-12 md:pl-10 md:pr-0')}`}>
                  
                  <div className={`${exp.bg} ${exp.textColor} p-6 md:p-8 rounded-3xl shadow-2xl`}>
                    
                    {/* Header Row */}
                    <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold ${exp.typePillBg}`}>
                          {exp.type}
                        </span>
                        {exp.badge && (
                          <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold ${exp.badgeBg} animate-pulse`}>
                            {exp.badge}
                          </span>
                        )}
                      </div>
                      <p className="font-bold text-xs opacity-70 tracking-wide">{exp.company}</p>
                    </div>

                    {/* Title */}
                    <h3 
                      className={`text-2xl md:text-3xl font-bold mb-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                      style={lang === 'ar' ? { fontFamily: "'ThmanyahSerifDisplay', sans-serif" } : {}}
                    >
                      {exp.role}
                    </h3>

                    {/* Subtitle */}
                    {exp.subtitle && (
                      <p className={`text-[11px] md:text-xs font-medium opacity-60 mb-5 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{exp.subtitle}</p>
                    )}

                    {/* Info Pills */}
                    <div className="flex flex-wrap items-center justify-start gap-2 mb-6">
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold ${exp.pillBg}`}>
                        <Calendar className="w-3 h-3" /> {exp.period}
                      </span>
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold ${exp.pillBg}`}>
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`text-[11px] md:text-xs leading-relaxed mb-5 font-medium opacity-90 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                      {exp.desc}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2.5 mb-8">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className={`flex items-start gap-2 text-[10px] md:text-xs font-medium opacity-85 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                          <span className="mt-0.5 flex-shrink-0 text-[#00E5A0] text-sm leading-none">✦</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer: Tools & Button */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-black/10">
                      <div className="flex flex-wrap gap-3">
                        {exp.tools.map((tool, tIdx) => (
                          <div key={tIdx} className="flex flex-col items-center gap-1 cursor-default group">
                            <div className="w-6 h-6 md:w-7 md:h-7 bg-white/50 rounded-md flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                              {tool.icon}
                            </div>
                            <span className="text-[7px] md:text-[8px] font-bold opacity-60 uppercase">{tool.label}</span>
                          </div>
                        ))}
                      </div>
                      
                      <a href="#contact" className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold shadow-md hover:scale-105 transition-transform ${exp.buttonBg}`}>
                        {t('exp_talk')} <ArrowLeft className="w-3 h-3" style={{ transform: lang === 'en' ? 'rotate(180deg)' : 'none' }} />
                      </a>
                    </div>

                  </div>
                </div>

                {/* Empty Half for Desktop Layout */}
                <div className="hidden md:block md:w-1/2"></div>
                
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
