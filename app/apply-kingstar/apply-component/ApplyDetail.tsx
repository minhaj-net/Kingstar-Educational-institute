"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

export default function ApplyDetail() {
  const sectionRef  = useRef<HTMLElement>(null);
  const breadRef    = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const lineRef     = useRef<HTMLSpanElement>(null);
  const col1Ref     = useRef<HTMLDivElement>(null);
  const col2Ref     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Breadcrumb fades in
      gsap.fromTo(
        breadRef.current,
        { y: -10, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Heading slides up
      gsap.fromTo(
        headingRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Underline draws from left
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.6, ease: "power3.out", transformOrigin: "left",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Two columns stagger
      gsap.fromTo(
        [col1Ref.current, col2Ref.current],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: "power2.out",
          scrollTrigger: {
            trigger: col1Ref.current,
            start: "top 82%",
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
      className="w-full bg-white"
      aria-label="Detail About How To Apply"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-14 sm:pb-16">

        {/* ── Breadcrumb ── */}
        <div
          ref={breadRef}
          className="flex items-center gap-1.5 flex-wrap mb-8 text-xs sm:text-sm"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-400 hover:text-[#4caf50] transition-colors duration-200"
          >
            <Home size={12} />
            <span>Home</span>
          </Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-[#4caf50] font-medium">Apply To Kingster</span>
        </div>

        {/* ── Heading ── */}
        <div className="mb-8" data-aos="fade-up">
          <h2
            ref={headingRef}
            className="text-[#1a2e5a] font-bold leading-tight inline-block"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)" }}
          >
            Detail About How To Apply
          </h2>
          {/* Animated underline */}
          <span
            ref={lineRef}
            className="block h-0.5 bg-[#4caf50] mt-2 w-full"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          />
        </div>

        {/* ── Two-column text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

          {/* Column 1 */}
          <div
            ref={col1Ref}
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              If you would like to study in the university in the heart of the
              city that focus on chaning the world for better to morrow,
              you&apos;re choosin the right place. We do not use special
              formulas to select students. We look at every single
              applicant&apos;s application, academic and personal, to select
              students who suit to our community with a full range of
              backgrounds. If you would like to study in the university in the
              heart of the city.
            </p>
          </div>

          {/* Column 2 */}
          <div
            ref={col2Ref}
            data-aos="fade-left"
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
    </section>
  );
}
