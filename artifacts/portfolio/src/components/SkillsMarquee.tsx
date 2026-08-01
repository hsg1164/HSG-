import { useLanguage } from "../contexts/LanguageContext";

export default function SkillsMarquee() {
  const { t } = useLanguage();
  const row1 = t('tech_row1') as unknown as string[];
  const row2 = t('tech_row2') as unknown as string[];

  return (
    <section className="py-12 bg-transparent overflow-hidden flex flex-col gap-6 relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
      <style>{`
        @keyframes skills-marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes skills-marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-skills-left {
          animation: skills-marquee-left 40s linear infinite;
        }
        .animate-skills-right {
          animation: skills-marquee-right 40s linear infinite;
        }
      `}</style>
      
      <div className="relative flex overflow-hidden whitespace-nowrap" dir="ltr">
        <div className="animate-skills-left flex items-center w-max">
          {[...row1, ...row1].map((skill, i) => (
            <div key={i} className="flex items-center">
              <div className="px-6 py-2 rounded-full bg-primary text-black font-bold text-sm whitespace-nowrap hover:scale-105 transition-transform mx-4">
                {skill}
              </div>
              <span className="text-white/40 text-xl font-serif">✳</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex overflow-hidden whitespace-nowrap" dir="ltr">
        <div className="animate-skills-right flex items-center w-max">
          {[...row2, ...row2].map((skill, i) => (
            <div key={i} className="flex items-center">
              <div className="px-6 py-2 rounded-full bg-primary text-black font-bold text-sm whitespace-nowrap hover:scale-105 transition-transform mx-4">
                {skill}
              </div>
              <span className="text-white/40 text-xl font-serif">✳</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}