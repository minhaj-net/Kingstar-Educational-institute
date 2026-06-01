"use client";

import { useEffect, useRef } from "react";
import { FileText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

export default function AthleticsStory() {
  const sectionRef  = useRef<HTMLElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const btnRef      = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Top green divider draws from left
      gsap.fromTo(dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.7, ease: "power3.out", transformOrigin: "left",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );

      // Left column slides from left
      gsap.fromTo(leftRef.current,
        { x: -45, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Right column slides from right
      gsap.fromTo(rightRef.current,
        { x: 45, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Left children stagger
      gsap.fromTo(
        leftRef.current?.querySelectorAll(".left-child") ?? [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Right children stagger
      gsap.fromTo(
        rightRef.current?.querySelectorAll(".right-child") ?? [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Button hover
      if (btnRef.current) {
        btnRef.current.addEventListener("mouseenter", () =>
          gsap.to(btnRef.current, { scale: 1.04, duration: 0.18, ease: "power2.out" })
        );
        btnRef.current.addEventListener("mouseleave", () =>
          gsap.to(btnRef.current, { scale: 1, duration: 0.18, ease: "power2.in" })
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white" aria-label="KU Team Story and How To Participate">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">

        {/* ── Top green divider line ── */}
        <div
          ref={dividerRef}
          className="w-full h-0.5 bg-[#4caf50] mb-10"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── LEFT: KU Team Has A Long Story ── */}
          <div ref={leftRef} className="flex flex-col gap-5" data-aos="fade-right">

            {/* Heading */}
            <h2
              className="left-child text-[#1a2e5a] font-bold leading-tight"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}
            >
              KU Team Has A Long Story
            </h2>

            {/* Green lead paragraph */}
            <p className="left-child text-[#4caf50] text-sm sm:text-base leading-relaxed font-medium">
              Far far away, behind the word mountains, far from the countries Vokalia and
              Consonantia, there live the blind texts. Separated they live in
            </p>

            {/* Body paragraph */}
            <p className="left-child text-gray-500 text-sm sm:text-base leading-relaxed">
              Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small
              river named Duden flows by their place and supplies it with the necessary regelialia.
              It is a paradisematic country, in which roasted parts of sentences fly into your
              mouth. Even the all-powerful Pointing has no control about the blind texts it is an
              almost unorthographic life One day however a small line of blind text by the name of
              Lorem Ipsum decided to leave for the far World of Grammar.
            </p>

          </div>

          {/* ── RIGHT: How To Participate ── */}
          <div ref={rightRef} className="flex flex-col gap-5" data-aos="fade-left" data-aos-delay="100">

            {/* Heading */}
            <h2
              className="right-child text-[#1a2e5a] font-bold leading-tight"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}
            >
              How To Participate?
            </h2>

            {/* Body paragraph */}
            <p className="right-child text-gray-500 text-sm sm:text-base leading-relaxed">
              Separated they live in Bookmarksgrove right at the coast of the Semantics, a large
              language ocean. A small river named Duden flows by their place and supplies it with
              the necessary regelialia. It is a paradisematic country, in which roasted parts of
              sentences fly into your mouth. Even the all-powerful Pointing has no control about
              the blind texts it is an almost unorthographic life.
            </p>

            {/* CTA Button */}
            <div className="right-child mt-2">
              <a
                ref={btnRef}
                href="#"
                className="inline-flex items-center gap-2.5 bg-[#4caf50] hover:bg-[#43a047] text-white font-semibold text-sm px-6 py-3 transition-colors duration-300 rounded-sm animate__animated animate__fadeInUp"
              >
                Athletics Guide Book
                <FileText size={16} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
