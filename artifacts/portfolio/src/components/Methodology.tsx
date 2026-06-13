import { motion } from "framer-motion";

export default function Methodology() {
  const steps = [
    {
      num: "01",
      title: "البحث أولاً",
      subtitle: "بيانات مش افتراضات",
      desc: "كل مشروع يبدأ بتحليل دقيق للبيانات، فهم عميق للجمهور المستهدف، ودراسة شاملة للمنافسين لضمان قرارات مبنية على أسس قوية.",
      tags: ["أبحاث السوق", "تحليل المنافسين", "تدقيق البيانات"]
    },
    {
      num: "02",
      title: "تفكير منظومي",
      subtitle: "استراتيجية تلتقي بالتقنية",
      desc: "تصميم منظومة متكاملة تربط بين التسويق، المنتج، والتقنية لتحقيق أهداف النمو دون تعارض بين الأقسام.",
      tags: ["استراتيجية النمو", "رحلة العميل", "التخطيط التقني"]
    },
    {
      num: "03",
      title: "أنفّذ وأطوّر",
      subtitle: "سرعة مع دقة",
      desc: "إطلاق سريع للمبادرات مع التركيز على الجودة، تليها دورات تحسين مستمرة لرفع الكفاءة وزيادة العوائد.",
      tags: ["تطوير رشيق", "إطلاق سريع", "تحسين التحويل"]
    },
    {
      num: "04",
      title: "أقيّس كل شيء",
      subtitle: "بيانات للقرارات",
      desc: "بناء لوحات تحكم شفافة وتتبع دقيق لكل خطوة لضمان أن كل ميزانية تُنفق تعود بقيمة قابلة للقياس.",
      tags: ["تحليلات متقدمة", "تقارير أداء", "قياس العائد"]
    }
  ];

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 inline-block">المنهجية</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">كيف أشتغل</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute right-[50%] md:right-[20%] top-0 bottom-0 w-px bg-white/10">
            <motion.div 
              className="absolute top-0 right-0 w-full bg-primary"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col gap-16 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 w-full max-w-3xl mx-auto md:mr-auto md:ml-0"
              >
                {/* Node */}
                <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center text-primary font-bold text-xl relative shrink-0 shadow-[0_0_20px_rgba(0,229,160,0.2)]">
                  {step.num}
                  <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20"></div>
                </div>

                {/* Content */}
                <div className="bg-card border border-card-border p-8 rounded-2xl w-full hover:border-primary/30 transition-colors group">
                  <div className="flex flex-col mb-4">
                    <span className="text-primary text-sm font-bold mb-2">{step.subtitle}</span>
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed mb-6">
                    {step.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-medium text-white/80 group-hover:border-primary/20 transition-colors">
                        {tag}
                      </span>
                    ))}
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
