import { motion } from "framer-motion";
import { FaPlay, FaMosque, FaBookOpen } from "react-icons/fa";
import { SiReact, SiTypescript, SiNextdotjs, SiNodedotjs, SiFirebase, SiTailwindcss, SiOpenai } from "react-icons/si";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  const projects = [
    {
      company: t('proj_1_company'),
      subtitle: t('proj_1_subtitle'),
      badgeLeft: t('proj_1_badgeLeft'),
      badgeRight: t('proj_1_badgeRight'),
      imageBadge: "Streaming & Community",
      imageBadgeBg: "bg-white",
      title: t('proj_1_title'),
      desc: t('proj_1_desc'),
      tags: ["Live Streaming", "Community Management", "High Performance"],
      bg: "bg-[#00E5A0]",
      textColor: "text-black",
      pillBg: "bg-[#3de298]",
      pillBorder: "border-black/5",
      dotColor: "bg-black",
      img: "/assets/images/streamer.png",
      logo: <FaPlay className="text-black" />,
      platforms: [
        { name: "iABS", link: "https://iabs-smm.vercel.app", logo: "/assets/images/iabs_logo.png" },
        { name: "TMNAA", link: "https://tmnaa.vercel.app/", logo: "/assets/images/tmnaa_logo.webp" },
        { name: "vilon", link: "https://vilon46.vercel.app/", logo: "/assets/images/vilon_logo.png" }
      ],
      alignRight: false,
      imageFirst: true,
      tools: [
        { label: "React", icon: <SiReact className="text-[#61DAFB] text-xl" /> },
        { label: "Next.js", icon: <SiNextdotjs className="text-black text-xl" /> },
        { label: "TypeScript", icon: <SiTypescript className="text-[#3178C6] text-xl" /> },
        { label: "Node.js", icon: <SiNodedotjs className="text-[#339933] text-xl" /> },
        { label: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4] text-xl" /> }
      ]
    },
    {
      company: t('proj_3_company'), // The original had Noor Al-Islam here, which matches proj_3 in translation
      subtitle: t('proj_3_subtitle'),
      badgeLeft: t('proj_3_badgeLeft'),
      badgeRight: t('proj_3_badgeRight'),
      imageBadge: "Quran & Athan",
      imageBadgeBg: "bg-[#00E5A0]",
      title: t('proj_3_title'),
      desc: t('proj_3_desc'),
      tags: ["Quran Platform", "Islamic Services", "Cross Platform"],
      bg: "bg-white",
      textColor: "text-black",
      pillBg: "bg-black/5",
      pillBorder: "border-black/5",
      dotColor: "bg-[#00E5A0]",
      img: "/assets/images/nooralislam.png",
      logo: <img src="/assets/images/nooralislam_logo.webp" alt="Noor Al-Islam Logo" className="w-full h-full object-contain rounded-full bg-white p-1" />,
      button: { text: t('projects_view_btn'), link: "https://noor-al-islam.vercel.app/" },
      alignRight: true,
      imageFirst: false,
      tools: [
        { label: "React", icon: <SiReact className="text-[#61DAFB] text-xl" /> },
        { label: "Firebase", icon: <SiFirebase className="text-[#FFCA28] text-xl" /> },
        { label: "PWA", icon: <span className="font-bold text-gray-700">PWA</span> },
        { label: "Android", icon: <span className="font-bold text-green-500">APK</span> }
      ]
    },
    {
      company: t('proj_2_company'), // Dalilek is proj_2
      subtitle: t('proj_2_subtitle'),
      badgeLeft: t('proj_2_badgeLeft'),
      badgeRight: t('proj_2_badgeRight'),
      imageBadge: "AI Content Platform",
      imageBadgeBg: "bg-white",
      title: t('proj_2_title'),
      desc: t('proj_2_desc'),
      tags: ["AI Content", "Multi-Language", "SEO Optimized"],
      bg: "bg-[#00E5A0]",
      textColor: "text-black",
      pillBg: "bg-[#3de298]",
      pillBorder: "border-black/5",
      dotColor: "bg-black",
      img: "/assets/images/dalilek.png",
      logo: <img src="/assets/images/dalilek_logo.png" alt="Dalilek Logo" className="w-full h-full object-contain rounded-full bg-white p-1" />,
      button: { text: t('projects_view_btn'), link: "https://www.dalilek.online/" },
      alignRight: false,
      imageFirst: true,
      tools: [
        { label: "Next.js", icon: <SiNextdotjs className="text-black text-xl" /> },
        { label: "TypeScript", icon: <SiTypescript className="text-[#3178C6] text-xl" /> },
        { label: "OpenAI", icon: <SiOpenai className="text-black text-xl" /> },
        { label: "SEO", icon: <span className="font-bold text-black">SEO</span> }
      ]
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 overflow-hidden">
      <div className="max-w-[85rem] lg:px-12 mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[#00E5A0] font-bold tracking-wider uppercase text-sm mb-4 inline-block">{t('projects_section_title')}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase">{t('projects_title')}</h2>
        </motion.div>

        <div className="flex flex-col gap-12 lg:gap-16">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`w-full rounded-[2rem] overflow-hidden flex flex-col ${proj.imageFirst ? 'lg:flex-row-reverse' : 'lg:flex-row'} shadow-2xl shadow-black/20`}
            >
              
              {/* Content Half */}
              <div className={`w-full lg:w-[45%] ${proj.bg} ${proj.textColor} p-6 lg:py-8 lg:px-10 flex flex-col justify-center relative min-h-[300px] ${proj.alignRight ? 'items-start' : 'items-center'}`}>
                
                {/* Header: Logo & Subtitle */}
                <div className={`flex flex-col mb-3 ${proj.alignRight ? 'self-start items-center' : 'items-center'}`}>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl mb-2 shadow-inner">
                    {proj.logo}
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold opacity-70 tracking-wide">{proj.subtitle}</span>
                </div>

                {/* Title & Description */}
                <div className={`mb-4 w-full max-w-lg ${proj.alignRight ? 'text-start' : 'text-center'}`}>
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-2 text-black"
                    style={{ fontFamily: "'ThmanyahSerifDisplay', sans-serif" }}
                  >
                    {proj.title}
                  </h3>
                  <p className={`text-[11px] md:text-[12px] opacity-80 leading-relaxed font-medium whitespace-pre-line ${proj.alignRight ? '' : 'text-center text-last-center'}`}>
                    {proj.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className={`flex flex-wrap gap-1.5 mb-4 w-full max-w-lg ${proj.alignRight ? 'justify-start' : 'justify-center'}`}>
                  {proj.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className={`px-2.5 py-1 rounded-full text-[9px] font-bold flex items-center gap-1.5 ${proj.pillBg} ${proj.pillBorder} border`}
                    >
                      <span className={`w-1 h-1 rounded-full ${proj.dotColor}`}></span>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Tools / Icons */}
                <div className={`flex flex-wrap gap-2.5 md:gap-3 lg:mb-0 ${proj.alignRight ? 'justify-start' : 'justify-center'}`}>
                  {proj.tools.map((tool, tlIdx) => (
                    <div key={tlIdx} className="flex flex-col items-center gap-1 group/tool cursor-default">
                      <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-lg shadow-sm flex items-center justify-center group-hover/tool:-translate-y-1 transition-transform duration-300">
                        {tool.icon}
                      </div>
                      <span className="text-[7px] md:text-[8px] font-bold opacity-70 text-center tracking-wider font-sans">{tool.label}</span>
                    </div>
                  ))}
                </div>

                {/* Button placed conditionally */}
                {proj.button && (
                  <div className={`mt-4 lg:mt-0 w-full flex ${proj.alignRight ? 'lg:absolute lg:bottom-5 lg:left-6 justify-end lg:justify-start lg:w-auto' : 'justify-center mt-auto'} `}>
                    <a 
                      href={proj.button.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-black rounded-full text-[10px] font-bold shadow-md hover:bg-gray-50 transition-colors border border-black/5"
                    >
                      {proj.button.text}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                )}

                {/* Platforms placed conditionally */}
                {proj.platforms && (
                  <div className={`mt-4 lg:mt-0 w-full flex flex-wrap gap-2 md:gap-3 ${proj.alignRight ? 'lg:absolute lg:bottom-5 lg:left-6 justify-end lg:justify-start lg:w-auto' : 'justify-center mt-auto'} `}>
                    {proj.platforms.map((plat: any, pIdx: number) => (
                      <a 
                        key={pIdx}
                        href={plat.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded-full text-[9px] font-bold shadow-md hover:scale-105 transition-all border border-black/5 group"
                      >
                        <img src={plat.logo} alt={plat.name} className="w-3.5 h-3.5 rounded-full object-contain bg-white" />
                        {plat.name}
                        <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Image Half */}
              <div className="w-full lg:w-[55%] relative h-[300px] sm:h-[400px] lg:h-auto overflow-hidden bg-black/10">
                {/* Top Left Badge */}
                <div className="absolute top-5 left-5 z-10 px-4 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-white text-[10px] md:text-xs font-bold tracking-widest">{proj.badgeLeft}</div>
                
                {/* Top Right Badge */}
                <div className="absolute top-5 right-5 z-10 px-4 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-white text-[10px] md:text-xs font-bold tracking-widest">{proj.badgeRight}</div>
                
                {/* Bottom Right Badge */}
                <div className={`absolute bottom-5 right-5 z-10 px-5 py-2 rounded-full text-xs md:text-sm font-bold ${proj.imageBadgeBg} text-black shadow-lg`}>
                  {proj.imageBadge}
                </div>
                
                <img 
                  src={proj.img} 
                  alt={proj.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
