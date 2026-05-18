"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

export default function ApplyHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const gradRef    = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });

    const ctx = gsap.context(() => {
      // ── Parallax on scroll ──
      const onScroll = () => {
        if (!bgRef.current || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        gsap.set(bgRef.current, { y: (-rect.top / (rect.height || 1)) * 30 });
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Entrance timeline ──
      const tl = gsap.timeline({ delay: 0.05 });

      // Background zoom-in — starts slightly zoomed, settles to normal
      tl.fromTo(
        bgRef.current,
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // Bottom gradient fades in
      tl.fromTo(
        gradRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.7"
      );

      // Eyebrow slides up
      tl.fromTo(
        eyebrowRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
        "-=0.35"
      );

      // Title words stagger
      const words = titleRef.current?.querySelectorAll(".word") ?? [];
      tl.fromTo(
        words,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
        "-=0.25"
      );

      return () => window.removeEventListener("scroll", onScroll);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText  = "Apply To Kingster";
  const titleWords = titleText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(200px, 28vw, 340px)" }}
      aria-label="Apply To Kingster"
    >
      {/* ── Background: slide-3.jpg ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/slide-3.jpg"
          alt="Apply to Kingster University"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Light warm overlay — image has a bright, slightly warm tone ── */}
      <div className="absolute inset-0 bg-black/15" />

      {/* ── Bottom gradient — dark band where text sits (matches image) ── */}
      <div
        ref={gradRef}
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
      />

      {/* ── Content — bottom-left aligned ── */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pb-7 sm:pb-9 flex flex-col gap-1.5">

          {/* Eyebrow */}
          <span
            ref={eyebrowRef}
            className="text-[#4caf50] text-xs sm:text-sm font-semibold tracking-widest"
          >
            Admission
          </span>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-white font-bold leading-tight flex flex-wrap gap-x-2.5"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)" }}
          >
            {titleWords.map((word, i) => (
              <span key={i} className="word inline-block">
                {word}
              </span>
            ))}
          </h1>

        </div>
      </div>

      {/* ── Bottom green accent line ── */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#4caf50] via-[#4caf50]/60 to-transparent" />
    </section>
  );
}
