"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const sources = [
  {
    title: "Kingsters' Scholarships",
    body: "Kingster University offers a variety of scholar ships and fellowships designed to help you and your family pay for university. Scholarships and grants are types of gift.",
    href: "#",
  },
  {
    title: "Federal Grant Programs",
    body: "Kingster University offers a variety of scholar ships and fellowships designed to help you and your family pay for university. Scholarships and grants are types of gift.",
    href: "#",
  },
  {
    title: "State Scholarships",
    body: "Kingster University offers a variety of scholar ships and fellowships designed to help you and your family pay for university. Scholarships and grants are types of gift.",
    href: "#",
  },
];

const requirements = [
  "You are a full-time student (at least 12 points).",
  "You applied for financial aid on time.",
  "You are meeting the Satisfactory Academic Progress standards.",
  "You have approximately the same amount of financial need that you had in prior years.",
];

// ─── Scholarship icon SVG ─────────────────────────────────────────────────────

function ScholarshipIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="#4caf50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Graduation cap */}
      <path d="M24 8L4 18l20 10 20-10-20-10z" />
      <path d="M4 18v12" />
      <path d="M12 22v10a12 12 0 0024 0V22" />
      {/* Star/award */}
      <circle cx="38" cy="36" r="7" />
      <path d="M38 32v4l3 2" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ScholarshipsContent() {
  const sectionRef    = useRef<HTMLElement>(null);
  const sourcesRef    = useRef<HTMLDivElement>(null);
  const leftColRef    = useRef<HTMLDivElement>(null);
  const rightColRef   = useRef<HTMLDivElement>(null);
  const reqListRef    = useRef<HTMLUListElement>(null);
  const dividerRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Sources cards stagger
      gsap.fromTo(
        sourcesRef.current?.querySelectorAll(".source-card") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.13, ease: "power3.out",
          scrollTrigger: { trigger: sourcesRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Left column
      gsap.fromTo(leftColRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: leftColRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Right column
      gsap.fromTo(rightColRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: rightColRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Requirements list items stagger
      gsap.fromTo(
        reqListRef.current?.querySelectorAll("li") ?? [],
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.45, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: reqListRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Divider line draws
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.7, ease: "power3.out", transformOrigin: "left",
          scrollTrigger: { trigger: dividerRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white" aria-label="Scholarships Content">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">

        {/* ══════════════════════════════════════════
            TOP: Scholarship Sources — icon + heading + 3 cards
        ══════════════════════════════════════════ */}
        <div className="mb-14">
          {/* Icon + heading */}
          <div className="flex items-center gap-3 mb-8" data-aos="fade-up">
            <ScholarshipIcon />
            <h2 className="text-[#1a2e5a] font-bold" style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}>
              Scholarships Sources
            </h2>
          </div>

          {/* 3 source cards */}
          <div ref={sourcesRef} className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
            {sources.map((src, i) => (
              <div
                key={src.title}
                className="source-card flex flex-col gap-3 group"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <h3 className="text-[#4caf50] font-bold text-sm sm:text-base hover:text-[#1a2e5a] transition-colors duration-200 cursor-pointer">
                  {src.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{src.body}</p>
                <Link
                  href={src.href}
                  className="inline-flex items-center gap-1.5 text-[#4caf50] text-sm font-semibold hover:gap-3 transition-all duration-200 group/link"
                >
                  Read More
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BOTTOM: Requirements (left) + Featured Student (right)
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Requirements + Guidance ── */}
          <div ref={leftColRef} className="flex flex-col gap-8" data-aos="fade-right">

            {/* Requirements */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[#1a2e5a] font-bold" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}>
                Requirements
              </h3>

              {/* Green lead text */}
              <p className="text-[#4caf50] text-sm sm:text-base leading-relaxed font-medium">
                Far far away, behind the word mountains, far from the countries Vokalia and
                Consonantia, there live the blind texts. Separated they live in
              </p>

              {/* Checklist */}
              <ul ref={reqListRef} className="flex flex-col gap-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-[#4caf50] flex-shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-gray-600 text-sm leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Animated divider */}
            <div
              ref={dividerRef}
              className="w-full h-px bg-[#4caf50]"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />

            {/* Guidance and Advice */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[#1a2e5a] font-bold" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}>
                Guidance and Advice
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Separated they live in Bookmarksgrove right at the coast of the Semantics, a large
                language ocean. A small river named Duden flows by their place and supplies it with
                the necessary regelialia. It is a paradisematic country, in which roasted parts of
                sentences fly into your mouth. Even the all-powerful Pointing has no control about
                the blind texts it is an almost unorthographic life.
              </p>
            </div>

          </div>

          {/* ── RIGHT: Featured Student card ── */}
          <div
            ref={rightColRef}
            className="bg-[#f4f6f9] rounded-sm overflow-hidden"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            {/* Student image */}
            <div className="relative w-full overflow-hidden" style={{ height: "clamp(220px, 28vw, 320px)" }}>
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80"
                alt="Featured scholarship student"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Card content */}
            <div className="px-6 sm:px-8 py-6 flex flex-col gap-3">
              {/* Green top border accent */}
              <div className="w-10 h-0.5 bg-[#4caf50] rounded-full" />

              <h3 className="text-[#1a2e5a] font-bold text-base sm:text-lg">
                Featured Student (Scholarship)
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                Far far away, behind the word mountains, far.there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics, a large language
                ocean. A small river named Duden flows by their place and supplies it with the
                necessary regelialia. It is a paradisematic.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
