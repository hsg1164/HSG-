import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      company: "Elite Marketing Services",
      role: "مسؤول تسويق رقمي",
      location: "الدوحة، قطر",
      period: "أغسطس 2025 - مارس 2026",
      type: "دوام كامل",
      desc: "إدارة وتخطيط الحملات الإعلانية على المنصات الرقمية وتحليل البيانات لتحسين أداء الحملات.",
      bullets: [
        "إدارة ميزانيات إعلانية ضخمة وتحقيق عائد استثمار يتجاوز المستهدفات.",
        "تنفيذ استراتيجيات SEO لتحسين ترتيب المواقع في محركات البحث.",
        "بناء لوحات تقارير دورية متقدمة باستخدام أدوات تحليل البيانات."
      ],
      tools: ["WordPress", "Search Console", "SEMrush", "GTM", "GA4", "TikTok Ads", "Meta Ads", "Google Ads"]
    },
    {
      company: "Omnes Media",
      role: "أخصائي أداء رقمي",
      location: "دبي، الإمارات",
      period: "يناير 2024 - يوليو 2025",
      type: "دوام كامل",
      desc: "تخطيط استراتيجيات النمو لشركات متنوعة وإدارة منظومات إعلانية متكاملة.",
      bullets: [
        "إطلاق حملات ناجحة لتطبيقات الموبايل حققت آلاف التحميلات.",
        "تحسين معدلات التحويل (CRO) للمتاجر الإلكترونية عبر أتمتة رحلة العميل.",
        "إدارة العلامات التجارية للعملاء في قطاعات التقنية والعقارات."
      ],
      tools: ["Shopify", "Snapchat Ads", "Looker Studio", "Mixpanel"]
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 inline-block">الخبرات</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">أين صنعت الأثر</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute right-0 md:right-[50%] top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>

          <div className="flex flex-col gap-12 relative z-10">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className={`flex flex-col md:flex-row items-center w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Empty half for desktop */}
                <div className="hidden md:block w-1/2"></div>
                
                {/* Node marker (desktop) */}
                <div className="hidden md:flex absolute right-[50%] translate-x-[50%] w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(0,229,160,1)]"></div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-card border border-card-border p-8 rounded-2xl hover:border-primary/30 transition-colors">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                        <p className="text-primary font-medium text-lg">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/80 whitespace-nowrap">
                        {exp.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4 opacity-80" /> {exp.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4 opacity-80" /> {exp.period}</span>
                    </div>

                    <p className="text-white/80 leading-relaxed mb-6">
                      {exp.desc}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-sm text-white/70">
                          <span className="text-primary mt-1">✦</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                      {exp.tools.map((tool, tIdx) => (
                        <span key={tIdx} className="px-3 py-1.5 bg-black rounded text-xs font-semibold text-white/60">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
