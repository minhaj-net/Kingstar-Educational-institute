"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Building2, GraduationCap, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeatureBlock {
  icon: React.ReactNode;
  title: string;
  body: string;
  /** Path from /public — replace with your own images */
  image: string;
  /** text-left = text left, image right | text-right = image left, text right */
  layout: "text-left" | "text-right";
}

interface Partner {
  name: string;
  tagline?: string;
  style: "normal" | "italic" | "spaced";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features: FeatureBlock[] = [
  {
    icon: <Building2 size={40} strokeWidth={1.2} />,
    title: "Special Campus Tour",
    body: "Campus is a tour designed for prospective graduate and professional students. You will see how our university life, facilities, student and life in this university. Meet our graduate admissions representative to learn more about our graduate programme and decide what is the best for you.",
    image: "/slide-1.jpg",
    layout: "text-left",
  },
  {
    icon: <GraduationCap size={40} strokeWidth={1.2} />,
    title: "Graduation",
    body: "Campus is a tour designed for prospective graduate and professional students. You will see how our university life, facilities, student and life in this university. Meet our graduate admissions representative to learn more about our graduate programme and decide what is the best for you.",
    image: "/slide-2.jpg",
    layout: "text-right",
  },
  {
    icon: <Users size={40} strokeWidth={1.2} />,
    title: "Powerful Alumni",
    body: "Campus is a tour designed for prospective graduate and professional students. You will see how our university life, facilities, student and life in this university. Meet our graduate admissions representative to learn more about our graduate programme and decide what is the best for you.",
    image: "/slide-4.jpg",
    layout: "text-left",
  },
];

const partners: Partner[] = [
  { name: "EUROPA\nEXPRESS", style: "spaced" },
  { name: "KEY VISION", tagline: "🔑", style: "normal" },
  { name: "Azis Bank",   style: "italic" },
  { name: "Credit\nAngelic", tagline: "Ↄ", style: "normal" },
  { name: "Z | A | B",  style: "spaced" },
];

// ─── Single Feature Block ─────────────────────────────────────────────────────

function FeatureRow({ block, index }: { block: FeatureBlock; index: number }) {
  const rowRef   = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isLeft = block.layout === "text-left";

      gsap.fromTo(
        textRef.current,
        { x: isLeft ? -50 : 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        imgRef.current,
        { x: isLeft ? 50 : -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image subtle zoom on scroll
      gsap.fromTo(
        imgRef.current?.querySelector("img") ?? imgRef.current,
        { scale: 1.06 },
        {
          scale: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, rowRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const textCol = (
    <div
      ref={textRef}
      className="flex flex-col gap-4 justify-center py-6 lg:py-0"
      data-aos={block.layout === "text-left" ? "fade-right" : "fade-left"}
      data-aos-delay={index * 80}
    >
      {/* Icon */}
      <div className="text-[#1a2e5a] w-fit">
        {block.icon}
      </div>

      {/* Green divider */}
      <div className="w-8 h-0.5 bg-[#4caf50] rounded-full" />

      {/* Title */}
      <h3
        className="text-[#1a2e5a] font-bold leading-snug"
        style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
      >
        {block.title}
      </h3>

      {/* Body */}
      <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
        {block.body}
      </p>
    </div>
  );

  const imgCol = (
    <div
      ref={imgRef}
      className="relative overflow-hidden rounded-sm shadow-md"
      style={{ minHeight: "clamp(200px, 28vw, 320px)" }}
      data-aos={block.layout === "text-left" ? "fade-left" : "fade-right"}
      data-aos-delay={index * 80 + 80}
    >
      <Image
        src={block.image}
        alt={block.title}
        fill
        className="object-cover object-center hover:scale-105 transition-transform duration-700"
      />
    </div>
  );

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
    >
      {block.layout === "text-left" ? (
        <>{textCol}{imgCol}</>
      ) : (
        <>{imgCol}{textCol}</>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AboutFeaturesSection() {
  const partnersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        partnersRef.current?.querySelectorAll(".partner-item") ?? [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: partnersRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, partnersRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full" aria-label="About Features">

      {/* ══════════════════════════════════════════
          FEATURE BLOCKS — alternating layout
      ══════════════════════════════════════════ */}
      <div className="w-full bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16 lg:py-20">
          <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
            {features.map((block, i) => (
              <FeatureRow key={block.title} block={block} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PARTNERS BAR — dark bottom
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
