"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (isAuth === "true") {
      router.replace("/admin");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8fafc] dark:bg-[#0f172a]">
      <div className="w-8 h-8 border-4 border-[#4caf50] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
