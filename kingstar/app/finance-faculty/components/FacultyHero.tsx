"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function FacultyHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[250px] lg:h-[300px] w-full overflow-hidden flex items-center justify-center">
      {/* Darkened Corporate/Academic Background */}
      <div className="absolute inset-0 bg-[#0a1d37]">
        <Image
          src="/slide-1.jpg" // High end academic slide
          alt="Faculty Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        {/* Navy Overlay as seen in the image */}
        <div className="absolute inset-0 bg-[#1a2e5a]/80" />
      </div>

      <div className="relative z-10 text-center">
        <h1 className="hero-text text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Finance Faculty
        </h1>
        {/* Green Top Border Accent as seen in snippet */}
        <div className="w-16 h-1.5 bg-[#4caf50] mx-auto mt-6 rounded-full" />
      </div>
    </section>
  );
}
