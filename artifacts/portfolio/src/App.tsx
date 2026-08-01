import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/toaster";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.04, // Very heavy/smooth inertia
      smoothWheel: true,
      wheelMultiplier: 0.6, // Slower scrolling per wheel tick
    });
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).lenis;
    };
  }, []);

  return (
    <>
      <Home />
      <Toaster />
    </>
  );
}

export default App;
