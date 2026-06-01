"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Partners data ────────────────────────────────────────────────────────────

const partners = [
  { name: "EUROPA\nEXPRESS", style: "spaced" },
  { name: "KEY VISION",      tagline: "🔑", style: "normal" },
  { name: "Azis Bank",       style: "italic" },
  { name: "Credit\nAngelic", tagline: "Ↄ",  style: "normal" },
  { name: "Z | A | B",       style: "spaced" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AthleticsTestimonial() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const quoteRef    = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Image slides from left
      gsap.fromTo(imgRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Quote panel slides from right
      gsap.fromTo(quoteRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Quote mark bounces in
      gsap.fromTo(quoteMarkRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)",
          scrollTrigger: { trigger: quoteRef.current, start: "top 78%", toggleActions: "play none none none" },
        }
      );

      // Quote text children stagger
      gsap.fromTo(
        quoteRef.current?.querySelectorAll(".quote-child") ?? [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 78%", toggleActions: "play none none none" },
        }
      );

      // Image zoom-in
      gsap.fromTo(
        imgRef.current?.querySelector("img") ?? null,
        { scale: 1.06 },
        {
          scale: 1, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: imgRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Partners stagger
      gsap.fromTo(
        partnersRef.current?.querySelectorAll(".partner-item") ?? [],
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.45, stagger: 0.09, ease: "power2.out",
          scrollTrigger: { trigger: partnersRef.current, start: "top 90%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full" aria-label="Athletics Testimonial and Partners">

      {/* ══════════════════════════════════════════
          TOP: Image (left) + Quote (right)
      ══════════════════════════════════════════ */}
      <div className="w-full bg-[#f4f6f9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[280px] lg:min-h-[320px]">

            {/* ── Left: ImgBB athletics image ── */}
            <div
              ref={imgRef}
              className="relative overflow-hidden"
              style={{ minHeight: "260px" }}
              data-aos="fade-right"
            >
              <Image
                src="https://i.ibb.co.com/prk6qdSw/1e4c7d9e777762eb4151a2bebe5497d0.jpg"
                alt="Kingster University Athletics – student training"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* ── Right: Testimonial quote ── */}
            <div
              ref={quoteRef}
              className="flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-10 lg:py-12 bg-[#f4f6f9]"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              {/* Large green quote mark */}
              <span
                ref={quoteMarkRef}
                className="text-[#4caf50] font-serif leading-none mb-4 select-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1 }}
                aria-hidden="true"
              >
                &#8220;
              </span>

              {/* Quote text */}
              <blockquote className="flex flex-col gap-4">
                <p
                  className="quote-child text-[#1a2e5a] font-semibold text-sm sm:text-base leading-relaxed max-w-md"
                >
                  Our goal is to be at the heart of the financial services industry as businesses
                  expand across.
                </p>

                {/* Attribution */}
                <footer className="quote-child flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-semibold text-[#1a2e5a]">John Smith</span>
                  <span className="text-gray-300">/</span>
                  <span>CEO Of Financity</span>
                </footer>
              </blockquote>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM: Partners bar — dark navy
      ══════════════════════════════════════════ */}
      <div className="w-full bg-[#1a2232] border-t border-white/5">
        <div
          ref={partnersRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-7"
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 sm:gap-4">
            {partners.map((p, i) => (
              <div
                key={i}
                className="partner-item flex items-center gap-2 cursor-pointer group"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                {p.tagline && (
                  <span className="text-white/40 group-hover:text-white/70 text-lg font-bold transition-colors duration-200 leading-none">
                    {p.tagline}
                  </span>
                )}
                <span
                  className={`text-white/40 group-hover:text-white/80 transition-colors duration-200 leading-tight whitespace-pre-line text-center
                    ${p.style === "italic"  ? "italic font-semibold text-sm sm:text-base" : ""}
                    ${p.style === "spaced"  ? "tracking-[0.18em] text-xs sm:text-sm font-semibold uppercase" : ""}
                    ${p.style === "normal"  ? "font-semibold text-sm sm:text-base" : ""}
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
