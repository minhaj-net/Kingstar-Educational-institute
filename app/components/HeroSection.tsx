"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Building2, GraduationCap, Trophy, Users } from "lucide-react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Slide {
  id: number;
  eyebrow: string;
  heading: string;
  subtext?: string;
  cta: string;
  ctaHref: string;
  /** Replace src with your own image path, e.g. "/images/slide1.jpg" */
  image: string;
  /** Fallback gradient shown when image is a placeholder */
  gradient: string;
}

interface StatItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
}

// ─── Slide Data ───────────────────────────────────────────────────────────────

const slides: Slide[] = [
  {
    id: 1,
    eyebrow: "Kingsters has more than",
    heading: "180 Majors & Minors",
    cta: "Take A Tour",
    ctaHref: "#",
    // ↓ Replace with your own image: "/images/hero-1.jpg"
    image: "/slide-1.jpg",
    gradient: "linear-gradient(135deg, #1a2e5a 0%, #2d4a8a 40%, #3a5fa0 70%, #1a3a6a 100%)",
  },
  {
    id: 2,
    eyebrow: "World-class education with",
    heading: "500+ Expert Faculty",
    cta: "Meet Our Faculty",
    ctaHref: "#",
    // ↓ Replace with your own image: "/images/hero-2.jpg"
    image: "/slide-2.jpg",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  },
  {
    id: 3,
    eyebrow: "Join a community of",
    heading: "25,000 Students Worldwide",
    cta: "Apply Now",
    ctaHref: "#",
    // ↓ Replace with your own image: "/images/hero-3.jpg"
    image: "/slide-3.jpg",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    id: 4,
    eyebrow: "Ranked among the top",
    heading: "Universities Globally",
    cta: "Explore Rankings",
    ctaHref: "#",
    // ↓ Replace with your own image: "/images/hero-4.jpg"
    image: "/slide-4.jpg",
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #1b2838 40%, #1e3a5f 100%)",
  },
];

// ─── Stats Bar Data ───────────────────────────────────────────────────────────

const stats: StatItem[] = [
  {
    icon: <Building2 size={36} strokeWidth={1.2} />,
    title: "University Life",
    subtitle: "Overall in here",
    color: "text-[#1a2e5a]",
  },
  {
    icon: <GraduationCap size={36} strokeWidth={1.2} />,
    title: "Graduation",
    subtitle: "Getting Diploma",
    color: "text-[#4caf50]",
  },
  {
    icon: <Trophy size={36} strokeWidth={1.2} />,
    title: "Athletics",
    subtitle: "Sport Clubs",
    color: "text-[#1a2e5a]",
  },
  {
    icon: <Users size={36} strokeWidth={1.2} />,
    title: "Social",
    subtitle: "Overall in here",
    color: "text-[#1a2e5a]",
  },
];

// ─── Placeholder SVG (shown when no image is provided) ───────────────────────

function PlaceholderScene({ index }: { index: number }) {
  const scenes = [
    // Slide 1 – Colonnade / arches
    <svg key={0} viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="arch-glow" cx="30%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="500" fill="url(#arch-glow)" />
      {/* Columns */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <g key={i} transform={`translate(${120 + i * 120}, 0)`}>
          <rect x="0" y="60" width="28" height="380" rx="4" fill={`rgba(180,160,130,${0.55 - i * 0.04})`} />
          <ellipse cx="14" cy="60" rx="22" ry="18" fill={`rgba(200,180,150,${0.6 - i * 0.04})`} />
          <rect x="-10" y="42" width="48" height="18" rx="3" fill={`rgba(210,190,160,${0.55 - i * 0.04})`} />
        </g>
      ))}
      {/* Arches between columns */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path
          key={i}
          d={`M ${134 + i * 120} 60 Q ${194 + i * 120} 10 ${254 + i * 120} 60`}
          fill="none"
          stroke={`rgba(200,180,150,${0.5 - i * 0.04})`}
          strokeWidth="12"
        />
      ))}
      {/* Floor */}
      <rect x="0" y="440" width="1200" height="60" fill="rgba(100,80,60,0.4)" />
      {/* Depth lines */}
      {[1, 2, 3].map((i) => (
        <line key={i} x1={600} y1={250} x2={i * 300} y2={500} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
    </svg>,

    // Slide 2 – Library / bookshelves
    <svg key={1} viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="lib-glow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#4a6fa5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="500" fill="url(#lib-glow)" />
      {/* Bookshelves */}
      {[0, 1, 2, 3, 4].map((shelf) => (
        <g key={shelf} transform={`translate(${shelf * 240}, 0)`}>
          <rect x="10" y="20" width="220" height="460" rx="2" fill={`rgba(40,30,20,${0.7 - shelf * 0.05})`} />
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <g key={row} transform={`translate(0, ${row * 72})`}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((book) => (
                <rect
                  key={book}
                  x={18 + book * 26}
                  y={30}
                  width={20}
                  height={55}
                  rx="1"
                  fill={`hsl(${(shelf * 60 + row * 30 + book * 15) % 360}, 40%, ${30 + book * 3}%)`}
                  opacity={0.8}
                />
              ))}
              <rect x="10" y="88" width="220" height="6" rx="1" fill="rgba(80,60,40,0.9)" />
            </g>
          ))}
        </g>
      ))}
      {/* Center light beam */}
      <polygon points="600,0 500,500 700,500" fill="rgba(255,255,200,0.04)" />
    </svg>,

    // Slide 3 – Campus aerial / geometric
    <svg key={2} viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="campus-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#2a4a8a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="500" fill="url(#campus-glow)" />
      {/* Buildings */}
      {[
        { x: 100, y: 200, w: 120, h: 200 },
        { x: 260, y: 150, w: 80, h: 250 },
        { x: 380, y: 180, w: 150, h: 220 },
        { x: 700, y: 120, w: 200, h: 280 },
        { x: 940, y: 160, w: 100, h: 240 },
        { x: 1060, y: 200, w: 120, h: 200 },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="2" fill={`rgba(60,90,140,${0.6 - i * 0.04})`} />
          {/* Windows */}
          {Array.from({ length: Math.floor(b.h / 40) }).map((_, row) =>
            Array.from({ length: Math.floor(b.w / 30) }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={b.x + 8 + col * 28}
                y={b.y + 12 + row * 38}
                width={14}
                height={18}
                rx="1"
                fill={`rgba(255,240,180,${Math.random() > 0.4 ? 0.7 : 0.1})`}
              />
            ))
          )}
        </g>
      ))}
      {/* Ground */}
      <rect x="0" y="400" width="1200" height="100" fill="rgba(20,40,20,0.5)" />
      {/* Path */}
      <ellipse cx="600" cy="420" rx="300" ry="30" fill="rgba(180,160,100,0.2)" />
    </svg>,

    // Slide 4 – Graduation / ceremony
    <svg key={3} viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="grad-glow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#4caf50" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="500" fill="url(#grad-glow)" />
      {/* Stage */}
      <rect x="300" y="300" width="600" height="20" rx="4" fill="rgba(180,150,80,0.5)" />
      <rect x="200" y="320" width="800" height="30" rx="4" fill="rgba(160,130,60,0.4)" />
      {/* Podium */}
      <rect x="560" y="220" width="80" height="80" rx="4" fill="rgba(100,80,40,0.7)" />
      <rect x="540" y="200" width="120" height="20" rx="2" fill="rgba(120,100,50,0.8)" />
      {/* Silhouettes */}
      {[-3, -2, -1, 0, 1, 2, 3].map((offset) => (
        <g key={offset} transform={`translate(${600 + offset * 120}, 0)`}>
          <circle cx="0" cy="230" r="18" fill={`rgba(200,200,220,${0.5 - Math.abs(offset) * 0.05})`} />
          <rect x="-14" y="248" width="28" height="52" rx="4" fill={`rgba(30,50,100,${0.6 - Math.abs(offset) * 0.05})`} />
          {/* Cap */}
          <rect x="-20" y="214" width="40" height="6" rx="1" fill={`rgba(20,20,20,${0.7 - Math.abs(offset) * 0.05})`} />
          <polygon
            points={`0,200 -18,214 18,214`}
            fill={`rgba(20,20,20,${0.6 - Math.abs(offset) * 0.05})`}
          />
        </g>
      ))}
      {/* Confetti */}
      {Array.from({ length: 40 }).map((_, i) => (
        <rect
          key={i}
          x={(i * 137) % 1200}
          y={(i * 73) % 300}
          width="6"
          height="10"
          rx="1"
          fill={`hsl(${(i * 47) % 360}, 70%, 60%)`}
          opacity={0.6}
          transform={`rotate(${(i * 23) % 180}, ${(i * 137) % 1200}, ${(i * 73) % 300})`}
        />
      ))}
    </svg>,
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {scenes[index % scenes.length]}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── AOS init ──
  useEffect(() => {
    AOS.init({ duration: 700, once: false, offset: 50 });
  }, []);

  // ── Stats entrance ──
  useEffect(() => {
    if (!statsRef.current) return;
    gsap.fromTo(
      statsRef.current.querySelectorAll(".stat-item"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out", delay: 0.8 }
    );
  }, []);

  // ── Animate content in ──
  const animateContentIn = useCallback((dir: "next" | "prev") => {
    if (!contentRef.current) return;
    const xFrom = dir === "next" ? 60 : -60;
    gsap.fromTo(
      contentRef.current.children,
      { x: xFrom, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      }
    );
  }, []);

  // ── Progress bar ──
  const startProgress = useCallback(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 5, ease: "none", transformOrigin: "left" }
    );
  }, []);

  // ── Go to slide ──
  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);

      const outSlide = slideRefs.current[current];
      const inSlide = slideRefs.current[index];

      if (!outSlide || !inSlide) {
        setCurrent(index);
        setIsAnimating(false);
        return;
      }

      const xOut = dir === "next" ? "-100%" : "100%";
      const xIn = dir === "next" ? "100%" : "-100%";

      // Set incoming slide visible and positioned
      gsap.set(inSlide, { x: xIn, zIndex: 2, opacity: 1 });
      gsap.set(outSlide, { zIndex: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(outSlide, { x: 0, zIndex: 0, opacity: 0 });
          gsap.set(inSlide, { x: 0, zIndex: 1 });
          setCurrent(index);
          setIsAnimating(false);
          animateContentIn(dir);
          startProgress();
        },
      });

      tl.to(outSlide, { x: xOut, duration: 0.75, ease: "power2.inOut" }, 0).to(
        inSlide,
        { x: 0, duration: 0.75, ease: "power2.inOut" },
        0
      );
    },
    [current, isAnimating, animateContentIn, startProgress]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo]);

  // ── Autoplay ──
  useEffect(() => {
    startProgress();
    autoplayRef.current = setInterval(next, 5000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [next, startProgress]);

  // Reset autoplay on manual nav
  const handleNav = (fn: () => void) => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    fn();
    autoplayRef.current = setInterval(next, 5000);
  };

  // ── Initial content animation ──
  useEffect(() => {
    animateContentIn("next");
    // Set all slides hidden except first
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { x: 0, opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full  flex flex-col">
      {/* ── Carousel ── */}
      <div className="relative min-h-screen  w-full overflow-hidden" style={{ height: "clamp(320px, 55vw, 580px)" }}>
        {/* Slides */}
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }}
          >
            {/* Background */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ background: slide.gradient }}
            />

            {/* Image (shown when provided) */}
            {slide.image ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            ) : (
              <PlaceholderScene index={i} />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
                <div
                  ref={i === current ? contentRef : undefined}
                  className="max-w-xl"
                >
                  <p className="text-white/80 text-sm sm:text-base mb-2 font-light tracking-wide">
                    {slide.eyebrow}
                  </p>
                  <h1 className="text-white font-bold leading-tight mb-6"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
                  >
                    {slide.heading}
                  </h1>
                  <Link
                    href={slide.ctaHref}
                    className="inline-block border-2 border-white text-white px-6 py-2.5 text-sm font-medium hover:bg-white hover:text-[#1a2e5a] transition-all duration-300 tracking-wide"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ── Prev / Next arrows ── */}
        <button
          onClick={() => handleNav(prev)}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-black/30 hover:bg-[#1a2e5a] border border-white/30 text-white transition-all duration-300 rounded-sm group"
        >
          <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={() => handleNav(next)}
          aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-black/30 hover:bg-[#1a2e5a] border border-white/30 text-white transition-all duration-300 rounded-sm group"
        >
          <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* ── Dot indicators ── */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleNav(() => goTo(i, i > current ? "next" : "prev"))}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-7 h-2.5 bg-[#4caf50]"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
          <div
            ref={progressRef}
            className="h-full bg-[#4caf50] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* ── Slide counter ── */}
        <div className="absolute top-5 right-5 z-20 text-white/70 text-xs font-mono tracking-widest select-none">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div
        ref={statsRef}
        className="w-full bg-white  border-t border-gray-100"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
            {stats.map((stat, i) => (
              <div
                key={stat.title}
                className="stat-item flex items-center gap-4 px-6 sm:px-8 py-6 sm:py-7 hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </div>

                {/* Text */}
                <div>
                  <p
                    className={`font-semibold text-sm sm:text-base ${
                      i === 1 ? "text-[#4caf50]" : "text-[#1a2e5a]"
                    }`}
                  >
                    {stat.title}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{stat.subtitle}</p>
                </div>

                {/* Hover accent line */}
                <div
                  className={`ml-auto w-0.5 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    i === 1 ? "bg-[#4caf50]" : "bg-[#1a2e5a]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
