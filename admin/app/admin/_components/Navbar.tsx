"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu, Search, Bell, Sun, Moon, ChevronDown, LogOut, User,
} from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

const routeLabels: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/analytics": "Analytics",
  "/admin/courses": "Courses",
  "/admin/courses/categories": "Course Categories",
  "/admin/courses/add": "Add Course",
  "/admin/faculty": "Faculty",
  "/admin/faculty/instructors": "Instructors",
  "/admin/faculty/departments": "Departments",
  "/admin/faculty/research": "Research",
  "/admin/programs": "Programs",
  "/admin/programs/undergraduate": "Undergraduate",
  "/admin/programs/graduate": "Graduate Program",
  "/admin/programs/scholarships": "Scholarships",
  "/admin/students": "Students",
  "/admin/students/admissions": "Admissions",
  "/admin/students/campus-tour": "Campus Tour",
  "/admin/alumni": "Alumni",
  "/admin/alumni/events": "Alumni Events",
  "/admin/alumni/benefits": "Alumni Benefits",
  "/admin/events": "Events",
  "/admin/athletics": "Athletics",
  "/admin/university-life": "University Life",
  "/admin/university-life/dining": "Dining",
  "/admin/university-life/housing": "Housing",
  "/admin/university-life/health": "Health",
  "/admin/university-life/safety": "Safety",
  "/admin/blogs": "Blog / News",
  "/admin/blogs/add": "Add Post",
  "/admin/blogs/categories": "Blog Categories",
  "/admin/gallery": "Gallery",
  "/admin/gallery/upload": "Upload Photos",
  "/admin/portfolio": "Portfolio",
  "/admin/portfolio/categories": "Portfolio Categories",
  "/admin/pages": "Pages",
  "/admin/pages/about": "About Us",
  "/admin/pages/contact": "Contact",
  "/admin/pages/pricing": "Price Table",
  "/admin/shop": "Shop",
  "/admin/orders": "Orders",
  "/admin/donations": "Give to KU",
  "/admin/categories": "Categories",
  "/admin/instructors": "Instructors",
  "/admin/news": "News",
  "/admin/research": "Research",
  "/admin/settings": "Settings",
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { toggleMobile } = useThemeStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const pageTitle = routeLabels[pathname] ?? "Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/login");
  };

  return (
    <header
      className="sticky top-0 z-10 backdrop-blur-md border-b px-4 md:px-6 py-3 flex items-center gap-3"
      style={{
        backgroundColor: "var(--bg-navbar)",
        borderColor: "var(--border)",
      }}
    >
      {/* Mobile hamburger */}
      <button
        onClick={toggleMobile}
        className="lg:hidden p-2 rounded-xl transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-xs hidden sm:block" style={{ color: "var(--text-faint)" }}>Admin</span>
        <span className="text-xs hidden sm:block" style={{ color: "var(--text-faint)" }}>/</span>
        <h1 className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>
          {pageTitle}
        </h1>
      </div>

      <div className="flex-1" />

      {/* Search */}
      <div
        className="hidden md:flex items-center gap-2 rounded-xl px-3 py-2 w-48 lg:w-64"
        style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}
      >
        <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-faint)" }} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm outline-none w-full"
          style={{ color: "var(--text)", caretColor: "var(--accent)" }}
        />
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false); }}
          className="relative p-2 rounded-xl transition-all"
          style={{ color: "var(--text-muted)" }}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#4caf50] rounded-full" />
        </button>

        {notifOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-72 rounded-xl shadow-xl overflow-hidden z-50"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Notifications</p>
            </div>
            <div>
              {[
                { msg: "New student enrolled", time: "2 min ago" },
                { msg: "Course published successfully", time: "1 hour ago" },
                { msg: "Payment received: $299", time: "3 hours ago" },
              ].map((n, i) => (
                <div
                  key={i}
                  className="px-4 py-3 border-b last:border-b-0 cursor-pointer transition-colors"
                  style={{ borderColor: "var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-row)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                >
                  <p className="text-xs" style={{ color: "var(--text)" }}>{n.msg}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-xl transition-all"
        style={{ color: "var(--text-muted)" }}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Avatar dropdown */}
      <div className="relative">
        <button
          onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false); }}
          className="flex items-center gap-2 p-1.5 rounded-xl transition-all"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-[#1a2e5a] to-[#2d4a8a] rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold leading-none" style={{ color: "var(--text)" }}>Admin User</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Administrator</p>
          </div>
          <ChevronDown className="w-3 h-3 hidden md:block" style={{ color: "var(--text-faint)" }} />
        </button>

        {dropdownOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl overflow-hidden z-50"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Admin User</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>admin@kingster.edu</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Backdrop close */}
      {(dropdownOpen || notifOpen) && (
        <div className="fixed inset-0 z-40"
          onClick={() => { setDropdownOpen(false); setNotifOpen(false); }} />
      )}
    </header>
  );
}
