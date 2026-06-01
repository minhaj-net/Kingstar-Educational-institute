"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function MedicineHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2, delay: 0.3 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[450px] lg:h-[550px] w-full overflow-hidden">
      {/* Modern Medical/Hospital Facility Background */}
      <Image
        src="/campus_building.png" // Using the established university modern building
        alt="Medicine Department - Kingster Hospital Complex"
        fill
        className="object-cover object-center scale-105"
        priority
      />
      
      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 lg:pb-24">
        <div className="max-w-3xl">
          <span className="hero-text inline-block text-[#4caf50] uppercase tracking-widest font-semibold text-xs sm:text-sm mb-4">
            Undergraduate Program
          </span>
          <h1 className="hero-text text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight uppercase">
            Medicine
          </h1>
        </div>
      </div>

      {/* Breadcrumb strip */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/5 backdrop-blur-lg border-t border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center text-white/80 text-xs">
          <span className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">›</span>
          <span className="text-[#4caf50]">Medicine</span>
        </div>
      </div>
    </section>
  );
}
