"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Bus, ParkingCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Dumbbell icon (lucide doesn't have it) ───────────────────────────────────

function DumbbellIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2"  y="13" width="4"  height="6" rx="1.5" />
      <rect x="26" y="13" width="4"  height="6" rx="1.5" />
      <rect x="6"  y="11" width="4"  height="10" rx="1.5" />
      <rect x="22" y="11" width="4"  height="10" rx="1.5" />
      <line x1="10" y1="16" x2="22" y2="16" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function UniversityLifeContent() {
  const sectionRef   = useRef<HTMLElement>(null);
  const leftRef      = useRef<HTMLDivElement>(null);
  const rightRef     = useRef<HTMLDivElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const greenCardRef = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Left column slides from left
      gsap.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Right column slides from right
      gsap.fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Left children stagger
      gsap.fromTo(
        leftRef.current?.querySelectorAll(".left-child") ?? [],
        { y: 22, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Divider draws from left
      gsap.fromTo(dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.6, ease: "power3.out", transformOrigin: "left",
          scrollTrigger: { trigger: dividerRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );

      // Green card bounces in
      gsap.fromTo(greenCardRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, ease: "back.out(1.4)",
          scrollTrigger: { trigger: greenCardRef.current, start: "top 85%", toggleActions: "play none none none" },
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

      // Right info items stagger
      gsap.fromTo(
        rightRef.current?.querySelectorAll(".info-item") ?? [],
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.14, ease: "power2.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white" aria-label="University Life Content">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ══════════════════════════════════════════
              LEFT COLUMN
          ══════════════════════════════════════════ */}
          <div ref={leftRef} className="flex flex-col gap-6" data-aos="fade-right">

            {/* Heading */}
            <h2
              className="left-child text-[#1a2e5a] font-bold leading-tight"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}
            >
              Event and Traditions
            </h2>

            {/* Green lead paragraph */}
            <p className="left-child text-[#4caf50] text-sm sm:text-base leading-relaxed font-medium">
              Far far away, behind the word mountains, far from the countries Vokalia and
              Consonantia, there live the blind texts. Separated they live in
            </p>

            {/* Body paragraph */}
            <p className="left-child text-gray-500 text-sm sm:text-base leading-relaxed">
              Separated they live in Bookmarksgrove right at the coast of the Semantics, a large
              language ocean. A small river named Duden flows by their place and supplies it with
              the necessary regelialia. It is a paradisematic country, in which roasted parts of
              sentences fly into your mouth. Even the all-powerful Pointing has no control about
              the blind texts it is an almost unorthographic life.
            </p>

            {/* Animated green divider */}
            <div
              ref={dividerRef}
              className="w-full h-0.5 bg-[#4caf50]"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />

            {/* Green card — Student Activities */}
            <div
              ref={greenCardRef}
              className="bg-[#4caf50] p-6 sm:p-8 flex flex-col gap-4 animate__animated"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* Dumbbell icon */}
              <div className="w-fit">
                <DumbbellIcon />
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-base sm:text-lg">
                Student Activities
              </h3>

              {/* Body */}
              <p className="text-white/90 text-sm leading-relaxed font-medium">
                Separated they live in Bookmarksgrove right at the coast of the Semantics, a large
                language ocean. A small river named Duden flows by their place and supplies it with
                the necessary regelialia. It is a paradisematic country
              </p>
            </div>

          </div>

          {/* ══════════════════════════════════════════
              RIGHT COLUMN
          ══════════════════════════════════════════ */}
          <div ref={rightRef} className="flex flex-col gap-8" data-aos="fade-left" data-aos-delay="100">

            {/* City / transport image */}
            <div
              ref={imgRef}
              className="relative w-full overflow-hidden rounded-sm shadow-md"
              style={{ height: "clamp(200px, 26vw, 300px)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80"
                alt="University campus transportation – city street"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Transportations */}
            <div className="info-item flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Bus size={28} strokeWidth={1.4} className="text-gray-600 flex-shrink-0" />
                <h3 className="text-[#1a2e5a] font-bold text-base sm:text-lg">
                  Transportations
                </h3>
              </div>

              <p className="text-gray-700 text-sm font-semibold leading-snug">
                There are many options to travel in the campus.
              </p>

              <p className="text-gray-500 text-sm leading-relaxed">
                There live the blind texts. Separated they live in Bookmarksgrove right at the
                coast of the Semantics, a large language ocean. A small river named Duden flows by
                their place and supplies it with the necessary regelialia. It is a paradise matic
                country, in which roasted parts of sentences fly into.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-100" />

            {/* Parking */}
            <div className="info-item flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <ParkingCircle size={28} strokeWidth={1.4} className="text-gray-600 flex-shrink-0" />
                <h3 className="text-[#1a2e5a] font-bold text-base sm:text-lg">
                  Parking
                </h3>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed">
                More than 1000 parking lots avilable in the west side of the compus.{" "}
                <strong className="text-gray-700">The parking is available 24 hours</strong>{" "}
                with 24hours security. We make sure that everything is under control.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
