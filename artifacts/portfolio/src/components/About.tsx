import { motion } from "framer-motion";
import { FaReact, FaPython, FaNodeJs, FaDatabase, FaStar } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiJavascript, SiMongodb } from "react-icons/si";
import { MapPin, ArrowLeft } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function About() {
  const { lang, t } = useLanguage();
  const floatingBadges = [
    { text: "React", icon: <FaReact />, bg: "bg-blue-500 text-white", y: [0, -10, 0], delay: 0, position: "top-[10%] -left-32 rotate-[-5deg]" },
    { text: "TypeScript", icon: <SiTypescript />, bg: "bg-blue-600 text-white", y: [0, -8, 0], delay: 0.5, position: "top-[40%] -left-40 rotate-[5deg]" },
    { text: "JavaScript", icon: <SiJavascript />, bg: "bg-yellow-400 text-black", y: [0, -12, 0], delay: 1, position: "top-[65%] -left-28 rotate-[-3deg]" },
    { text: "SQL", icon: <FaDatabase />, bg: "bg-gray-800 text-white", y: [0, -9, 0], delay: 1.5, position: "bottom-[5%] -left-32 rotate-[12deg]" },
    
    { text: "MongoDB", icon: <SiMongodb />, bg: "bg-green-600 text-white", y: [0, -10, 0], delay: 0.2, position: "top-[15%] -right-32 rotate-[8deg]" },
    { text: "Python", icon: <FaPython />, bg: "bg-blue-500 text-white", y: [0, -7, 0], delay: 0.7, position: "top-[45%] -right-36 rotate-[-5deg]" },
    { text: "Node.js", icon: <FaNodeJs />, bg: "bg-green-500 text-white", y: [0, -11, 0], delay: 1.2, position: "top-[70%] -right-28 rotate-[5deg]" },
    { text: "Next.js", icon: <SiNextdotjs />, bg: "bg-black border border-white/20 text-white", y: [0, -8, 0], delay: 1.7, position: "bottom-[10%] -right-20 rotate-[-6deg]" },
  ];

  // pileBadges was removed as part of the 'أصنع الفارق' section removal

  return (
    <section id="about" className="pt-24 px-4 relative overflow-hidden flex flex-col items-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center w-full relative">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-primary font-bold text-lg mb-2 inline-block">{t('about_section_title')}</span>
          <h2 className="text-4xl md:text-[2.5rem] font-bold text-white uppercase">{t('about_title')}</h2>
        </motion.div>

        <div className="relative w-full max-w-sm mx-auto h-[600px] flex justify-center mt-10">
          {/* Floating Badges */}
          {floatingBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              animate={{ y: badge.y }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: badge.delay }}
              className={`absolute hidden md:flex items-center gap-2 px-6 py-3 rounded-full ${badge.bg} ${badge.position} z-20 shadow-lg font-bold text-sm whitespace-nowrap`}
            >
              {badge.icon}
              <span>{badge.text}</span>
            </motion.div>
          ))}

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full h-full bg-black rounded-[2rem] p-6 flex flex-col relative z-10 shadow-2xl border border-white/5"
          >
            <div className="flex justify-between items-center w-full absolute top-6 left-0 px-6 z-20">
              <div className="flex gap-1 text-[#00E5A0] text-xs">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <div className="flex items-center gap-2 text-[#00E5A0] text-xs font-bold">
                {t('about_available')}
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]"></span>
              </div>
            </div>

            <div className="flex-1 w-full rounded-xl overflow-hidden relative mb-4 mt-6">
              <img src="/assets/images/headshot.png" alt="أحمد علي" className="w-full h-full object-cover object-top filter contrast-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-0 w-full text-center z-20">
                <h3 className="text-3xl font-bold text-white mb-1">{t('hero_title').replace('.', '')}</h3>
                <p className="text-[#00E5A0] font-bold text-sm" dir="ltr">Full Stack Developer</p>
                <p className="text-white/40 text-xs mt-2 flex items-center justify-center gap-1"><MapPin className="w-3 h-3" /> {t('about_location')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 border-t border-white/5 pt-6 pb-2 mb-4 font-digital" dir="ltr">
              <div className="text-center">
                <p className="text-xl font-bold text-white mb-1">40+</p>
                <p className="text-[10px] text-white/40 font-sans">Projects</p>
              </div>
              <div className="text-center border-l border-white/5">
                <p className="text-xl font-bold text-white mb-1">10+</p>
                <p className="text-[10px] text-white/40 font-sans">Technologies</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-white mb-1">100K+</p>
                <p className="text-[10px] text-white/40 font-sans">Lines of Code</p>
              </div>
              <div className="text-center border-l border-white/5">
                <p className="text-xl font-bold text-white mb-1">24/7</p>
                <p className="text-[10px] text-white/40 font-sans">Support</p>
              </div>
            </div>

            <a href="#contact" className="flex items-center justify-center gap-2 bg-[#00E5A0] text-black font-bold text-sm py-4 rounded-full hover:bg-primary/90 transition-colors w-full">
              {t('about_btn')} <ArrowLeft className="w-4 h-4" style={{ transform: lang === 'en' ? 'rotate(180deg)' : 'none' }} />
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center text-white/50 leading-relaxed max-w-3xl text-sm md:text-base opentype-features kashida-enabled"
        >
          {t('about_desc')}
        </motion.p>
      </div>

    </section>
  );
}
