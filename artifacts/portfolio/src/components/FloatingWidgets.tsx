import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/lib/site";
import { useLanguage } from "../contexts/LanguageContext";

export default function FloatingWidgets() {
  const { t, lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('contact_whatsapp_btn')}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group fixed bottom-6 end-6 z-50 flex items-center gap-3 no-underline"
        >
          {/* Pulsing halo */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
          <span className="absolute inset-0 rounded-full bg-[#25D366]/25 animate-pulse pointer-events-none [animation-delay:0.35s]" />

          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ opacity: 0, x: lang === "ar" ? 12 : -12, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: lang === "ar" ? 12 : -12, scale: 0.9 }}
                className="hidden sm:flex items-center gap-2 bg-[#25D366] text-black text-xs font-bold px-4 py-2.5 rounded-xl shadow-[0_10px_30px_-8px_rgba(37,211,102,0.8)] whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-black/60 animate-pulse" />
                {t('contact_whatsapp_cta')}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Button */}
          <span className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-[0_12px_35px_-6px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95 border border-white/10">
            <FaWhatsapp className="w-7 h-7 text-black" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
