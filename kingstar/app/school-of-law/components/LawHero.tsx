"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function LawHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2, delay: 0.4 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400px] lg:h-[500px] w-full overflow-hidden">
      {/* Background Image (Black & White Classical Architecture) */}
      <div className="absolute inset-0 grayscale contrast-125">
        <Image
          src="/campus_building.png" 
          alt="School Of Law"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 lg:pb-20">
        <div className="max-w-3xl">
          <span className="hero-text inline-block text-[#4caf50] uppercase tracking-widest font-semibold text-xs sm:text-sm mb-3">
            Undergraduate Program
          </span>
          <h1 className="hero-text text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            School Of Law
          </h1>
        </div>
      </div>

      {/* Breadcrumb strip */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white/5 backdrop-blur-md border-t border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center text-white/70 text-xs">
          <span className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">›</span>
          <span className="text-[#4caf50]">School Of Law</span>
        </div>
      </div>
    </section>
  );
}
