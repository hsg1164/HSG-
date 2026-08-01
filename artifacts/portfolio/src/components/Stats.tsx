import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Briefcase, Rocket, Cpu, Headphones } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

function Counter({ from, to, duration, prefix = "", suffix = "" }: { from: number, to: number, duration: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start: number | null = null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function Stats() {
  const { t, lang } = useLanguage();
  
  const stats = [
    {
      num: { from: 0, to: 5, duration: 1.5, prefix: "+", suffix: "" },
      title: t('stats_1_title'),
      subtitle: t('stats_1_subtitle'),
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      num: { from: 0, to: 20, duration: 2, prefix: "+", suffix: "" },
      title: t('stats_2_title'),
      subtitle: t('stats_2_subtitle'),
      icon: <Rocket className="w-6 h-6" />
    },
    {
      num: { from: 0, to: 30, duration: 2, prefix: "+", suffix: "" },
      title: t('stats_3_title'),
      subtitle: t('stats_3_subtitle'),
      icon: <Cpu className="w-6 h-6" />
    },
    {
      num: { from: 0, to: 24, duration: 1.5, prefix: "", suffix: "/7" },
      title: t('stats_4_title'),
      subtitle: t('stats_4_subtitle'),
      icon: <Headphones className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Dotted Background Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#ffffff15_1px,_transparent_1px)] bg-[length:30px_30px] opacity-40 pointer-events-none"></div>
      
      <div className="max-w-[65rem] mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-16 leading-relaxed uppercase"
          style={lang === 'ar' ? { fontFamily: "'ThmanyahSerifDisplay', sans-serif" } : {}}
        >
          {t('stats_title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative group rounded-3xl overflow-hidden p-[1px]"
            >
              {/* Static faint border */}
              <div className="absolute inset-0 bg-[#00E5A0]/15 rounded-3xl"></div>
              
              {/* Animated rotating border (Double Beams, Reversed, Extremely Slow, Softer) */}
              <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0_25%,#00E5A0_50%,transparent_50%_75%,#00E5A0_100%)] animate-[spin_20s_linear_infinite_reverse] opacity-50 group-hover:opacity-100 transition-opacity duration-1000 blur-[3px]"></div>

              {/* Card Content */}
              <div className="relative bg-[#0a0a0a] rounded-3xl py-12 px-4 h-full flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full border border-[#00E5A0]/60 text-[#00E5A0] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700 relative">
                  {stat.icon}
                </div>
                
                <div 
                  className="text-4xl md:text-5xl font-bold text-[#e0ffe5] mb-6"
                  style={lang === 'ar' ? { fontFamily: "'ThmanyahSerifDisplay', sans-serif" } : {}}
                  dir="ltr"
                >
                  <Counter {...stat.num} />
                </div>
                
                <h4 className="text-lg font-bold text-white mb-2">{stat.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed max-w-[150px]">{stat.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
