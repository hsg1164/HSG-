import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Wallet, Globe, Ticket, Hourglass } from "lucide-react";

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
  const stats = [
    {
      num: { from: 0, to: 15, duration: 2, prefix: "+$", suffix: "K" },
      title: "ميزانية إعلانية",
      subtitle: "إنفاق شهري مدار",
      icon: <Wallet className="w-6 h-6" />
    },
    {
      num: { from: 0, to: 4, duration: 2, prefix: "", suffix: "" },
      title: "أسواق نشطة",
      subtitle: "مصر، قطر، السعودية، الإمارات",
      icon: <Globe className="w-6 h-6" />
    },
    {
      num: { from: 0, to: 3000, duration: 2.5, prefix: "+", suffix: "" },
      title: "حضور فعاليات",
      subtitle: "في مؤتمرات حية",
      icon: <Ticket className="w-6 h-6" />
    },
    {
      num: { from: 0, to: 5, duration: 1.5, prefix: "+", suffix: "" },
      title: "سنوات خبرة",
      subtitle: "عبر 4 أسواق إقليمية",
      icon: <Hourglass className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
        >
          أثر يُثبَت بالأرقام
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-card-border p-8 rounded-2xl flex flex-col items-center text-center hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative">
                <span className="opacity-0 group-hover:opacity-100 absolute w-full h-full rounded-full bg-primary/20 animate-ping"></span>
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-4">
                <Counter {...stat.num} />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">{stat.title}</h4>
              <p className="text-sm text-white/50">{stat.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
