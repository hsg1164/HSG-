import { motion } from "framer-motion";

export default function Certificates() {
  const certs = [
    {
      title: "شهادة إعلانات التسويق المدعومة بالذكاء الاصطناعي",
      issuer: "Google Digital Academy (Skillshop)",
      status: "موثق",
      statusColor: "bg-black/10 text-black border-black/20",
      id: "156676968",
      date: "يوليو 2025",
      bg: "bg-[#00E5A0]",
      text: "text-black",
      link: "#"
    },
    {
      title: "شهادة تحليلات جوجل 4",
      issuer: "Google Digital Academy (Skillshop)",
      status: "موثق",
      statusColor: "bg-black/5 text-black border-black/10",
      id: "173041626",
      date: "يناير 2026",
      bg: "bg-[#f5f5f5]",
      text: "text-black",
      link: "#"
    },
    {
      title: "الشهادة المهنية في تحليل البيانات من جوجل",
      issuer: "Google / Coursera",
      status: "قيد التنفيذ",
      statusColor: "bg-orange-100 text-orange-800 border-orange-200",
      id: "-",
      date: "-",
      bg: "bg-[#f5f5f5]",
      text: "text-black",
      link: "#"
    },
    {
      title: "أساسيات التسويق الرقمي",
      issuer: "HP LIFE",
      status: "موثق",
      statusColor: "bg-black/10 text-black border-black/20",
      id: "HP-10293",
      date: "مارس 2024",
      bg: "bg-[#00E5A0]",
      text: "text-black",
      link: "#"
    }
  ];

  return (
    <section id="certificates" className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 inline-block">الاعتمادات</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">الشهادات المهنية</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-[2rem] border border-black/5 ${cert.bg} ${cert.text} flex flex-col hover:scale-[1.02] transition-transform`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${cert.statusColor}`}>
                  {cert.status}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{cert.title}</h3>
              <p className="font-medium opacity-70 mb-8">{cert.issuer}</p>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto pt-6 border-t border-black/10">
                <div className="flex items-center gap-4 text-sm font-medium opacity-80">
                  <span>ID: {cert.id}</span>
                  <span>صدر: {cert.date}</span>
                </div>
                {cert.link && (
                  <a href={cert.link} className="inline-flex items-center gap-1 font-bold text-black border-b border-black pb-0.5 hover:opacity-70 transition-opacity">
                    تحقق من الشهادة <span>↗</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
