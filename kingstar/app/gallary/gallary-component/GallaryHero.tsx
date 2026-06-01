"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

export default function GallaryHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });

    const ctx = gsap.context(() => {
      // ── Parallax on scroll ──
      const onScroll = () => {
        if (!bgRef.current || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        gsap.set(bgRef.current, { y: (-rect.top / (rect.height || 1)) * 25 });
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Entrance timeline ──
      const tl = gsap.timeline({ delay: 0.05 });

      // Background zoom-in
      tl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" }
      );

      // Overlay fade
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.8"
      );

      // Title letters stagger
      const letters = titleRef.current?.querySelectorAll(".letter") ?? [];
      tl.fromTo(
        letters,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out" },
        "-=0.35"
      );

      return () => window.removeEventListener("scroll", onScroll);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = "Gallery";

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(130px, 18vw, 220px)" }}
      aria-label="Gallery"
    >
      {/* ── Background: slide-3.jpg ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/slide-3.jpg"
          alt="Gallery hero background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Deep navy overlay — matches image ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#0a1628]/82"
      />

      {/* ── Subtle vignette ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30 pointer-events-none" />

      {/* ── Content — perfectly centered ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          ref={titleRef}
          className="text-white font-bold tracking-wide flex"
          style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)" }}
        >
          {titleText.split("").map((char, i) => (
            <span key={i} className="letter inline-block">
              {char}
            </span>
          ))}
        </h1>
      </div>

      {/* ── Bottom green accent line ── */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#4caf50] to-transparent" />
    </section>
  );
}
