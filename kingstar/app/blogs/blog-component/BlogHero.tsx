"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlogHero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLSpanElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const breadRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });

    const ctx = gsap.context(() => {

      // ── Parallax on scroll ──
      const onScroll = () => {
        if (!bgRef.current || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const progress = -rect.top / (rect.height || 1);
        gsap.set(bgRef.current, { y: progress * 28 });
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Entrance timeline ──
      const tl = gsap.timeline({ delay: 0.05 });

      // Background zoom-in
      tl.fromTo(
        bgRef.current,
        { scale: 1.07, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" }
      );

      // Overlay fade
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      );

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      );

      // Title words stagger
      const words = titleRef.current?.querySelectorAll(".word") ?? [];
      tl.fromTo(
        words,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" },
        "-=0.3"
      );

      // Breadcrumb
      tl.fromTo(
        breadRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );

      return () => window.removeEventListener("scroll", onScroll);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = "Blog Full Right Sidebar With Frame";
  const titleWords = titleText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(160px, 22vw, 280px)" }}
      aria-label="Blog – Full Right Sidebar With Frame"
    >
      {/* ── Background: slide-3.jpg ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/slide-3.jpg"
          alt="Blog hero background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Dark navy overlay (matches image tone) ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#0f1e3d]/78"
      />

      {/* ── Subtle vignette edges ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />

      {/* ── Content — bottom-left aligned ── */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pb-7 sm:pb-9 flex flex-col gap-2">

          {/* Eyebrow */}
          <span
            ref={eyebrowRef}
            className="text-[#4caf50] text-xs sm:text-sm font-semibold tracking-widest uppercase animate__animated"
          >
            Caption aligned here
          </span>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-white font-bold leading-tight flex flex-wrap gap-x-2.5"
            style={{ fontSize: "clamp(1.3rem, 2.8vw, 2.2rem)" }}
          >
            {titleWords.map((word, i) => (
              <span key={i} className="word inline-block">
                {word}
              </span>
            ))}
          </h1>

          {/* Breadcrumb */}
          <div
            ref={breadRef}
            className="flex items-center gap-1.5 flex-wrap mt-0.5"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="flex items-center gap-1 text-white/55 hover:text-white text-xs sm:text-sm transition-colors duration-200"
            >
              <Home size={11} />
              <span>Home</span>
            </Link>
            <ChevronRight size={11} className="text-white/35" />
            <span className="text-white text-xs sm:text-sm font-medium">
              Blog
            </span>
          </div>

        </div>
      </div>

      {/* ── Bottom green accent line ── */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#4caf50] via-[#4caf50]/50 to-transparent" />
    </section>
  );
}
