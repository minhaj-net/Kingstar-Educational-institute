"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);






// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdmissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const textItemsRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 80 });

    const ctx = gsap.context(() => {
      // Left image panel slides in from left
      gsap.fromTo(
        leftRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Right content slides in from right
      gsap.fromTo(
        rightRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stagger text children
      if (textItemsRef.current) {
        gsap.fromTo(
          textItemsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Button pulse on hover via GSAP
      if (btnRef.current) {
        btnRef.current.addEventListener("mouseenter", () => {
          gsap.to(btnRef.current, { scale: 1.05, duration: 0.2, ease: "power1.out" });
        });
        btnRef.current.addEventListener("mouseleave", () => {
          gsap.to(btnRef.current, { scale: 1, duration: 0.2, ease: "power1.in" });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto"
      aria-label="Apply for Admission"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:min-h-[480px]">

        {/* ── Left: Photo panel ── */}
        <div
          ref={leftRef}
          className="relative overflow-hidden bg-[#c8a97a]"
          style={{ minHeight: "320px" }}
          data-aos="fade-right"
        >
         
            <Image
              src="/professor.jpg"
              alt="Professor in lecture hall"
              fill
              className="object-cover"
              priority
            />
         
          {/* <PlaceholderLeft /> */}

          {/* Subtle right-edge gradient blending into right panel */}
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-[#1a2e5a]/30 hidden lg:block" />
        </div>

        {/* ── Right: Content panel ── */}
        <div
          ref={rightRef}
          className="relative bg-[#1a2e5a] flex items-center overflow-hidden"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          {/* Background building illustration */}
           <Image
              src="/slide-4.jpg"
              alt="Professor in lecture hall"
              fill
              className="object-cover"
              priority
            />

          {/* Content */}
          <div
            ref={textItemsRef}
            className="relative z-10 px-8 sm:px-12 lg:px-14 py-12 lg:py-16 flex flex-col gap-5 max-w-xl"
          >
            {/* Heading */}
            <h2 className="text-white font-bold leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Apply for Admission
            </h2>

            {/* Sub-heading */}
            <p className="text-[#4caf50] font-semibold text-base sm:text-lg -mt-2">
              Fall 2019 applications are now open
            </p>

            {/* Body text */}
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              We don&apos;t just give students an education and experiences that
              set them up for success in a career. We help them succeed in their
              career&mdash;to discover a field they&apos;re passionate about and
              dare to lead it.
            </p>

            {/* CTA Button */}
            <div className="mt-2">
              <Link
                ref={btnRef}
                href="#"
                className="inline-block bg-[#4caf50] hover:bg-[#43a047] text-white font-semibold px-8 py-3 text-sm sm:text-base transition-colors duration-300 rounded-sm shadow-lg shadow-green-900/30 animate__animated animate__fadeInUp"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
