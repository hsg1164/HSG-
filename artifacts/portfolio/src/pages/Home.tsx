import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SkillsMarquee from "../components/SkillsMarquee";
import About from "../components/About";
import Services from "../components/Services";
import Methodology from "../components/Methodology";
import Projects from "../components/Projects";
import Stats from "../components/Stats";
import Experience from "../components/Experience";
import Clients from "../components/Clients";
import Certificates from "../components/Certificates";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <Navbar />
      <Hero />
      <SkillsMarquee />
      <About />
      <Services />
      <Methodology />
      <Projects />
      <Stats />
      <Experience />
      <Clients />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  );
}
