import { motion } from "framer-motion";
import { FaInstagram, FaSnapchat, FaTiktok, FaWordpress, FaFacebook, FaMobile, FaCode, FaStar } from "react-icons/fa";
import { SiGoogleads } from "react-icons/si";
import { MapPin, ArrowLeft } from "lucide-react";

export default function About() {
  const floatingBadges = [
    { text: "إعلانات جوجل", icon: <SiGoogleads />, bg: "bg-[#00E5A0]", textClass: "text-black", y: [0, -10, 0], delay: 0, position: "top-[10%] -left-12 rotate-[-5deg]" },
    { text: "إعلانات ميتا", icon: <FaFacebook />, bg: "bg-blue-600", textClass: "text-white", y: [0, -8, 0], delay: 0.5, position: "top-[40%] -left-16 rotate-[-10deg]" },
    { text: "تيك توك", icon: <FaTiktok />, bg: "bg-black border border-white/20", textClass: "text-white", y: [0, -12, 0], delay: 1, position: "top-[70%] -left-8 rotate-[-3deg]" },
    { text: "تطبيقات الجوال", icon: <FaMobile />, bg: "bg-cyan-500", textClass: "text-black", y: [0, -9, 0], delay: 1.5, position: "bottom-0 left-4 rotate-[5deg]" },
    
    { text: "Instagram", icon: <FaInstagram />, bg: "bg-pink-600", textClass: "text-white", y: [0, -10, 0], delay: 0.2, position: "top-[15%] -right-12 rotate-[8deg]" },
    { text: "سناب شات", icon: <FaSnapchat />, bg: "bg-yellow-400", textClass: "text-black", y: [0, -7, 0], delay: 0.7, position: "top-[45%] -right-16 rotate-[12deg]" },
    { text: "إدارة المحتوى", icon: <FaWordpress />, bg: "bg-blue-500", textClass: "text-white", y: [0, -11, 0], delay: 1.2, position: "top-[75%] -right-10 rotate-[5deg]" },
    { text: "تطوير الواجهات", icon: <FaCode />, bg: "bg-teal-500", textClass: "text-white", y: [0, -8, 0], delay: 1.7, position: "bottom-0 right-6 rotate-[-6deg]" },
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 inline-block">نبذة عني</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">حلول رقمية شاملة</h2>
        </motion.div>

        <div className="relative w-full max-w-lg">
          {/* Floating Badges */}
          {floatingBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              animate={{ y: badge.y }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: badge.delay }}
              className={`absolute hidden md:flex items-center gap-2 px-4 py-2 rounded-full ${badge.bg} ${badge.textClass} ${badge.position} z-20 shadow-lg`}
            >
              {badge.icon}
              <span className="text-sm font-semibold">{badge.text}</span>
            </motion.div>
          ))}

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card border border-card-border rounded-2xl p-8 relative z-10 text-center shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-1 text-yellow-400 text-sm">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                متاح
              </div>
            </div>

            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-card-border to-muted border-4 border-card-border mb-6 overflow-hidden relative">
              {/* Generate Image hook used - placeholder here */}
              <img src="/src/assets/images/headshot.png" alt="Mohammed Ziyad" className="w-full h-full object-cover" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-2">محمد زياد</h3>
            <p className="text-primary font-medium text-lg mb-4">مطوّر ومحترف رقمي</p>
            <p className="text-white/50 text-sm mb-8 flex items-center justify-center gap-1"><MapPin className="w-4 h-4" /> متاح للعمل عن بُعد</p>

            <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6 mb-8">
              <div>
                <p className="text-2xl font-bold text-white mb-1">4</p>
                <p className="text-xs text-white/50 uppercase tracking-widest">دول</p>
              </div>
              <div className="border-x border-white/10">
                <p className="text-2xl font-bold text-white mb-1">+50</p>
                <p className="text-xs text-white/50 uppercase tracking-widest">مشروع</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">+5</p>
                <p className="text-xs text-white/50 uppercase tracking-widest">سنوات</p>
              </div>
            </div>

            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-primary text-black font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors w-full sm:w-auto">
              لنعمل معاً <ArrowLeft className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-white/60 leading-relaxed max-w-2xl text-lg"
        >
          لا أؤمن بالحلول الجاهزة. كل مشروع يمثل تحدياً فريداً يتطلب فهماً عميقاً للجمهور، تحليلاً دقيقاً للبيانات، وبناء استراتيجية مخصصة تجمع بين التسويق الفعّال والتقنية المتطورة لضمان أقصى عائد على الاستثمار.
        </motion.p>
      </div>

      {/* MAKE A DIFFERENCE SECTION included here for flow */}
      <div className="mt-32 relative w-full overflow-hidden min-h-[40vh] flex flex-col items-center justify-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.08 }}
          viewport={{ once: true }}
          className="text-[6rem] md:text-[10rem] font-black text-white whitespace-nowrap opacity-10 select-none z-0"
        >
          أصنع الفارق ✦
        </motion.h2>

        <motion.div 
          className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden z-10 flex flex-wrap items-end justify-center pb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } }
          }}
        >
          {Array.from({length: 20}).map((_, i) => {
            const colors = ['bg-[#00E5A0] text-black', 'bg-blue-500 text-white', 'bg-yellow-400 text-black', 'bg-pink-500 text-white', 'bg-white text-black', 'bg-cyan-400 text-black', 'bg-red-500 text-white'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() > 0.5 ? 'scale-100' : 'scale-75 opacity-70';
            
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { y: 200, opacity: 0, rotate: 0 },
                  visible: { 
                    y: Math.random() * -150 - 50, 
                    opacity: 1,
                    rotate: Math.random() * 60 - 30,
                    x: Math.random() * 400 - 200,
                    transition: { type: "spring", bounce: 0.4, duration: 1 + Math.random() }
                  }
                }}
                className={`absolute bottom-0 w-8 h-8 rounded-md ${color} ${size}`}
                style={{
                  left: `${50 + (Math.random() * 80 - 40)}%`,
                }}
              />
            )
          })}
        </motion.div>
      </div>

    </section>
  );
}
