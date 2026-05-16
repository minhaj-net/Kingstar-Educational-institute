"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

export default function ContactHero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);

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

      tl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" }
      );

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
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.04, ease: "power3.out" },
        "-=0.4"
      );

      // Subtitle
      tl.fromTo(
        subRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
        "-=0.2"
      );

      return () => window.removeEventListener("scroll", onScroll);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split "CONTACT US" into individual letter spans for stagger
  const titleText = "CONTACT US";

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(160px, 22vw, 280px)" }}
      aria-label="Contact Us"
    >
      {/* ── Background: slide-3.jpg ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/slide-3.jpg"
          alt="Contact Us background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Dark navy overlay ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#0f1e3d]/72"
      />

      {/* ── Subtle vignette ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25 pointer-events-none" />

      {/* ── Content — centered ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 px-6 text-center">

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-white font-extrabold tracking-widest flex flex-wrap justify-center gap-x-1"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
          >
            {titleText.split("").map((char, i) =>
              char === " " ? (
                <span key={i} className="letter inline-block w-3 sm:w-5" aria-hidden="true" />
              ) : (
                <span key={i} className="letter inline-block">
                  {char}
                </span>
              )
            )}
          </h1>

          {/* Subtitle */}
          <p
            ref={subRef}
            className="text-white/70 text-xs sm:text-sm tracking-[0.25em] uppercase font-medium"
          >
            GET INTOUCH
          </p>

        </div>
      </div>

      {/* ── Bottom green accent line ── */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#4caf50] to-transparent" />
    </section>
  );
}
