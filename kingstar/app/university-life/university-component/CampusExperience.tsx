"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

export default function CampusExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 40 });

    const ctx = gsap.context(() => {
      // Overlay darkens slightly on scroll (parallax depth feel)
      gsap.fromTo(overlayRef.current,
        { opacity: 0.6 },
        {
          opacity: 0.75,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Title slides from left
      gsap.fromTo(titleRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Description slides from right
      gsap.fromTo(descRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "clamp(140px, 18vw, 220px)",
        // ── Fixed background image (CSS parallax) ──
        backgroundImage: "url('/slide-3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
      aria-label="The Campus Experience"
    >
      {/* ── Dark navy overlay ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#0f1e3d]"
        style={{ opacity: 0.72 }}
      />

      {/* ── Content — vertically centered ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-14 flex items-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">

          {/* Left: Title */}
          <h2
            ref={titleRef}
            className="text-white font-bold leading-tight"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)" }}
            data-aos="fade-right"
          >
            The Campus Experience
          </h2>

          {/* Right: Description */}
          <p
            ref={descRef}
            className="text-white/85 text-sm sm:text-base leading-relaxed"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            Kingster University was established by John Smith in 1920 for the public benefit and
            it is recognized globally. Throughout our great history, Kingster has offered access
            to a wide range of academic opportunities. As a world leader in higher education,
            the University has pioneered change in the sector.
          </p>

        </div>
      </div>
    </section>
  );
}
