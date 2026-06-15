"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import AdmissionInfo from "./Admissioninfo";
import type { ApplyProcessData, AdmissionInfoData } from "./types";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  data: ApplyProcessData;
  admissionInfo: AdmissionInfoData;
}

export default function ApplyProcess({ data, admissionInfo }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepsRef.current?.querySelectorAll(".step-item") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: stepsRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto bg-white" aria-label="The Application Process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-10 sm:py-14 lg:py-16">

        {/* Heading */}
        <h2
          className="text-[#1a2e5a] font-bold mb-6 sm:mb-8 text-xl sm:text-2xl lg:text-[1.7rem]"
          data-aos="fade-up"
        >
          {data.heading}
        </h2>

        {/* Steps grid */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 sm:gap-y-8 mb-10 sm:mb-12"
        >
          {data.steps.map((step, i) => (
            <div
              key={step.num}
              className="step-item flex flex-col gap-1.5 sm:gap-2"
              data-aos="fade-up"
              data-aos-delay={i * 70}
            >
              <span className="text-[#4caf50] font-extrabold leading-none text-4xl sm:text-5xl">
                {step.num}
              </span>
              <h3 className="text-[#1a2e5a] font-bold text-sm sm:text-base leading-snug">
                {step.title}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mb-10 sm:mb-12" data-aos="fade-up" />

      </div>

      {/* Admission Info */}
      <AdmissionInfo data={admissionInfo} />
    </section>
  );
}
