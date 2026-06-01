"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BookOpen, Building2, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface Pillar {
  icon: React.ReactNode;
  title: string;
  body: string;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const pillars: Pillar[] = [
  {
    icon: <BookOpen size={36} strokeWidth={1.3} />,
    title: "Our Philosophy",
    body: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence.",
    color: "text-[#4caf50]",
  },
  {
    icon: <Building2 size={36} strokeWidth={1.3} />,
    title: "Kingster's Principle",
    body: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence.",
    color: "text-[#4caf50]",
  },
  {
    icon: <Star size={36} strokeWidth={1.3} />,
    title: "Key Of Success",
    body: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence.",
    color: "text-[#4caf50]",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AboutHistorySection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const lineRef      = useRef<HTMLSpanElement>(null);
  const col1Ref      = useRef<HTMLDivElement>(null);
  const col2Ref      = useRef<HTMLDivElement>(null);
  const bottomRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {

      // ── Heading underline draw ──
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.out",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Heading slides up ──
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Text columns stagger ──
      gsap.fromTo(
        [col1Ref.current, col2Ref.current],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: {
            trigger: col1Ref.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Pillar cards stagger up ──
      gsap.fromTo(
        bottomRef.current?.querySelectorAll(".pillar-card") ?? [],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: "power3.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Pillar icon hover bounce ──
      bottomRef.current?.querySelectorAll(".pillar-icon").forEach((icon) => {
        const el = icon as HTMLElement;
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { y: -6, duration: 0.25, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { y: 0, duration: 0.3, ease: "bounce.out" });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full" aria-label="Kingster's History">

      {/* ══════════════════════════════════════════
          TOP BAND — white, History text
      ══════════════════════════════════════════ */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">

            {/* ── Left: Heading ── */}
            <div className="lg:col-span-1 flex flex-col gap-3">
              <div className="relative inline-block">
                <h2
                  ref={headingRef}
                  className="text-[#1a2e5a] font-bold leading-tight"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                  data-aos="fade-right"
                >
                  Kingster&apos;s History
                </h2>
                {/* Animated green underline */}
                <span
                  ref={lineRef}
                  className="block h-0.5 bg-[#4caf50] mt-2 w-full"
                  style={{ transform: "scaleX(0)", transformOrigin: "left" }}
                />
              </div>
            </div>

            {/* ── Center: First paragraph ── */}
            <div
              ref={col1Ref}
              className="lg:col-span-1"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                If you would like to study in the university in the heart of the
                city that focus on chaning the world for better to morrow,
                you&apos;re choosin the right place. We do not use special
                formulas to select students. We look at every single
                applicant&apos;s application, academic and personal, to select
                students who suit to our community with a full range of
                backgrounds. If you would like to study
              </p>
            </div>

            {/* ── Right: Second paragraph ── */}
            <div
              ref={col2Ref}
              className="lg:col-span-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                If you would like to study in the university in the heart of the
                city that focus on chaning the world for better to morrow,
                you&apos;re choosin the right place. We do not use special
                formulas to select students. We look at every single
                applicant&apos;s application, academic and personal, to select
                students who suit to our community.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM BAND — dark navy + slide-3 bg + 3 pillars
      ══════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden">

        {/* Background: slide-3.jpg */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/slide-3.jpg"
            alt="Kingster University campus"
            fill
            className="object-cover object-center"
          />
          {/* Dark navy overlay */}
          <div className="absolute inset-0 bg-[#0f1e3d]/82" />
        </div>

        {/* Pillar cards */}
        <div
          ref={bottomRef}
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="pillar-card flex flex-col gap-4 group"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                {/* Icon */}
                <div
                  className={`pillar-icon ${pillar.color} w-fit transition-colors duration-300`}
                >
                  {pillar.icon}
                </div>

                {/* Green divider */}
                <div className="w-8 h-0.5 bg-[#4caf50] group-hover:w-14 transition-all duration-400 rounded-full" />

                {/* Title */}
                <h3 className={`font-bold text-base sm:text-lg ${pillar.color}`}>
                  {pillar.title}
                </h3>

                {/* Body */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
