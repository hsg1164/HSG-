import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { ArrowLeft, Download } from "lucide-react";

import { FaStar } from "react-icons/fa";

const generateRadialSparks = (count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = 100 + Math.random() * 600; // radius between 100 and 700px
    const size = 1 + Math.random() * 3;
    return {
      id: i,
      angle: angle * (180 / Math.PI),
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      size,
      opacity: 0.2 + Math.random() * 0.5,
      isPrimary: Math.random() > 0.7
    };
  });
};

export default function Hero() {
  const { lang, t } = useLanguage();
  const [sparks, setSparks] = useState<{id: number, angle: number, x: number, y: number, delay: number, duration: number, size: number, opacity: number, isPrimary: boolean}[]>([]);
  
  // Mouse tracking for parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setSparks(generateRadialSparks(60));
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40; // max shift 20px
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Static green gradient glow at bottom-center (matches the screenshot) */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(0,229,160,0.08) 0%, rgba(0,229,160,0.03) 30%, transparent 70%)',
        }}
      />

      {/* Mouse-following glow orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        animate={{
          x: mousePosition.x * 8,
          y: mousePosition.y * 8,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 80 }}
        style={{
          background: 'radial-gradient(circle, rgba(0,229,160,0.06) 0%, rgba(0,229,160,0.02) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Interactive Radial Sparks Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        animate={{
          x: mousePosition.x * -2,
          y: mousePosition.y * -2,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
      >
        {sparks.map(s => (
          <motion.div
            key={s.id}
            className="absolute rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, s.opacity, 0] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut"
            }}
            style={{
              width: `${s.size * 3}px`,
              height: `${s.size / 1.5}px`,
              backgroundColor: s.isPrimary ? '#00E5A0' : '#ffffff',
              transform: `translate(${s.x}px, ${s.y}px) rotate(${s.angle}deg)`,
              boxShadow: s.isPrimary ? '0 0 12px rgba(0,229,160,0.6)' : '0 0 4px rgba(255,255,255,0.3)'
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full bg-white text-black"
        >
          <span className="text-xs font-bold">{t('hero_badge')}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[4.5rem] font-bold leading-[1.2] text-white mb-8 opentype-features"
        >
          {t('hero_title_1')}<span className="text-primary elongated-letters inline-block">{t('hero_title_highlight')}</span><span dangerouslySetInnerHTML={{ __html: t('hero_title_2') }} />
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10 opentype-features kashida-enabled"
        >
          {t('hero_desc_line1')}
          <br/> {t('hero_desc_line2')}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full"
        >
          <a href="#projects" className="w-full sm:w-auto px-10 py-3.5 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-3">
            {t('hero_btn_projects')} <ArrowLeft className="w-5 h-5" style={{ transform: lang === 'en' ? 'rotate(180deg)' : 'none' }} />
          </a>
          <a href="#" className="w-full sm:w-auto px-10 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-3">
            {t('hero_btn_cv')} <Download className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-60 hover:opacity-100 transition-all duration-500 max-w-4xl mx-auto">
            <span className="text-xl md:text-2xl font-bold tracking-widest">React</span>
            <span className="text-xl md:text-2xl font-bold tracking-widest">TypeScript</span>
            <span className="text-xl md:text-2xl font-bold tracking-widest">Node.js</span>
            <span className="text-xl md:text-2xl font-bold tracking-widest">Next.js</span>
            <span className="text-xl md:text-2xl font-bold tracking-widest">Python</span>
            <span className="text-xl md:text-2xl font-bold tracking-widest">SQL</span>
            <span className="text-xl md:text-2xl font-bold tracking-widest">MongoDB</span>
            <span className="text-xl md:text-2xl font-bold tracking-widest">PostgreSQL</span>
            <span className="text-xl md:text-2xl font-bold tracking-widest">Go (Golang)</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}