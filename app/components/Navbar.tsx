"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Search,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const topBarLinks: { label: string; href: string }[] = [
  { label: "Alumni", href: "#" },
  { label: "Calendar", href: "#" },
  { label: "Portal", href: "#" },
];

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Pages",
    href: "#",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Blog", href: "/blogs" },
      { label: "Contact", href: "/contact" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Gallary", href: "/gallary" },
      { label: "Price Table", href: "/price-table" },
    ],
  },
  {
    label: "Academics",
    href: "#",
    children: [
      { label: "Programs", href: "#" },
      { label: "Departments", href: "#" },
      { label: "Research", href: "#" },
    ],
  },
  {
    label: "Admissions",
    href: "#",
    children: [
      { label: "Apply Now", href: "/apply-kingstar" },
      { label: "Campus Tour", href: "/campus-tour" },
      { label: "Scholarships", href: "/scholarships" },
    ],
  },
  {
    label: "Courses",
    href: "courses",
    // children: [
    //   { label: "Courses", href: "courses" },
    //   { label: "Postgraduate", href: "#" },
    //   { label: "Online", href: "#" },
    // ],
  },
  {
    label: "Athletics",
    href: "athletics",
    // children: [
    //   { label: "Sports", href: "#" },
    //   { label: "Teams", href: "#" },
    //   { label: "Facilities", href: "#" },
    // ],
  },
  {
    label: "University Life",
    href: "#",
    // children: [
    //   { label: "Campus Life", href: "#" },
    //   { label: "Housing", href: "#" },
    //   { label: "Student Services", href: "#" },
    // ],
  },
];

// ─── Dropdown Component ───────────────────────────────────────────────────────

function DropdownMenu({
  items,
  isOpen,
}: {
  items: { label: string; href: string }[];
  isOpen: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: -8, display: "block" },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out", display: "block" }
      );
    } else {
      gsap.to(ref.current, {
        opacity: 0,
        y: -8,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          if (ref.current) ref.current.style.display = "none";
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      style={{ display: "none" }}
      className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-sm border-t-2 border-[#4caf50] z-50 overflow-hidden"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1a2e5a] hover:text-white transition-colors duration-200"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const topBarRef = useRef<HTMLDivElement>(null);
  const mainBarRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // ── AOS init ──
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // ── GSAP entrance animations ──
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      topBarRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    ).fromTo(
      mainBarRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.2"
    );

    gsap.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.4 }
    );
  }, []);

  // ── Scroll shadow ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Mobile menu GSAP ──
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
      });
    }
  }, [mobileOpen]);

  // ── Search panel GSAP ──
  useEffect(() => {
    if (!searchRef.current) return;
    if (searchOpen) {
      gsap.fromTo(
        searchRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.3, ease: "power2.out", transformOrigin: "right" }
      );
    } else {
      gsap.to(searchRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
        transformOrigin: "right",
      });
    }
  }, [searchOpen]);

  const handleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* ── Top Bar ── */}
      <div
        ref={topBarRef}
        className="bg-[#1a2e5a] text-white text-sm"
        data-aos="fade-down"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
          {/* Contact info */}
          <div className="flex items-center gap-5">
            <a
              href="mailto:contact@KUTheme.edu"
              className="flex items-center gap-1.5 hover:text-green-400 transition-colors duration-200 text-xs sm:text-sm"
            >
              <Mail size={13} />
              <span className="hidden sm:inline">contact@KUTheme.edu</span>
            </a>
            <a
              href="tel:+13435235622"
              className="flex items-center gap-1.5 hover:text-green-400 transition-colors duration-200 text-xs sm:text-sm"
            >
              <Phone size={13} />
              <span>+1-3435-2356-222</span>
            </a>
          </div>

          {/* Right links */}
          <div className="flex items-center gap-1">
            {topBarLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-1 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors duration-200"
                data-aos="fade-left"
                data-aos-delay={i * 80}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#"
              className="ml-2 px-4 py-1.5 bg-[#4caf50] hover:bg-[#43a047] text-white text-xs sm:text-sm font-semibold rounded-sm transition-colors duration-200 animate__animated animate__pulse animate__infinite animate__slow"
            >
              Support KU
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Bar ── */}
      <div
        ref={mainBarRef}
        className="bg-white border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* Logo */}
            <div ref={logoRef} className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                {/* Book icon badge */}
                <div className="w-10 h-10 rounded-full border-2 border-[#1a2e5a] flex items-center justify-center bg-white group-hover:bg-[#1a2e5a] transition-colors duration-300">
                  <svg
                    viewBox="0 0 40 40"
                    className="w-7 h-7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20" cy="20" r="19" stroke="#1a2e5a" strokeWidth="1.5" />
                    <path
                      d="M12 28V14a1 1 0 011-1h6a3 3 0 013 3v12M12 28h10M22 28V16"
                      stroke="#c8a84b"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 16h4a1 1 0 011 1v11"
                      stroke="#c8a84b"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path d="M12 28h15" stroke="#c8a84b" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <span className="block text-lg font-bold text-[#1a2e5a] tracking-wide">
                    Kingster
                  </span>
                  <span className="block text-xs text-gray-500 -mt-0.5 tracking-widest uppercase">
                    University
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item, i) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  data-aos="fade-down"
                  data-aos-delay={i * 60}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-0.5 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group
                      ${
                        item.label === "Home"
                          ? "text-[#4caf50]"
                          : "text-gray-700 hover:text-[#1a2e5a]"
                      }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {/* Active underline */}
                    {item.label === "Home" && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#4caf50] rounded-full" />
                    )}
                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1a2e5a] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </Link>

                  {item.children && (
                    <DropdownMenu
                      items={item.children}
                      isOpen={activeDropdown === item.label}
                    />
                  )}
                </div>
              ))}
            </nav>

            {/* Search + Mobile toggle */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative flex items-center">
                <div
                  ref={searchRef}
                  style={{ transform: "scaleX(0)", opacity: 0 }}
                  className="absolute right-8 w-52 sm:w-64"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    autoFocus={searchOpen}
                    className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a2e5a] bg-white"
                  />
                </div>
                <button
                  onClick={() => setSearchOpen((v) => !v)}
                  aria-label="Toggle search"
                  className="p-2 text-gray-600 hover:text-[#1a2e5a] transition-colors duration-200"
                >
                  {searchOpen ? <X size={18} /> : <Search size={18} />}
                </button>
              </div>

              {/* Hamburger (mobile/tablet) */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                className="lg:hidden p-2 text-gray-700 hover:text-[#1a2e5a] transition-colors duration-200"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          ref={mobileMenuRef}
          className="lg:hidden overflow-hidden border-t border-gray-100"
          style={{ height: 0, opacity: 0 }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-0.5">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => !item.children && setMobileOpen(false)}
                    className={`flex-1 py-2.5 px-2 text-sm font-medium rounded-sm transition-colors duration-200
                      ${
                        item.label === "Home"
                          ? "text-[#4caf50]"
                          : "text-gray-700 hover:text-[#1a2e5a] hover:bg-gray-50"
                      }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() =>
                        setMobileExpanded((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                      className="p-2 text-gray-500 hover:text-[#1a2e5a]"
                      aria-label={`Expand ${item.label}`}
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile sub-items */}
                {item.children && mobileExpanded === item.label && (
                  <div className="ml-4 mt-0.5 mb-1 border-l-2 border-[#4caf50] pl-3 flex flex-col gap-0.5 animate__animated animate__fadeIn animate__faster">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-2 px-2 text-sm text-gray-600 hover:text-[#1a2e5a] hover:bg-gray-50 rounded-sm transition-colors duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile top-bar links */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
              {topBarLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-[#1a2e5a] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#"
                className="ml-auto px-3 py-1 bg-[#4caf50] hover:bg-[#43a047] text-white text-xs font-semibold rounded-sm transition-colors duration-200"
              >
                Support KU
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
