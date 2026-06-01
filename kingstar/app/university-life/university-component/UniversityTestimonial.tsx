"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

export default function UniversityTestimonial() {
  const sectionRef   = useRef<HTMLElement>(null);
  const imgRef       = useRef<HTMLDivElement>(null);
  const quoteRef     = useRef<HTMLDivElement>(null);
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
          scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.7)",
          scrollTrigger: { trigger: quoteRef.current, start: "top 78%", toggleActions: "play none none none" },
        }
      );

      // Quote children stagger
      gsap.fromTo(
        quoteRef.current?.querySelectorAll(".quote-child") ?? [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.13, ease: "power2.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 78%", toggleActions: "play none none none" },
        }
      );

      // Image zoom-in
      gsap.fromTo(
        imgRef.current?.querySelector("img") ?? null,
        { scale: 1.05 },
        {
          scale: 1, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: imgRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f4f6f9]"
      aria-label="University Life Testimonial"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[280px] lg:min-h-[320px]">

          {/* ── Left: Person photo ── */}
          <div
            ref={imgRef}
            className="relative overflow-hidden bg-[#e8e8e8]"
            style={{ minHeight: "260px" }}
            data-aos="fade-right"
          >
            <Image
              src="https://i.ibb.co.com/mCrsNj4f/a571f5225ece8b4bd570a4bad355e0ba.jpg"
              alt="University Life student testimonial"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* ── Right: Quote panel ── */}
          <div
            ref={quoteRef}
            className="bg-[#f4f6f9] flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-10 lg:py-12"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            {/* Large green opening quote mark */}
            <span
              ref={quoteMarkRef}
              className="text-[#4caf50] font-serif leading-none mb-5 select-none"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1 }}
              aria-hidden="true"
            >
              &#8220;
            </span>

            <blockquote className="flex flex-col gap-4">
              {/* Quote text */}
              <p className="quote-child text-[#1a2e5a] font-semibold text-sm sm:text-base leading-relaxed max-w-md">
                Our goal is to be at the heart of the financial services industry
                as businesses expand across.
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
    </section>
  );
}
