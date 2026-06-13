import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

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
    { id: "about", label: "عني" },
    { id: "services", label: "الخدمات" },
    { id: "projects", label: "المشاريع" },
    { id: "experience", label: "الخبرات" },
    { id: "certificates", label: "الشهادات" },
    { id: "contact", label: "تواصل" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300`}
    >
      <div className={`flex items-center justify-between gap-6 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md bg-black/50 transition-all ${scrolled ? 'shadow-lg shadow-black/20' : ''}`}>
        
        {/* Button */}
        <a href="#contact" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary border border-primary/50 rounded-full shadow-[0_0_15px_rgba(0,229,160,0.2)] hover:shadow-[0_0_25px_rgba(0,229,160,0.4)] transition-all">
          لنتحدث <Sparkles className="w-4 h-4 text-primary" />
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.id}>
              <a 
                href={`#${link.id}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${active === link.id ? "text-primary border-b border-primary pb-1" : "text-white/70"}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Brand */}
        <a href="#" className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'ThmanyahSerifDisplay', sans-serif" }}>
          <span className="text-primary">.</span>محمد زياد
        </a>

      </div>
    </motion.nav>
  );
}