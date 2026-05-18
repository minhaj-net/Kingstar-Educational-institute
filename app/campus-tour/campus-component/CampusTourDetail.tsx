"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Campus Tour Icon SVG ─────────────────────────────────────────────────────

function TourIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-14 h-14"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Person */}
      <circle cx="32" cy="14" r="7" />
      <path d="M20 36c0-6.627 5.373-12 12-12s12 5.373 12 12" />
      <path d="M26 36v14h12V36" />
      {/* Flag */}
      <line x1="44" y1="10" x2="44" y2="30" />
      <path d="M44 10 l10 5 -10 5" fill="white" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CampusTourDetail() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const breadRef   = useRef<HTMLDivElement>(null);
  const iconRef    = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Breadcrumb
      gsap.fromTo(
        breadRef.current,
        { y: -10, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );

      // Left green panel slides from left
      gsap.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Right image slides from right
      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Icon bounce in
      gsap.fromTo(
        iconRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)",
          scrollTrigger: { trigger: leftRef.current, start: "top 78%", toggleActions: "play none none none" },
        }
      );

      // Text children stagger
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out",
            scrollTrigger: { trigger: leftRef.current, start: "top 75%", toggleActions: "play none none none" },
          }
        );
      }

      // Image zoom-in
      gsap.fromTo(
        rightRef.current?.querySelector("img") ?? null,
        { scale: 1.06 },
        {
          scale: 1, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white" aria-label="Special Campus Tour">

      {/* ── Breadcrumb ── */}
      <div
        ref={breadRef}
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-5 pb-0 flex items-center gap-1.5 text-xs sm:text-sm"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="flex items-center gap-1 text-gray-400 hover:text-[#4caf50] transition-colors duration-200">
          <Home size={12} />
          <span>Home</span>
        </Link>
        <ChevronRight size={12} className="text-gray-300" />
        <span className="text-[#4caf50] font-medium">Campus Tour</span>
      </div>

      {/* ── Two-column: Green left + Image right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[360px] lg:min-h-[420px]">

        {/* ── LEFT: Green panel ── */}
        <div
          ref={leftRef}
          className="bg-[#4caf50] flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-12 lg:py-16"
          data-aos="fade-right"
        >
          {/* Icon */}
          <div ref={iconRef} className="mb-6 w-fit">
            <TourIcon />
          </div>

          {/* Text content */}
          <div ref={textRef} className="flex flex-col gap-4">
            {/* Title */}
            <h2
              className="text-white font-bold leading-tight"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)" }}
            >
              Special Campus Tour
            </h2>

            {/* Body */}
            <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-md">
              Campus on a tour designed for prospective graduate and professional
              students. You will see how our university like, facilities,
              students and life in this university. Meet our graduate admissions
              representative to learn more about our graduate programs and decide
              what it the best for you.
            </p>
          </div>
        </div>

        {/* ── RIGHT: Image ── */}
        <div
          ref={rightRef}
          className="relative overflow-hidden"
          style={{ minHeight: "320px" }}
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <Image
            src="/slide-3.jpg"
            alt="Kingster University campus colonnade"
            fill
            className="object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
}
