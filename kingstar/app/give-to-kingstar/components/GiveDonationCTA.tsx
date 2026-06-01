"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

const GiveDonationCTA = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="relative w-full bg-[#1a2e5a] py-16 md:py-0 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          
          {/* Left Side: Image that overlaps slightly */}
          <div 
            className="w-full md:w-1/2 relative z-10 md:-mt-12 md:-mb-12 shadow-2xl rounded-sm overflow-hidden"
            data-aos="fade-right"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/professor_cta.png"
                alt="Support our students"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div 
            className="w-full md:w-1/2 text-center md:text-left py-8 md:py-24"
            data-aos="fade-left"
          >
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug mb-8">
              Thanks to you, our students are gaining the knowledge, skills and values to create a more humane, just, and sustainable world.
            </h2>
            
            <Link 
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#4caf50] hover:bg-[#43a047] text-white font-bold rounded-sm transition-all duration-300 transform hover:scale-105 shadow-lg group"
            >
              <span>Become A Donor</span>
              <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
      
      {/* Background Decorative Element / Offset Fix for overlap */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full bg-[#1a2e5a] -z-10" />
    </section>
  );
};

export default GiveDonationCTA;
