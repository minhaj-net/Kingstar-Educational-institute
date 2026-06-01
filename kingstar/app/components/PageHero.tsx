"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  /** Small green eyebrow text above the heading */
  eyebrow?: string;
  /** Main page heading */
  title: string;
  /** Background image path from /public */
  image: string;
  /** Breadcrumb trail — last item is current page (no link) */
  breadcrumbs?: Breadcrumb[];
  /** Optional parallax intensity (default 30) */
  parallaxStrength?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PageHero({
  eyebrow,
  title,
  image,
  breadcrumbs,
  parallaxStrength = 30,
}: PageHeroProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
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
        gsap.set(bgRef.current, {
          y: progress * parallaxStrength,
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Entrance timeline ──
      const tl = gsap.timeline({ delay: 0.1 });

      // Background zoom-in
      tl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" }
      );

      // Eyebrow
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
          "-=0.5"
        );
      }

      // Title word-by-word split
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
          "-=0.3"
        );
      }

      // Breadcrumb
      if (breadRef.current) {
        tl.fromTo(
          breadRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
          "-=0.2"
        );
      }

      return () => window.removeEventListener("scroll", onScroll);
    }, sectionRef);

    return () => ctx.revert();
  }, [parallaxStrength]);

  // Split title into word spans for stagger animation
  const titleWords = title.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(200px, 28vw, 340px)" }}
      aria-label={title}
    >
      {/* ── Background image with parallax wrapper ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Gradient overlay: transparent left → dark right-bottom ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex items-end"
      >
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pb-8 sm:pb-10 flex flex-col gap-2">

          {/* Eyebrow */}
          {eyebrow && (
            <span
              ref={eyebrowRef}
              className="text-[#4caf50] text-xs sm:text-sm font-semibold tracking-widest uppercase"
            >
              {eyebrow}
            </span>
          )}

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-white font-bold leading-tight flex flex-wrap gap-x-3"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
          >
            {titleWords.map((word, i) => (
              <span key={i} className="word inline-block">
                {word}
              </span>
            ))}
          </h1>

          {/* Breadcrumb */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div
              ref={breadRef}
              className="flex items-center gap-1.5 flex-wrap mt-1"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="flex items-center gap-1 text-white/60 hover:text-white text-xs sm:text-sm transition-colors duration-200"
              >
                <Home size={12} />
                <span>Home</span>
              </Link>
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <span key={crumb.label} className="flex items-center gap-1.5">
                    <ChevronRight size={12} className="text-white/40" />
                    {isLast ? (
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors duration-200"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </span>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* ── Bottom green accent line ── */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#4caf50] via-[#4caf50]/60 to-transparent" />
    </section>
  );
}
