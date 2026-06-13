export default function SkillsMarquee() {
  const row1 = [
    "تحليل البيانات", "تطبيقات الجوال", "إعلانات جوجل", "الذكاء الاصطناعي", 
    "تطوير الويب", "إعلانات ميتا", "البرمجة", "تحسين محركات البحث", 
    "تصميم الواجهات", "اختراق النمو", "إدارة المحتوى"
  ];
  
  const row2 = [
    "إعلانات سناب شات", "إدارة المحتوى", "تطوير الواجهات", "البرمجة", 
    "استراتيجية العلامة التجارية", "إعلانات ميتا", "اختراق النمو", 
    "تطوير الويب", "الذكاء الاصطناعي"
  ];

  return (
    <section className="py-10 border-y border-white/5 bg-black overflow-hidden flex flex-col gap-6">
      <div className="relative flex overflow-x-hidden whitespace-nowrap">
        <div className="animate-marquee flex gap-6 px-3">
          {[...row1, ...row1, ...row1].map((skill, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/90 text-lg whitespace-nowrap">
                {skill}
              </div>
              <span className="text-primary text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex overflow-x-hidden whitespace-nowrap">
        <div className="animate-marquee-reverse flex gap-6 px-3">
          {[...row2, ...row2, ...row2].map((skill, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/90 text-lg whitespace-nowrap">
                {skill}
              </div>
              <span className="text-primary text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}