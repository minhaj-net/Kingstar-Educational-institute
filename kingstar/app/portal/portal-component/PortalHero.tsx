"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Lock,
  LogIn,
  BookOpen,
  GraduationCap,
  Mail,
  Library,
  Bell,
  Calendar,
  FileText,
  CreditCard,
  Settings,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Quick access tiles ───────────────────────────────────────────────────────

const quickLinks = [
  { icon: <GraduationCap size={28} strokeWidth={1.4} />, label: "Student Portal",   href: "#", color: "bg-[#1a2e5a]" },
  { icon: <BookOpen      size={28} strokeWidth={1.4} />, label: "Faculty Portal",   href: "#", color: "bg-[#2d4a8a]" },
  { icon: <Library       size={28} strokeWidth={1.4} />, label: "Library Access",   href: "#", color: "bg-[#4caf50]" },
  { icon: <Mail          size={28} strokeWidth={1.4} />, label: "KU Email",         href: "#", color: "bg-[#1a2e5a]" },
  { icon: <Calendar      size={28} strokeWidth={1.4} />, label: "Event Calendar",   href: "/celender", color: "bg-[#2d4a8a]" },
  { icon: <FileText      size={28} strokeWidth={1.4} />, label: "Course Catalog",   href: "/courses",  color: "bg-[#4caf50]" },
  { icon: <CreditCard    size={28} strokeWidth={1.4} />, label: "Tuition & Fees",   href: "#", color: "bg-[#1a2e5a]" },
  { icon: <Settings      size={28} strokeWidth={1.4} />, label: "Account Settings", href: "#", color: "bg-[#2d4a8a]" },
];

const announcements = [
  { date: "Dec 17, 2018", text: "Fall 2018 final exam schedule is now available on the student portal." },
  { date: "Dec 10, 2018", text: "Spring 2019 course registration opens January 5th for all students." },
  { date: "Nov 28, 2018", text: "Library extended hours during finals week: 7am – midnight daily." },
  { date: "Nov 20, 2018", text: "KU Alumni Golf Tour registration deadline is December 31st." },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PortalHero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const heroRef     = useRef<HTMLDivElement>(null);
  const loginRef    = useRef<HTMLDivElement>(null);
  const quickRef    = useRef<HTMLDivElement>(null);
  const annoRef     = useRef<HTMLDivElement>(null);
  const btnRef      = useRef<HTMLButtonElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 40 });

    const ctx = gsap.context(() => {
      // Hero band entrance
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Login card slides in
      gsap.fromTo(loginRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Quick links stagger
      gsap.fromTo(
        quickRef.current?.querySelectorAll(".quick-tile") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: quickRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Announcements stagger
      gsap.fromTo(
        annoRef.current?.querySelectorAll(".anno-item") ?? [],
        { x: 20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.45, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: annoRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Button hover
      if (btnRef.current) {
        btnRef.current.addEventListener("mouseenter", () =>
          gsap.to(btnRef.current, { scale: 1.03, duration: 0.18, ease: "power2.out" })
        );
        btnRef.current.addEventListener("mouseleave", () =>
          gsap.to(btnRef.current, { scale: 1, duration: 0.18, ease: "power2.in" })
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      gsap.fromTo(loginRef.current, { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" });
      return;
    }
    setError("");
    gsap.fromTo(btnRef.current, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)",
      onComplete: () => setLoggedIn(true) });
  };

  return (
    <section ref={sectionRef} className="w-full" aria-label="KU Portal">

      {/* ══════════════════════════════════════════
          HERO BAND — dark navy with campus bg
      ══════════════════════════════════════════ */}
      <div ref={heroRef} className="relative w-full overflow-hidden" style={{ minHeight: "clamp(180px, 22vw, 280px)" }}>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1400&q=85"
            alt="KU Portal – campus"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0f1e3d]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16 flex flex-col gap-3">
          <p className="text-[#4caf50] text-xs font-semibold tracking-widest uppercase">Welcome Back</p>
          <h1 className="text-white font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}>
            KU Student &amp; Faculty Portal
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl leading-relaxed">
            Access your courses, grades, library resources, email, and all campus services
            from one place. Sign in with your KU credentials to get started.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#4caf50] via-[#4caf50]/50 to-transparent" />
      </div>

      {/* ══════════════════════════════════════════
          MAIN CONTENT — Login + Quick Links + Announcements
      ══════════════════════════════════════════ */}
      <div className="w-full bg-[#f4f6f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 xl:gap-12 items-start">

            {/* ── LEFT: Login card ── */}
            <div ref={loginRef} data-aos="fade-right">
              <div className="bg-white shadow-md rounded-sm overflow-hidden">
                {/* Card header */}
                <div className="bg-[#1a2e5a] px-6 py-4 flex items-center gap-2">
                  <User size={18} className="text-[#4caf50]" />
                  <h2 className="text-white font-bold text-base">Sign In to Portal</h2>
                </div>

                {/* Form */}
                <div className="px-6 py-6">
                  {loggedIn ? (
                    <div className="flex flex-col items-center gap-4 py-4 animate__animated animate__fadeIn">
                      <div className="w-14 h-14 rounded-full bg-[#4caf50]/10 flex items-center justify-center">
                        <GraduationCap size={28} className="text-[#4caf50]" />
                      </div>
                      <p className="text-[#1a2e5a] font-bold text-base">Welcome, {username}!</p>
                      <p className="text-gray-500 text-sm text-center">You are now signed in to the KU Portal.</p>
                      <button
                        onClick={() => { setLoggedIn(false); setUsername(""); setPassword(""); }}
                        className="text-xs text-gray-400 hover:text-[#4caf50] transition-colors duration-200"
                      >
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                      {error && (
                        <p className="text-red-500 text-xs bg-red-50 border border-red-200 px-3 py-2 rounded-sm animate__animated animate__shakeX">
                          {error}
                        </p>
                      )}

                      {/* Username */}
                      <div className="relative">
                        <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Username or Student ID"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full border border-gray-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4caf50] transition-colors duration-200 rounded-sm"
                        />
                      </div>

                      {/* Password */}
                      <div className="relative">
                        <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full border border-gray-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#4caf50] transition-colors duration-200 rounded-sm"
                        />
                      </div>

                      {/* Forgot password */}
                      <div className="flex justify-end">
                        <Link href="#" className="text-xs text-[#4caf50] hover:underline">
                          Forgot password?
                        </Link>
                      </div>

                      {/* Submit */}
                      <button
                        ref={btnRef}
                        type="submit"
                        className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white font-bold text-sm py-3 flex items-center justify-center gap-2 transition-colors duration-300 rounded-sm"
                      >
                        <LogIn size={16} />
                        Sign In
                      </button>

                      {/* Divider */}
                      <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-100" />
                      </div>

                      {/* Guest access */}
                      <Link
                        href="#"
                        className="w-full border border-gray-200 text-gray-600 hover:border-[#1a2e5a] hover:text-[#1a2e5a] text-sm font-medium py-2.5 flex items-center justify-center gap-2 transition-colors duration-200 rounded-sm"
                      >
                        Continue as Guest
                      </Link>
                    </form>
                  )}
                </div>

                {/* Help footer */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400 text-center">
                    Need help?{" "}
                    <Link href="/contact" className="text-[#4caf50] hover:underline font-medium">
                      Contact IT Support
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Quick Links + Announcements ── */}
            <div className="flex flex-col gap-8">

              {/* Quick Access tiles */}
              <div data-aos="fade-left">
                <h3 className="text-[#1a2e5a] font-bold text-base mb-4">Quick Access</h3>
                <div ref={quickRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {quickLinks.map((tile, i) => (
                    <Link
                      key={tile.label}
                      href={tile.href}
                      className={`quick-tile ${tile.color} hover:opacity-90 text-white flex flex-col items-center gap-2.5 py-5 px-3 rounded-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg text-center group`}
                      data-aos="fade-up"
                      data-aos-delay={i * 50}
                    >
                      <div className="group-hover:scale-110 transition-transform duration-200">
                        {tile.icon}
                      </div>
                      <span className="text-xs font-semibold leading-tight">{tile.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Announcements */}
              <div data-aos="fade-left" data-aos-delay="100">
                <div className="flex items-center gap-2 mb-4">
                  <Bell size={16} className="text-[#4caf50]" />
                  <h3 className="text-[#1a2e5a] font-bold text-base">Announcements</h3>
                </div>
                <div ref={annoRef} className="bg-white rounded-sm shadow-sm overflow-hidden">
                  {announcements.map((item, i) => (
                    <div
                      key={i}
                      className="anno-item flex gap-4 items-start px-5 py-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
                    >
                      <div className="flex-shrink-0 w-16 text-center">
                        <span className="text-[#4caf50] text-xs font-bold block">{item.date.split(",")[0]}</span>
                        <span className="text-gray-400 text-xs">{item.date.split(",")[1]?.trim()}</span>
                      </div>
                      <div className="flex items-start gap-2 min-w-0">
                        <ChevronRight size={14} className="text-[#4caf50] flex-shrink-0 mt-0.5" />
                        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-[#1a2e5a] transition-colors duration-200">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
