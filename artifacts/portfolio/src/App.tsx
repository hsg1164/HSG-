import { useEffect } from "react";
import Lenis from "lenis";
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  useEffect(() => {
    // لا نغيّر عنوان الصفحة الرئيسية (مهيّأ مسبقاً لتحسين محركات البحث)
    if (isAdmin) {
      document.title = "لوحة التحكم | محمد زياد";
    }
  }, [isAdmin]);

  useEffect(() => {
    // التمرير السلس يُفعّل على الموقع فقط وليس في لوحة التحكم
    if (isAdmin) return;

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
  }, [isAdmin]);

  return (
    <>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route component={Home} />
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
