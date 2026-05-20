"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function PhysicsHero() {
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
      {/* Sci-Fi/Physics Connection Graph Background (Scientific Aesthetic) */}
      <div className="absolute inset-0 bg-[#060b1a]">
        {/* Using the building image with a heavy scientific overlay logic */}
        <Image
          src="/campus_building.png" 
          alt="Physics Department"
          fill
          className="object-cover object-center opacity-30 scale-105"
          priority
        />
        {/* Animated Grid/Plexus Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#060b1a_100%)] opacity-80" />
      </div>
      
      {/* Physics Themed Overlay (Blueish Molecular/Neural pattern hint) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060b1a] via-transparent to-transparent opacity-90" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 lg:pb-24">
        <div className="max-w-3xl">
          <span className="hero-text inline-block text-[#4caf50] uppercase tracking-widest font-semibold text-xs sm:text-sm mb-4">
            Graduate Program
          </span>
          <h1 className="hero-text text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Physics
          </h1>
        </div>
      </div>

      {/* Breadcrumb strip */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/5 backdrop-blur-lg border-t border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center text-white/80 text-xs">
          <span className="hover:text-white transition-colors cursor-pointer text-[#4caf50]">Home</span>
          <span className="mx-2">›</span>
          <span className="text-white">Physics</span>
        </div>
      </div>
    </section>
  );
}
