"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

export default function AlumniAbout() {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const readMoreRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Left heading slides from left
      gsap.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
        }
      );

      // Right content slides from right
      gsap.fromTo(rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
        }
      );

      // Right children stagger
      gsap.fromTo(
        rightRef.current?.querySelectorAll(".right-child") ?? [],
        { y: 22, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.14, ease: "power2.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Read More arrow hover
      if (readMoreRef.current) {
        const arrow = readMoreRef.current.querySelector(".arrow-icon");
        readMoreRef.current.addEventListener("mouseenter", () =>
          gsap.to(arrow, { x: 6, duration: 0.25, ease: "power2.out" })
        );
        readMoreRef.current.addEventListener("mouseleave", () =>
          gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.in" })
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "clamp(220px, 28vw, 340px)" }}
      aria-label="Kingster Alumni"
    >
      {/* ── Background: alumni / students in tech lab image ── */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=85"
          alt="Kingster Alumni – students collaborating"
          fill
          className="object-cover object-center"
        />
        {/* Dark navy overlay — matches image tone */}
        <div className="absolute inset-0 bg-[#0f1e3d]/78" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16 flex items-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start w-full">

          {/* ── Left: Green heading ── */}
          <div ref={leftRef} data-aos="fade-right">
            <h2
              className="text-[#4caf50] font-bold leading-tight"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
            >
              Kingster Alumni
            </h2>
          </div>

          {/* ── Right: Two paragraphs + Read More ── */}
          <div ref={rightRef} className="flex flex-col gap-5" data-aos="fade-left" data-aos-delay="100">

            {/* Lead paragraph */}
            <p className="right-child text-white/90 text-sm sm:text-base leading-relaxed">
              We are one of the largest, most diverse universities in the USA with over
              90,000 students in USA, and a further 30,000 studying across 180
              countries for Kingster University.
            </p>

            {/* Body paragraph */}
            <p className="right-child text-white/75 text-sm sm:text-base leading-relaxed">
              Kingster University was established by John Smith in 1920 for the public
              benefit and it is recognized globally. Throughout our great history,
              Kingster has offered access to a wide range of academic opportunities.
              As a world leader in higher education, the University has pioneered
              change in the sector.
            </p>

            {/* Read More */}
            <Link
              ref={readMoreRef}
              href="/about-us"
              className="right-child inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-[#4caf50] transition-colors duration-300 mt-1 w-fit"
            >
              Read More
              <ArrowRight size={15} className="arrow-icon transition-transform duration-300" />
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}
