import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      company: "الخطوط السعودية",
      country: "Saudi Arabia",
      year: "2023",
      title: "تحليل شامل للمنافسين وتقييم SWOT",
      desc: "تنفيذ أبحاث سوقية متعمقة وتحليل البيانات لبناء استراتيجية تفوق تنافسية، مع تحديد نقاط القوة والضعف والفرص والتهديدات في السوق الإقليمي.",
      tags: ["تحليل المنافسين", "أبحاث السوق", "استراتيجية البيانات"],
      img: "/src/assets/images/project-1.jpg"
    },
    {
      company: "QNB بنك قطر الوطني",
      country: "Qatar",
      year: "2023",
      title: "استراتيجية تسويق رقمي",
      desc: "تطوير وإدارة استراتيجيات إعلانية متكاملة لزيادة الوعي بالمنتجات المصرفية وزيادة معدلات التحويل للعملاء الجدد عبر القنوات الرقمية المختلفة.",
      tags: ["استراتيجية تسويق", "قطاع بنكي", "إعلانات أداء"],
      img: "/src/assets/images/project-2.jpg"
    },
    {
      company: "Ooredoo",
      country: "UAE",
      year: "2024",
      title: "حملات إعلانية متكاملة",
      desc: "إدارة حملات إعلانية واسعة النطاق لتعزيز التواجد الرقمي وزيادة مبيعات الخدمات الرقمية عبر استخدام البيانات في تحسين الاستهداف.",
      tags: ["حملات إعلانية", "اتصالات", "إدارة ميزانيات"],
      img: "/src/assets/images/project-3.jpg"
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 bg-background border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 inline-block">التأثير</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">المشاريع المميزة</h2>
        </motion.div>

        <div className="flex flex-col gap-12">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group flex flex-col lg:flex-row w-full bg-card rounded-[2rem] overflow-hidden border border-card-border hover:border-primary/30 transition-all"
            >
              {/* Image Half - 55% */}
              <div className="w-full lg:w-[55%] relative overflow-hidden h-[300px] lg:h-auto">
                <img 
                  src={proj.img} 
                  alt={proj.title} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700"></div>
              </div>

              {/* Content Half - 45% (Green) */}
              <div className="w-full lg:w-[45%] bg-primary p-8 md:p-12 flex flex-col justify-center text-black relative">
                <div className="flex justify-between items-start mb-10">
                  <div className="text-2xl font-black">{proj.company}</div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 bg-black/10 rounded-full text-xs font-bold uppercase tracking-wider">{proj.country}</span>
                    <span className="px-3 py-1 bg-black text-primary rounded-full text-xs font-bold">{proj.year}</span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-4">{proj.title}</h3>
                <p className="text-black/70 font-medium mb-8 leading-relaxed">
                  {proj.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-4 py-2 bg-black text-primary text-sm font-bold rounded-full">
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
