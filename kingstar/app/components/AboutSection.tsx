"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Globe, GraduationCap, Building2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services: ServiceCard[] = [
  {
    icon: <BookOpen size={38} strokeWidth={1.3} />,
    title: "Education Services",
    description:
      "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized.",
    href: "/courses",
  },
  {
    icon: <Globe size={38} strokeWidth={1.3} />,
    title: "International Hubs",
    description:
      "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized.",
    href: "/about-us",
  },
  {
    icon: <GraduationCap size={38} strokeWidth={1.3} />,
    title: "Bachelor's and Master's",
    description:
      "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized.",
    href: "/courses",
  },
  {
    icon: <Building2 size={38} strokeWidth={1.3} />,
    title: "University Life",
    description:
      "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized.",
    href: "/university-life",
  },
];

// ─── Background: real students photo ─────────────────────────────────────────
// Image source: /public/students.jpg

// ─── Logo mark (small) ────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full border-2 border-white/60 flex items-center justify-center">
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <path
            d="M8 24V12a1 1 0 011-1h5a3 3 0 013 3v10M8 24h9M17 24V14"
            stroke="#c8a84b"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 14h3a1 1 0 011 1v9"
            stroke="#c8a84b"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M8 24h13" stroke="#c8a84b" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <span className="text-white/90 text-sm font-light tracking-widest uppercase">
        Kingster <span className="font-semibold">University</span>
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const readMoreRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // ── Top section: left col slides from left ──
      gsap.fromTo(
        leftColRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: topRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Top section: right col slides from right ──
      gsap.fromTo(
        rightColRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: topRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Service cards stagger up ──
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll(".service-card"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.13,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ── Read More arrow hover ──
      if (readMoreRef.current) {
        const arrow = readMoreRef.current.querySelector(".arrow-icon");
        readMoreRef.current.addEventListener("mouseenter", () => {
          gsap.to(arrow, { x: 6, duration: 0.25, ease: "power2.out" });
        });
        readMoreRef.current.addEventListener("mouseleave", () => {
          gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.in" });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full" aria-label="About Our University">

      {/* ══════════════════════════════════════════
          TOP BAND — dark navy with bg illustration
      ══════════════════════════════════════════ */}
      <div ref={topRef} className="relative overflow-hidden">
      {/* ── Background: students.jpg with dark overlay ── */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/students.jpg"
            alt="Kingster University students"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark navy overlay for text readability */}
          <div className="absolute inset-0 bg-[#0f1e3d]/70" />
        </div>

        {/* Content grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

            {/* ── Left column ── */}
            <div ref={leftColRef} className="flex flex-col gap-4">
              {/* Logo mark */}
              <LogoMark />

              {/* Section label */}
              <h2
                className="text-[#4caf50] font-bold leading-tight mt-1"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2rem)" }}
                data-aos="fade-right"
                data-aos-delay="100"
              >
                About Our University
              </h2>
            </div>

            {/* ── Right column ── */}
            <div ref={rightColRef} className="flex flex-col gap-5">
              {/* Lead paragraph */}
              <p
                className="text-white/90 text-base sm:text-lg leading-relaxed"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                We are one of the largest, most diverse universities in the USA
                with over 90,000 students in USA, and a further 30,000 studying
                across 180 countries for Kingster University.
              </p>

              {/* Body paragraph */}
              <p
                className="text-white/70 text-sm sm:text-base leading-relaxed"
                data-aos="fade-left"
                data-aos-delay="180"
              >
                Kingster University was established by John Smith in 1920 for
                the public benefit and it is recognized globally. Throughout our
                great history, Kingster has offered access to a wide range of
                academic opportunities. As a world leader in higher education,
                the University has pioneered change in the sector.
              </p>

              {/* Read More */}
              <Link
                ref={readMoreRef}
                href="/about-us"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-[#4caf50] transition-colors duration-300 mt-1 w-fit group"
                data-aos="fade-left"
                data-aos-delay="260"
              >
                Read More
                <ArrowRight
                  size={16}
                  className="arrow-icon transition-transform duration-300"
                />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM BAND — light grey service cards
      ══════════════════════════════════════════ */}
      <div className="bg-[#f4f6f9] border-t border-gray-200">
        <div
          ref={cardsRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="service-card flex flex-col gap-4 group"
                data-aos="fade-up"
                data-aos-delay={i * 90}
              >
                {/* Icon */}
                <div className="text-[#1a2e5a] group-hover:text-[#4caf50] transition-colors duration-300 group-hover:scale-110 transform origin-left">
                  {service.icon}
                </div>

                {/* Divider line that grows on hover */}
                <div className="w-10 h-0.5 bg-[#1a2e5a] group-hover:w-16 group-hover:bg-[#4caf50] transition-all duration-400 rounded-full" />

                {/* Title */}
                <h3 className="text-[#1a2e5a] font-bold text-base sm:text-lg leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Learn More */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-[#4caf50] text-sm font-semibold hover:gap-3 transition-all duration-300 mt-auto group/link"
                >
                  Learn More
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform duration-300"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
