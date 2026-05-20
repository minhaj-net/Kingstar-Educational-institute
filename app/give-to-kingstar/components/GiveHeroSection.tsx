"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

const GiveHeroSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // AOS Initialization
    AOS.init({
      duration: 1000,
      once: true,
    });

    // GSAP Animations
    const tl = gsap.timeline();
    tl.fromTo(
      imageRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
    )
      .fromTo(
        subHeadingRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
  }, []);

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden flex items-end">
      {/* Background Image Container */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/give_to_kingstar_hero_1779201726926.png" // Temporary path, usually moved to public
          alt="Give to Kingstar"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <span 
            ref={subHeadingRef}
            className="block text-[#4caf50] text-sm md:text-base font-semibold mb-2 tracking-wide uppercase animate__animated animate__fadeIn"
          >
            Become a donor
          </span>
          <h1 
            ref={headingRef}
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate__animated animate__fadeInUp"
          >
            Give To Kingster
          </h1>
        </div>
      </div>
    </section>
  );
};

export default GiveHeroSection;
