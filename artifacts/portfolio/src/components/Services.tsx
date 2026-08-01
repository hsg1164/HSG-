import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function Services() {
  const { t, lang } = useLanguage();
  const services = [
    {
      num: "01",
      title: t('service_1_title'),
      desc: t('service_1_desc'),
      tags: ["React", "Next.js", "TypeScript", "JavaScript"],
      bg: "bg-[#00E5A0]",
      text: "text-black",
      badgeText: "text-black bg-black/10 border-black/20",
      tagStyle: "bg-black/10 text-black",
      img: "/assets/images/service_new_1.png"
    },
    {
      num: "02",
      title: t('service_2_title'),
      desc: t('service_2_desc'),
      tags: ["Node.js", "Go", "REST API", "Authentication"],
      bg: "bg-[#f5f5f5]",
      text: "text-black",
      badgeText: "text-black bg-black/5 border-black/10",
      tagStyle: "bg-black/5 text-black border border-black/10",
      img: "/assets/images/service_new_2.png"
    },
    {
      num: "03",
      title: t('service_3_title'),
      desc: t('service_3_desc'),
      tags: ["MongoDB", "SQL", "Database Design", "Performance Optimization"],
      bg: "bg-[#00E5A0]",
      text: "text-black",
      badgeText: "text-black bg-black/10 border-black/20",
      tagStyle: "bg-black/10 text-black",
      img: "/assets/images/service_new_3.png"
    },
    {
      num: "04",
      title: t('service_4_title'),
      desc: t('service_4_desc'),
      tags: ["UI Design", "UX Design", "Responsive Design", "Figma"],
      bg: "bg-[#f5f5f5]",
      text: "text-black",
      badgeText: "text-black bg-black/5 border-black/10",
      tagStyle: "bg-black/5 text-black border border-black/10",
      img: "/assets/images/service_new_4.png"
    },
    {
      num: "05",
      title: t('service_5_title'),
      desc: t('service_5_desc'),
      tags: ["Core Web Vitals", "SEO", "Performance", "Accessibility"],
      bg: "bg-[#00E5A0]",
      text: "text-black",
      badgeText: "text-black bg-black/10 border-black/20",
      tagStyle: "bg-black/10 text-black",
      img: "/assets/images/service_new_5.png"
    },
    {
      num: "06",
      title: t('service_6_title'),
      desc: t('service_6_desc'),
      tags: ["Bug Fixes", "Maintenance", "Security", "Git"],
      bg: "bg-[#f5f5f5]",
      text: "text-black",
      badgeText: "text-black bg-black/5 border-black/10",
      tagStyle: "bg-black/5 text-black border border-black/10",
      img: "/assets/images/service_new_6.png"
    }
  ];

  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 inline-block">{t('services_section_title')}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase">{t('services_title')}</h2>
        </motion.div>

        <div className="relative pb-24">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`w-full rounded-[2.5rem] overflow-hidden ${service.bg} ${service.text} flex flex-col md:flex-row relative group sticky shadow-2xl shadow-black/50 mb-8 border border-white/10`}
              style={{ top: '12vh', zIndex: idx }}
            >
              {/* Giant number */}
              <div 
                className={`absolute -top-4 ${lang === 'ar' ? 'left-6' : 'right-6'} text-[10rem] md:text-[14rem] font-bold pointer-events-none leading-none select-none z-0 ${service.bg === 'bg-[#00E5A0]' ? 'text-black/10' : 'text-[#00E5A0]/20'}`}
                style={{ fontFamily: "'ThmanyahSerifDisplay', sans-serif" }}
              >
                {service.num}
              </div>

              {/* Illustration half */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center relative z-10 min-h-[300px]">
                <img src={service.img} alt={service.title} className="w-full max-w-sm mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1" />
              </div>

              {/* Content half */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10 border-t md:border-t-0 md:border-r border-black/5 bg-gradient-to-l from-transparent to-black/5">
                <div className={`w-fit px-4 py-1.5 rounded-full border mb-8 font-bold flex items-center gap-2 ${service.badgeText} shadow-sm backdrop-blur-sm`}>
                  <span className="text-sm font-sans tracking-widest">{service.num}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></span>
                  <span className="text-xs">{t('service_badge')}</span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-bold mb-6">{service.title}</h3>
                
                <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-10 max-w-md">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={`px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:scale-105 transition-transform cursor-default ${service.tagStyle}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
