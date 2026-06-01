"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
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
  megaMenu?: MegaMenuData;
}

interface MegaMenuColumn {
  heading: string;
  links: { label: string; href: string }[];
}

interface MegaMenuData {
  columns: MegaMenuColumn[];
  brand?: { tagline: string };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const topBarLinks = [
  { label: "Alumni", href: "/alumni" },
  { label: "Calendar", href: "/celender" },
  { label: "Portal", href: "/portal" },
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
      { label: "Gallery", href: "/gallary" },
      { label: "Price Table", href: "/price-table" },
    ],
  },
  {
    label: "Academics",
    href: "#",
    megaMenu: {
      columns: [
        {
          heading: "Undergraduate",
          links: [
            { label: "Business Administration", href: "/business-administration" },
            { label: "School Of Law", href: "/school-of-law" },
            { label: "Engineering", href: "/engineering" },
            { label: "Medicine", href: "/medicine" },
            { label: "Art & Science", href: "/art-science" },
          ],
        },
        {
          heading: "Graduate Program",
          links: [
            { label: "Hospitality Management", href: "/hospitality-management" },
            { label: "Physics", href: "/physics" },
            // { label: "Chemistry", href: "/chemistry" },
            // { label: "Music", href: "/music" },
            // { label: "Computer Science", href: "/computer-science" },
          ],
        },
        {
          heading: "Resources",
          links: [
            { label: "Department Page", href: "/business-administration" },
            { label: "Finance", href: "/finance" },
            { label: "Faculty Page", href: "/finance-faculty" },
          ],
        },
      ],
      brand: {
        tagline: "Academic offerings include 95 majors, 86 minors, and more than 100 in-major specializations",
      },
    },
  },
  {
    label: "Admissions",
    href: "#",
    children: [
      { label: "Apply Now", href: "/apply-kingstar" },
      { label: "Campus Tour", href: "/campus-tour" },
      { label: "Scholarships", href: "/scholarships" },
      { label: "Athletics", href: "/athletics" },
      { label: "Give to Kingster", href: "/give-to-kingstar" },
    ],
  },
  { label: "Courses", href: "/courses" },
  { label: "Athletics", href: "/athletics" },
  { label: "University Life", href: "/university-life" },
];

// ─── Simple dropdown ──────────────────────────────────────────────────────────

function SimpleDropdown({
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
      gsap.fromTo(ref.current,
        { opacity: 0, y: -8, display: "block" },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }
      );
    } else {
      gsap.to(ref.current, {
        opacity: 0, y: -8, duration: 0.18, ease: "power2.in",
        onComplete: () => { if (ref.current) ref.current.style.display = "none"; },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      style={{ display: "none" }}
      className="absolute top-full left-0 w-52 bg-white shadow-xl rounded-sm border-t-2 border-[#4caf50] z-50 overflow-hidden py-1"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1a2e5a] hover:text-white transition-colors duration-200"
        >
          <ChevronRight size={12} className="text-[#4caf50] flex-shrink-0" />
          {item.label}
        </Link>
      ))}
    </div>
  );
}

// ─── Mega menu ────────────────────────────────────────────────────────────────

function MegaMenu({ data, isOpen }: { data: MegaMenuData; isOpen: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) {
      gsap.fromTo(ref.current,
        { opacity: 0, y: -10, display: "flex" },
        { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }
      );
    } else {
      gsap.to(ref.current, {
        opacity: 0, y: -10, duration: 0.2, ease: "power2.in",
        onComplete: () => { if (ref.current) ref.current.style.display = "none"; },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      style={{ display: "none" }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[820px] max-w-[95vw] bg-white shadow-2xl border-t-2 border-[#4caf50] z-50 rounded-sm"
    >
      <div className="grid grid-cols-4 divide-x divide-gray-100">
        {/* Link columns */}
        {data.columns.map((col) => (
          <div key={col.heading} className="px-6 py-6 flex flex-col gap-3">
            <h4 className="text-[#1a2e5a] font-bold text-sm border-b border-gray-100 pb-2 mb-1">
              {col.heading}
            </h4>
            {col.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-600 hover:text-[#4caf50] transition-colors duration-200 leading-snug"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        {/* Brand panel */}
        {data.brand && (
          <div className="px-6 py-6 bg-gray-50 flex flex-col gap-4">
            {/* Logo mark */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#1a2e5a] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
                  <path d="M8 24V12a1 1 0 011-1h5a3 3 0 013 3v10M8 24h9M17 24V14"
                    stroke="#c8a84b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 14h3a1 1 0 011 1v9" stroke="#c8a84b" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M8 24h13" stroke="#c8a84b" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-bold text-[#1a2e5a]">Kingster</span>
                <span className="block text-xs text-gray-400 tracking-widest uppercase">University</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{data.brand.tagline}</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1 text-xs text-[#4caf50] font-semibold hover:gap-2 transition-all duration-200 mt-auto"
            >
              View All Courses <ChevronRight size={12} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const topBarRef = useRef<HTMLDivElement>(null);
  const mainBarRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ── Active check ──
  const isActive = (item: NavItem): boolean => {
    if (item.href === "/") return pathname === "/";
    if (item.href !== "#" && item.href) {
      const href = item.href.startsWith("/") ? item.href : `/${item.href}`;
      if (pathname === href || pathname.startsWith(href + "/")) return true;
    }
    if (item.children) {
      return item.children.some((child) => {
        if (!child.href || child.href === "#") return false;
        const href = child.href.startsWith("/") ? child.href : `/${child.href}`;
        return pathname === href || pathname.startsWith(href + "/");
      });
    }
    if (item.megaMenu) {
      return item.megaMenu.columns.some((col) =>
        col.links.some((link) => {
          const href = link.href.startsWith("/") ? link.href : `/${link.href}`;
          return pathname === href || pathname.startsWith(href + "/");
        })
      );
    }
    return false;
  };

  // ── AOS ──
  useEffect(() => { AOS.init({ duration: 600, once: true }); }, []);

  // ── GSAP entrance ──
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(topBarRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
      .fromTo(mainBarRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2");
    gsap.fromTo(logoRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.4 });
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
      gsap.fromTo(mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, { height: 0, opacity: 0, duration: 0.28, ease: "power2.in" });
    }
  }, [mobileOpen]);

  // ── Search focus ──
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [searchOpen]);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setMobileExpanded(null); }, [pathname]);

  return (
    <header className={`w-full sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>

      {/* ══════════════════════════════════════════
          TOP BAR — desktop only (hidden on mobile)
      ══════════════════════════════════════════ */}
      <div ref={topBarRef} className="bg-[#1a2e5a] text-white hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
          {/* Contact */}
          <div className="flex items-center gap-5">
            <a href="mailto:contact@KUTheme.edu"
              className="flex items-center gap-1.5 hover:text-[#4caf50] transition-colors duration-200 text-xs">
              <Mail size={12} />
              <span>contact@KUTheme.edu</span>
            </a>
            <a href="tel:+13435235622"
              className="flex items-center gap-1.5 hover:text-[#4caf50] transition-colors duration-200 text-xs">
              <Phone size={12} />
              <span>+1-3435-2356-222</span>
            </a>
          </div>
          {/* Right */}
          <div className="flex items-center gap-1">
            {topBarLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className="px-3 py-1 text-xs text-gray-300 hover:text-white transition-colors duration-200">
                {link.label}
              </Link>
            ))}
            <Link href="/give-to-kingstar"
              className="ml-2 px-4 py-1.5 bg-[#4caf50] hover:bg-[#43a047] text-white text-xs font-semibold rounded-sm transition-colors duration-200">
              Support KU
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN BAR
      ══════════════════════════════════════════ */}
      <div ref={mainBarRef} className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* Logo */}
            <div ref={logoRef} className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#1a2e5a] flex items-center justify-center bg-white group-hover:bg-[#1a2e5a] transition-colors duration-300 flex-shrink-0">
                  <svg viewBox="0 0 40 40" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
                    <circle cx="20" cy="20" r="19" stroke="#1a2e5a" strokeWidth="1.5" />
                    <path d="M12 28V14a1 1 0 011-1h6a3 3 0 013 3v12M12 28h10M22 28V16"
                      stroke="#c8a84b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 16h4a1 1 0 011 1v11" stroke="#c8a84b" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M12 28h15" stroke="#c8a84b" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <span className="block text-base sm:text-lg font-bold text-[#1a2e5a] tracking-wide">Kingster</span>
                  <span className="block text-[10px] sm:text-xs text-gray-500 -mt-0.5 tracking-widest uppercase">University</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 relative">
              {navItems.map((item, i) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => (item.children || item.megaMenu) && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  data-aos="fade-down"
                  data-aos-delay={i * 60}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-0.5 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group
                      ${isActive(item) ? "text-[#4caf50]" : "text-gray-700 hover:text-[#1a2e5a]"}`}
                  >
                    {item.label}
                    {(item.children || item.megaMenu) && (
                      <ChevronDown size={13}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                    )}
                    {isActive(item) && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#4caf50] rounded-full" />
                    )}
                    {!isActive(item) && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1a2e5a] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                    )}
                  </Link>

                  {item.children && (
                    <SimpleDropdown items={item.children} isOpen={activeDropdown === item.label} />
                  )}
                  {item.megaMenu && (
                    <MegaMenu data={item.megaMenu} isOpen={activeDropdown === item.label} />
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Search button */}
              <button onClick={() => setSearchOpen((v) => !v)} aria-label="Toggle search"
                className="p-2 text-gray-600 hover:text-[#1a2e5a] transition-colors duration-200">
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>

              {/* Hamburger */}
              <button onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu"
                className="lg:hidden p-2 text-gray-700 hover:text-[#1a2e5a] transition-colors duration-200">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Inline search bar (slides under main bar) ── */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-white animate__animated animate__fadeIn animate__faster">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center gap-3">
                <Search size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, pages, events..."
                  className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                  onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                />
                <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            MOBILE MENU
        ══════════════════════════════════════════ */}
        <div
          ref={mobileMenuRef}
          className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
          style={{ height: 0, opacity: 0 }}
        >
          {/* Mobile top-bar info strip */}
          <div className="bg-[#1a2e5a] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <a href="mailto:contact@KUTheme.edu"
                className="flex items-center gap-1 text-white/80 text-xs hover:text-white transition-colors">
                <Mail size={11} /><span>contact@KUTheme.edu</span>
              </a>
              <a href="tel:+13435235622"
                className="flex items-center gap-1 text-white/80 text-xs hover:text-white transition-colors">
                <Phone size={11} /><span>+1-3435-2356-222</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              {topBarLinks.map((link) => (
                <Link key={link.label} href={link.href}
                  className="text-white/70 text-xs hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link href="/give-to-kingstar"
                className="px-2.5 py-1 bg-[#4caf50] hover:bg-[#43a047] text-white text-xs font-semibold rounded-sm transition-colors">
                Support KU
              </Link>
            </div>
          </div>

          {/* Nav links */}
          <nav className="px-4 py-2 flex flex-col">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-50 last:border-b-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href === "#" ? "#" : item.href}
                    onClick={() => !(item.children || item.megaMenu) && setMobileOpen(false)}
                    className={`flex-1 py-3 px-1 text-sm font-medium transition-colors duration-200
                      ${isActive(item) ? "text-[#4caf50]" : "text-gray-700"}`}
                  >
                    {item.label}
                  </Link>
                  {(item.children || item.megaMenu) && (
                    <button
                      onClick={() => setMobileExpanded((prev) => prev === item.label ? null : item.label)}
                      className="p-2.5 text-gray-400 hover:text-[#1a2e5a] transition-colors"
                      aria-label={`Expand ${item.label}`}
                    >
                      <ChevronDown size={15}
                        className={`transition-transform duration-200 ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>

                {/* Simple children */}
                {item.children && mobileExpanded === item.label && (
                  <div className="ml-3 mb-2 border-l-2 border-[#4caf50] pl-3 flex flex-col gap-0.5 animate__animated animate__fadeIn animate__faster">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-2 px-1 text-sm text-gray-600 hover:text-[#4caf50] transition-colors duration-200">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mega menu children (flattened) */}
                {item.megaMenu && mobileExpanded === item.label && (
                  <div className="ml-3 mb-3 border-l-2 border-[#4caf50] pl-3 animate__animated animate__fadeIn animate__faster">
                    {item.megaMenu.columns.map((col) => (
                      <div key={col.heading} className="mb-3">
                        <p className="text-xs font-bold text-[#1a2e5a] uppercase tracking-wide mb-1.5">{col.heading}</p>
                        <div className="flex flex-col gap-0.5">
                          {col.links.map((link) => (
                            <Link key={link.label} href={link.href}
                              onClick={() => setMobileOpen(false)}
                              className="py-1.5 px-1 text-sm text-gray-600 hover:text-[#4caf50] transition-colors duration-200">
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
