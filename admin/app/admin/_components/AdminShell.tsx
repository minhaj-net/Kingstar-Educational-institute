"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useThemeStore } from "@/store/themeStore";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { sidebarCollapsed, mobileOpen, setMobileOpen } = useThemeStore();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (isAuth !== "true") {
      router.replace("/login");
    } else {
      setMounted(true);
    }
  }, [router]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-page">
        <div className="w-8 h-8 border-4 border-[#4caf50] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-page">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-page">
          {children}
        </main>
      </div>
    </div>
  );
}
