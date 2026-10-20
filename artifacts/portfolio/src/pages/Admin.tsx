import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import AdminGate from "@/components/admin/AdminGate";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function Admin() {
  const auth = useAdminAuth();

  // منع فهرسة لوحة التحكم بواسطة محركات البحث
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow, noarchive";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  if (auth.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-white/40">
          <Loader2 className="w-7 h-7 animate-spin text-[#4FF0A7]" />
          <p className="text-xs tracking-[0.3em] uppercase">Loading…</p>
        </div>
      </div>
    );
  }

  if (auth.status === "signed_out") {
    return <AdminGate auth={auth} />;
  }

  return <AdminDashboard auth={auth} />;
}
