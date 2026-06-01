"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function BusinessHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[450px] lg:h-[550px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/campus_building.png" // Using existing campus build image
        alt="Business Administration"
        fill
        className="object-cover object-center scale-105"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 lg:pb-24">
        <div className="hero-content max-w-3xl">
          <span className="inline-block text-[#4caf50] uppercase tracking-[0.2em] font-semibold text-xs sm:text-sm mb-4 animate__animated animate__fadeInDown">
            Undergraduate Program
          </span>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Bachelor Of Science in{" "}
            <span className="bg-[#1a2e5a] px-3 py-1 inline-block -skew-x-3 ml-1">
              <span className="skew-x-3 inline-block">Business Administration</span>
            </span>
          </h1>
        </div>
      </div>

      {/* Breadcrumb strip wrapper */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white/10 backdrop-blur-sm border-t border-white/20 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center text-white/80 text-xs">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span className="text-[#4caf50]">Bachelor Of Science in Business Administration</span>
        </div>
      </div>
    </section>
  );
}
