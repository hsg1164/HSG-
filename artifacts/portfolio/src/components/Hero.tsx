import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, Download } from "lucide-react";

import { FaStar } from "react-icons/fa";

const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2,
    size: 2 + Math.random() * 4,
    isDiamond: Math.random() > 0.5
  }));
};

export default function Hero() {
  const [particles, setParticles] = useState<{id: number, top: string, left: string, duration: number, delay: number, size: number, isDiamond: boolean}[]>([]);

  useEffect(() => {
    setParticles(generateParticles(40));
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute text-primary opacity-0 animate-twinkle"
            style={{
              top: p.top,
              left: p.left,
              fontSize: `${p.size}px`,
              '--twinkle-duration': `${p.duration}s`,
              '--twinkle-delay': `${p.delay}s`
            } as any}
          >
            {p.isDiamond ? '◆' : '✦'}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5"
        >
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#00E5A0]"></span>
          <span className="text-xs font-medium text-white/90">متاح للعمل</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-[4rem] font-bold leading-tight md:leading-[1.1] text-white mb-6"
        >
          حين تُدار التفاصيل باحتراف، <br className="hidden md:block"/>
          يصبح <span className="text-primary">النمو</span> نتيجة طبيعية.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          أصمم وأدير منظومات نمو رقمية متكاملة، تجمع بين البحث، محركات الظهور الإعلاني، هندسة التحويل، والأتمتة الذكية، بهدف تحقيق نتائج قابلة للقياس ونمو مستدام يخدم أهدافك التجارية بدقة.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <a href="#projects" className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            استعرض أعمالي <ArrowLeft className="w-5 h-5" />
          </a>
          <a href="#" className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            تحميل السيرة الذاتية <Download className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/70 mb-6 flex items-center gap-1">
            <FaStar className="text-yellow-400 mr-1" /> موثوق من قِبل
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl font-bold font-serif">Chelsea FC</span>
            <span className="text-xl font-bold">السعودية</span>
            <span className="text-xl font-bold tracking-widest">CTC Eartech</span>
            <span className="text-xl font-bold uppercase">Binghatti</span>
            <span className="text-xl font-bold lowercase">amazon.com</span>
            <span className="text-xl font-bold">QNB</span>
            <span className="text-xl font-bold text-red-500">Ooredoo</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}