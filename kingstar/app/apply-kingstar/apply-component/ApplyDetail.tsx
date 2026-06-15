"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ApplyDetailData } from "./types";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  data: ApplyDetailData;
}

export default function ApplyDetail({ data }: Props) {
  const sectionRef  = useRef<HTMLElement>(null);
  const breadRef    = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const lineRef     = useRef<HTMLSpanElement>(null);
  const col1Ref     = useRef<HTMLDivElement>(null);
  const col2Ref     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        breadRef.current,
        { y: -10, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.55, ease: "power3.out", transformOrigin: "left center",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        [col1Ref.current, col2Ref.current],
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: col1Ref.current, start: "top 85%", toggleActions: "play none none none" },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">

        {/* Breadcrumb */}
        <nav ref={breadRef} aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap mb-8 sm:mb-10">
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-400 hover:text-[#4caf50] transition-colors duration-200 text-xs sm:text-sm shrink-0"
          >
            <Home size={12} strokeWidth={1.8} />
            <span>Home</span>
          </Link>
          <ChevronRight size={12} className="text-gray-300 shrink-0" />
          <span className="text-[#4caf50] font-medium text-xs sm:text-sm truncate">
            {data.breadcrumbLabel}
          </span>
        </nav>

        {/* Heading */}
        <div className="mb-8 sm:mb-10">
          <h2
            ref={headingRef}
            className="text-[#1a2e5a] font-bold leading-tight text-[1.45rem] sm:text-[1.65rem] lg:text-[1.85rem]"
          >
            {data.heading}
          </h2>
          <span
            ref={lineRef}
            className="block h-[3px] bg-[#4caf50] mt-2.5 origin-left w-full sm:w-64 lg:w-80"
          />
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14">
          <div ref={col1Ref}>
            <p className="text-gray-500 text-sm sm:text-[0.95rem] leading-[1.75] tracking-[0.01em]">
              {data.col1}
            </p>
          </div>
          <div ref={col2Ref}>
            <p className="text-gray-500 text-sm sm:text-[0.95rem] leading-[1.75] tracking-[0.01em]">
              {data.col2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
