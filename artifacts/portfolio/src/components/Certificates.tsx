import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, Clock, Medal } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { SiGoogleanalytics } from "react-icons/si";
import { useLanguage } from "../contexts/LanguageContext";

export default function Certificates() {
  const { t, lang } = useLanguage();
  const certs = [
    {
      title: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      validUntil: t('cert_valid'),
      logo: <img src="/assets/images/fcc-logo.png" alt="freeCodeCamp" className="w-full h-full object-contain p-1 rounded-full" />,
      status: t('cert_verified'),
      statusIcon: <CheckCircle2 className="w-3.5 h-3.5" />,
      statusColor: "text-gray-600 border-gray-200",
      desc: t('cert_1_desc'),
      pills: [
        { text: t('cert_1_date'), style: "bg-white text-black font-bold" },
        { text: "ID: 156676968", style: "bg-white text-black font-bold" }
      ],
      bg: "bg-[#00E5A0]",
      text: "text-black",
      button: { text: t('cert_verify_btn'), style: "bg-white text-black border border-black hover:bg-gray-50", link: "https://www.freecodecamp.org/" }
    },
    {
      title: "Python Essentials 1",
      issuer: "Cisco Networking Academy",
      validUntil: t('cert_valid'),
      logo: <img src="/assets/images/cisco-logo.png" alt="Cisco" className="w-full h-full object-contain p-1.5 rounded-full" />,
      status: t('cert_verified'),
      statusIcon: <CheckCircle2 className="w-3.5 h-3.5" />,
      statusColor: "text-gray-600 border-gray-200",
      desc: t('cert_2_desc'),
      pills: [
        { text: t('cert_2_date'), style: "bg-blue-50 text-blue-600 border border-blue-200 font-bold" },
        { text: "ID: 173041626", style: "bg-blue-50 text-blue-600 border border-blue-200 font-bold" }
      ],
      bg: "bg-white",
      text: "text-black",
      button: { text: t('cert_verify_btn'), style: "bg-[#00E5A0] text-black border border-black hover:brightness-105", link: "https://www.netacad.com/" }
    },
    {
      title: "MongoDB Basics",
      issuer: "MongoDB University",
      validUntil: t('cert_valid'),
      logo: <img src="/assets/images/mongodb-logo.png" alt="MongoDB" className="w-full h-full object-contain p-1 rounded-full" />,
      status: t('cert_verified'),
      statusIcon: <CheckCircle2 className="w-3.5 h-3.5" />,
      statusColor: "text-gray-600 border-gray-200",
      desc: t('cert_3_desc'),
      pills: [
        { text: t('cert_3_date'), style: "bg-white text-black font-bold" },
        { text: "ID: 6f36df1d-56e2-42aa", style: "bg-white text-black font-bold text-[10px]" }
      ],
      bg: "bg-[#00E5A0]",
      text: "text-black",
      button: { text: t('cert_verify_btn'), style: "bg-white text-black border border-black hover:bg-gray-50", link: "https://learn.mongodb.com/" }
    },
    {
      title: "TypeScript Learning Path",
      issuer: "Microsoft Learn",
      validUntil: t('cert_valid'),
      logo: <img src="/assets/images/microsoft-logo.png" alt="Microsoft" className="w-full h-full object-contain p-1.5 rounded-full" />,
      status: t('cert_verified'),
      statusIcon: <CheckCircle2 className="w-3.5 h-3.5" />,
      statusColor: "text-gray-600 border-gray-200",
      desc: t('cert_4_desc'),
      pills: [
        { text: t('cert_4_date'), style: "bg-blue-50 text-blue-500 border border-blue-200 font-bold" },
        { text: "ID: 9f36df1d-42aa-8947", style: "bg-blue-50 text-blue-500 border border-blue-200 font-bold text-[10px]" }
      ],
      bg: "bg-white",
      text: "text-black",
      button: { text: t('cert_verify_btn'), style: "bg-[#00E5A0] text-black border border-black hover:brightness-105", link: "https://learn.microsoft.com/" }
    }
  ];

  return (
    <section id="certificates" className="py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#00E5A0] font-bold tracking-wider text-sm mb-3 inline-block uppercase">{t('cert_section_title')}</span>
          <h2 
            className="text-3xl md:text-5xl font-bold text-white leading-tight uppercase"
            style={lang === 'ar' ? { fontFamily: "'ThmanyahSerifDisplay', sans-serif" } : {}}
          >
            {t('cert_title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`p-6 md:p-8 rounded-[2rem] shadow-xl flex flex-col ${cert.bg} ${cert.text} hover:-translate-y-1 transition-transform duration-300 relative`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border bg-white flex items-center gap-1.5 shadow-sm ${cert.statusColor}`}>
                  {cert.statusIcon} {cert.status}
                </span>
                
                <div className={`text-left flex flex-col ${lang === 'ar' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 mb-1 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span className="font-bold text-[11px] md:text-sm">{cert.issuer}</span>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      {cert.logo}
                    </div>
                  </div>
                  {cert.validUntil && (
                    <span className="text-[9px] md:text-[10px] font-medium opacity-60">{cert.validUntil}</span>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <h3 
                className={`text-2xl md:text-3xl font-bold mb-4 leading-normal ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                style={{ fontFamily: "'ThmanyahSerifDisplay', sans-serif" }}
              >
                {cert.title}
              </h3>

              {/* @ts-ignore */}
              {cert.badge && (
                <div className={`mb-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">
                    {/* @ts-ignore */}
                    <Medal className="w-3.5 h-3.5" /> {cert.badge}
                  </span>
                </div>
              )}
              
              <p className={`text-xs md:text-sm font-medium opacity-80 leading-relaxed mb-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                {cert.desc}
              </p>
              
              {cert.progress && (
                <div className="mb-8">
                  <div className="w-12 h-6 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400 mb-2 shadow-sm">
                    {cert.progress}
                  </div>
                  <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                    <div className="h-full bg-black/20 w-0"></div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-auto flex flex-col sm:flex-row justify-between items-end sm:items-center gap-6 pt-4">
                <div className="flex flex-wrap gap-2">
                  {cert.pills.map((pill, pIdx) => (
                    <span key={pIdx} className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs shadow-sm ${pill.style}`}>
                      {pill.text}
                    </span>
                  ))}
                </div>
                
                {cert.button && (
                  <a 
                    href={cert.button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-md transition-all whitespace-nowrap ${cert.button.style}`}
                  >
                    {cert.button.text} <ExternalLink className="w-4 h-4" />
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
