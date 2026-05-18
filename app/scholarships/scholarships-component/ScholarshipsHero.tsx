"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

export default function ScholarshipsHero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const lineRef     = useRef<HTMLSpanElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);

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

      // Background zoom-in — bright image, very light overlay
      tl.fromTo(
        bgRef.current,
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      // Overlay fade
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      );

      // Title words stagger
      const words = titleRef.current?.querySelectorAll(".word") ?? [];
      tl.fromTo(
        words,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      );

      // Green underline draws from left
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: "power3.out", transformOrigin: "left" },
        "-=0.2"
      );

      // Description slides up
      tl.fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
        "-=0.3"
      );

      return () => window.removeEventListener("scroll", onScroll);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText  = "Scholarships";
  const titleWords = titleText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(280px, 40vw, 520px)" }}
      aria-label="Scholarships"
    >
      {/* ── Background: provided ImgBB image ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      >
        <Image
          src="https://i.ibb.co.com/JR2df94G/1d618998f3781f383ecd0bb887914ed2.jpg"
          alt="Kingster University Scholarships – graduating students"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Very subtle dark overlay — image stays bright ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/20"
      />

      {/* ── Bottom gradient for text readability ── */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />

      {/* ── Content — bottom, split left title / right description ── */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pb-8 sm:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end">

            {/* Left: Title + green underline */}
            <div className="flex flex-col gap-2">
              <h1
                ref={titleRef}
                className="text-white font-bold leading-tight flex flex-wrap gap-x-2"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                {titleWords.map((word, i) => (
                  <span key={i} className="word inline-block">{word}</span>
                ))}
              </h1>
              {/* Green underline */}
              <span
                ref={lineRef}
                className="block h-0.5 bg-[#4caf50] w-32"
                style={{ transform: "scaleX(0)", transformOrigin: "left" }}
              />
            </div>

            {/* Right: Description paragraph */}
            <p
              ref={descRef}
              className="text-white/90 text-sm sm:text-base leading-relaxed max-w-lg"
            >
              Kingster University offers a variety of scholarships and fellowships
              designed to help you and your family pay for university. Scholarships
              and grants are types of gift aid that do not have to be repaid. They
              may take the form of University scholarships, federal or state grants,
              or outside scholarships.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
