"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface SelectField {
  placeholder: string;
  options: string[];
}

interface Partner {
  name: string;
  tagline?: string;
  style?: "normal" | "italic" | "spaced";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const selectFields: SelectField[] = [
  { placeholder: "Department", options: ["Arts & Sciences", "Engineering", "Business", "Law", "Medicine"] },
  { placeholder: "Campus",     options: ["Main Campus", "North Campus", "Online", "International"] },
  { placeholder: "Level",      options: ["Undergraduate", "Graduate", "Doctoral", "Certificate"] },
  { placeholder: "Instructor", options: ["All Instructors", "Prof. Albert", "Prof. Tom", "Prof. Alexa"] },
  { placeholder: "Semester",   options: ["Fall 2024", "Spring 2025", "Summer 2025"] },
  { placeholder: "Credit",     options: ["1 Credit", "2 Credits", "3 Credits", "4+ Credits"] },
];

const partners: Partner[] = [
  { name: "EUROPA\nEXPRESS", style: "spaced" },
  { name: "KEY VISION",      tagline: "🔑", style: "normal" },
  { name: "Azis Bank",       style: "italic" },
  { name: "Credit\nAngelic", tagline: "Ↄ",  style: "normal" },
  { name: "Z | A | B",       style: "spaced" },
];

// ─── Custom Select ────────────────────────────────────────────────────────────

function CustomSelect({ field }: { field: SelectField }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropRef.current) return;
    if (open) {
      gsap.fromTo(dropRef.current,
        { opacity: 0, y: -6, display: "block" },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
      );
    } else {
      gsap.to(dropRef.current, {
        opacity: 0, y: -6, duration: 0.15, ease: "power2.in",
        onComplete: () => { if (dropRef.current) dropRef.current.style.display = "none"; },
      });
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.parentElement?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between bg-white/10 hover:bg-white/15 border border-white/20 text-white/80 text-xs sm:text-sm px-3 py-2.5 transition-colors duration-200 focus:outline-none focus:border-[#4caf50]"
      >
        <span className={selected ? "text-white" : "text-white/60"}>
          {selected || field.placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <div
        ref={dropRef}
        style={{ display: "none" }}
        className="absolute top-full left-0 right-0 z-30 bg-[#1a2e5a] border border-white/10 shadow-xl mt-0.5"
      >
        {field.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => { setSelected(opt); setOpen(false); }}
            className="w-full text-left px-3 py-2 text-xs sm:text-sm text-white/70 hover:bg-[#4caf50] hover:text-white transition-colors duration-150"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CourseSearchSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const formRef       = useRef<HTMLFormElement>(null);
  const partnersRef   = useRef<HTMLDivElement>(null);
  const searchBtnRef  = useRef<HTMLButtonElement>(null);

  const [keywords, setKeywords]   = useState("");
  const [courseId, setCourseId]   = useState("");

  // ── AOS + GSAP ──
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Search panel slides from right
      gsap.fromTo(searchPanelRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // Form fields stagger
      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll(".form-field"),
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Partner logos stagger
      gsap.fromTo(
        partnersRef.current?.querySelectorAll(".partner-logo") ?? [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: partnersRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Search button hover ──
  const handleBtnEnter = () =>
    gsap.to(searchBtnRef.current, { scale: 1.02, duration: 0.18, ease: "power2.out" });
  const handleBtnLeave = () =>
    gsap.to(searchBtnRef.current, { scale: 1, duration: 0.18, ease: "power2.in" });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.fromTo(searchBtnRef.current,
      { scale: 0.96 },
      { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
    );
  };

  return (
    <section ref={sectionRef} className="w-full" aria-label="Search For Courses">

      {/* ══════════════════════════════════════════
          TOP: Search band (image left + form right)
      ══════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "clamp(280px, 36vw, 420px)" }}>

        {/* Full-width background: slide-3.jpg */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/slide-3.jpg"
            alt="Student studying"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Left side lighter, right side darker navy */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-[#0f1e3d]/60 to-[#0f1e3d]/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full flex justify-end">

            {/* Search panel — right half */}
            <div
              ref={searchPanelRef}
              className="w-full sm:w-[55%] lg:w-[48%] py-8 sm:py-10"
              data-aos="fade-left"
            >
              {/* Heading */}
              <h2
                className="text-white font-bold mb-6"
                style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)" }}
              >
                Search For Courses
              </h2>

              {/* Form */}
              <form ref={formRef} onSubmit={handleSearch} className="flex flex-col gap-3">

                {/* Row 1: Keywords + Course ID */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-field">
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="Keywords"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs sm:text-sm px-3 py-2.5 focus:outline-none focus:border-[#4caf50] transition-colors duration-200"
                    />
                  </div>
                  <div className="form-field">
                    <input
                      type="text"
                      value={courseId}
                      onChange={(e) => setCourseId(e.target.value)}
                      placeholder="Course ID"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs sm:text-sm px-3 py-2.5 focus:outline-none focus:border-[#4caf50] transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Rows 2–4: Select pairs */}
                {[0, 1, 2].map((rowIdx) => (
                  <div key={rowIdx} className="grid grid-cols-2 gap-3">
                    {selectFields.slice(rowIdx * 2, rowIdx * 2 + 2).map((field) => (
                      <div key={field.placeholder} className="form-field">
                        <CustomSelect field={field} />
                      </div>
                    ))}
                  </div>
                ))}

                {/* Search button */}
                <div className="form-field mt-1">
                  <button
                    ref={searchBtnRef}
                    type="submit"
                    onMouseEnter={handleBtnEnter}
                    onMouseLeave={handleBtnLeave}
                    className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white font-bold text-sm py-3 flex items-center justify-center gap-2 transition-colors duration-300"
                  >
                    <Search size={15} />
                    Search Courses
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM: Partner logos bar
      ══════════════════════════════════════════ */}
      <div className="w-full bg-[#1a2232] border-t border-white/5">
        <div
          ref={partnersRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7"
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 sm:gap-4">
            {partners.map((p, i) => (
              <div
                key={i}
                className="partner-logo flex items-center gap-2 cursor-pointer group"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                {/* Icon / symbol */}
                {p.tagline && (
                  <span className="text-white/40 group-hover:text-white/70 text-lg font-bold transition-colors duration-200 leading-none">
                    {p.tagline}
                  </span>
                )}

                {/* Name */}
                <span
                  className={`text-white/40 group-hover:text-white/80 transition-colors duration-200 leading-tight whitespace-pre-line text-center
                    ${p.style === "italic" ? "italic font-semibold text-sm sm:text-base" : ""}
                    ${p.style === "spaced" ? "tracking-[0.18em] text-xs sm:text-sm font-semibold uppercase" : ""}
                    ${p.style === "normal" ? "font-semibold text-sm sm:text-base" : ""}
                  `}
                >
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
