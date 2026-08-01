import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ["about", "services", "projects", "experience", "certificates", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { id: "about", label: t('nav_about') },
    { id: "services", label: t('nav_services') },
    { id: "projects", label: t('nav_projects') },
    { id: "experience", label: t('nav_experience') },
    { id: "certificates", label: t('nav_certificates') },
    { id: "contact", label: t('nav_contact') },
  ];

  // Custom slow scrolling function
  const slowScrollTo = (targetPosition: number, duration: number) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const nextScrollY = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, nextScrollY);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        setIsScrolling(false);
      }
    };
    
    requestAnimationFrame(animation);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      setIsScrolling(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).lenis;
      
      if (lenis) {
        // Use Lenis for smooth scrolling if available (duration is in seconds)
        // Extremely slow motion scroll (10 seconds)
        lenis.scrollTo(el, { offset: -100, duration: 10 });
        setTimeout(() => setIsScrolling(false), 10000);
      } else {
        // Fallback: Extremely slow motion scroll (10000ms = 10 seconds)
        slowScrollTo(el.offsetTop - 100, 10000);
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500`}
    >
      <div className={`flex items-center justify-between gap-6 px-4 py-2 rounded-full border transition-all duration-500 ${isScrolling ? 'bg-black/80 backdrop-blur-xl border-[#00E5A0] shadow-[0_0_40px_rgba(0,229,160,0.6)] scale-[1.02] text-white' : scrolled ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] shadow-[#00E5A0]/5 text-white' : 'bg-white/5 backdrop-blur-md border-white/10 text-white'}`}>
        
        {/* Left: Button & EN toggle */}
        <div className="flex items-center gap-3">
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-black bg-primary rounded-full hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,229,160,0.4)] transition-all duration-300">
            {t('nav_talk')} 👋
          </a>
          <button onClick={toggleLanguage} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors duration-300`}>
            {lang === 'ar' ? 'EN 🇬🇧' : 'AR 🇸🇦'}
          </button>
        </div>

        {/* Links */}
        <ul className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.id}>
              <a 
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-sm font-bold transition-all duration-300 ${active === link.id ? "text-primary drop-shadow-[0_0_8px_rgba(0,229,160,0.6)] scale-110 inline-block" : "text-white/70 hover:text-white"}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Brand */}
        <a href="#" className={`text-xl font-bold tracking-tight flex items-center ${lang === 'ar' ? 'pr-2' : 'pl-2'} text-white hover:text-white/90 transition-colors`} style={lang === 'ar' ? { fontFamily: "'ThmanyahSerifDisplay', sans-serif" } : { fontFamily: "'Outfit', sans-serif" }}>
          <span className="text-primary font-sans text-2xl mx-0.5 drop-shadow-[0_0_5px_rgba(0,229,160,0.8)]">.</span>{t('hero_title').replace('.', '')}
        </a>

      </div>
    </motion.nav>
  );
}