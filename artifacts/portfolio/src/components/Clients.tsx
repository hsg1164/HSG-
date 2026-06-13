import { motion } from "framer-motion";

export default function Clients() {
  const clients = [
    "Binghatti", "Chelsea FC", "Elite Marketing Services", "Omnes Media", 
    "Ooredoo", "QNB", "Advert OnClick", "Influencers", "Kidana", 
    "Finance & Business", "Mobile Developers Week"
  ];

  return (
    <section className="py-24 px-4 bg-black border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 inline-block">موثوق من قِبَل</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">أبرز العملاء</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {clients.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="text-xl md:text-2xl font-black tracking-wider opacity-30 grayscale hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default select-none uppercase font-sans"
            >
              {client}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
