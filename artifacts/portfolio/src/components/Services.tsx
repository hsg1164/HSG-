import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      num: "01",
      title: "التسويق بالأداء",
      desc: "حملات مبنية على البيانات عبر جوجل وميتا وتيك توك لتحقيق أعلى عائد على الاستثمار واستقطاب عملاء محتملين بجودة عالية.",
      tags: ["إعلانات جوجل", "إعلانات ميتا", "إعلانات تيك توك", "إعلانات سناب شات"],
      bg: "bg-[#00E5A0]",
      text: "text-black",
      badgeText: "text-black bg-black/10 border-black/20",
      tagStyle: "bg-black/10 text-black",
      img: "/src/assets/images/service-1.png"
    },
    {
      num: "02",
      title: "تحسين محركات البحث",
      desc: "تدقيق تقني، استراتيجية كلمات مفتاحية، تحسين داخلي وخارجي لضمان تصدر نتائج البحث العضوية بشكل مستدام.",
      tags: ["تدقيق تقني", "تحسين داخلي", "تحسين خارجي", "تحسين محلي"],
      bg: "bg-[#f5f5f5]",
      text: "text-black",
      badgeText: "text-black bg-black/5 border-black/10",
      tagStyle: "bg-black/5 text-black border border-black/10",
      img: "/src/assets/images/service-2.png"
    },
    {
      num: "03",
      title: "تطوير الويب",
      desc: "مواقع سريعة وحديثة بأفضل التقنيات تضمن تجربة مستخدم استثنائية وتحويل الزوار إلى عملاء.",
      tags: ["React", "Next.js", "Node.js", "API"],
      bg: "bg-[#00E5A0]",
      text: "text-black",
      badgeText: "text-black bg-black/10 border-black/20",
      tagStyle: "bg-black/10 text-black",
      img: "/src/assets/images/service-3.png"
    },
    {
      num: "04",
      title: "الذكاء الاصطناعي والأتمتة",
      desc: "روبوتات محادثة ذكية، أتمنة سير العمل للتقليل من المهام الروتينية وزيادة الإنتاجية التشغيلية.",
      tags: ["روبوتات ذكية", "أتمنة الأنظمة", "تكامل الأنظمة", "ذكاء اصطناعي"],
      bg: "bg-[#f5f5f5]",
      text: "text-black",
      badgeText: "text-black bg-black/5 border-black/10",
      tagStyle: "bg-black/5 text-black border border-black/10",
      img: "/src/assets/images/service-4.png"
    },
    {
      num: "05",
      title: "البيانات والتحليلات",
      desc: "إعداد تحليلات جوجل وإدارة العلامات وتتبع التحويلات لامتلاك رؤية واضحة عن أداء قنواتك الرقمية.",
      tags: ["تحليلات جوجل", "إدارة العلامات", "لوحات التقارير", "أدوات مشابهة المواقع"],
      bg: "bg-[#00E5A0]",
      text: "text-black",
      badgeText: "text-black bg-black/10 border-black/20",
      tagStyle: "bg-black/10 text-black",
      img: "/src/assets/images/service-5.png"
    },
    {
      num: "06",
      title: "استراتيجية رقمية شاملة",
      desc: "من الفكرة إلى المنتج، ربط التسويق والمنتج والتقنية لبناء خطة نمو مستدامة ومترابطة.",
      tags: ["الاستراتيجية", "الهوية", "تجربة المستخدم", "النمو"],
      bg: "bg-[#f5f5f5]",
      text: "text-black",
      badgeText: "text-black bg-black/5 border-black/10",
      tagStyle: "bg-black/5 text-black border border-black/10",
      img: "/src/assets/images/service-6.png"
    }
  ];

  return (
    <section id="services" className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 inline-block">الخدمات</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">خبرات تصنع الفارق</h2>
        </motion.div>

        <div className="flex flex-col space-y-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`w-full rounded-[2rem] overflow-hidden ${service.bg} ${service.text} flex flex-col md:flex-row relative group hover:scale-[1.01] transition-transform duration-500`}
            >
              {/* Giant number */}
              <div className="absolute top-4 left-6 text-[8rem] font-black opacity-5 pointer-events-none leading-none select-none z-0">
                {service.num}
              </div>

              {/* Illustration half */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center relative z-10">
                <img src={service.img} alt={service.title} className="w-full max-w-sm mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-105" />
              </div>

              {/* Content half */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10 border-t md:border-t-0 md:border-r border-black/5">
                <div className={`w-fit px-4 py-1.5 rounded-full border mb-6 font-bold flex items-center gap-2 ${service.badgeText}`}>
                  <span className="text-sm">{service.num}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-black/40"></span>
                  <span className="text-xs">الخدمة</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6">{service.title}</h3>
                
                <p className="text-lg opacity-80 leading-relaxed mb-10 max-w-md">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={`px-4 py-2 rounded-full text-sm font-semibold ${service.tagStyle}`}>
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
