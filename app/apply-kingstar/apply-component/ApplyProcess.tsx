"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import AdmissionInfo from "./Admissioninfo";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    num: 1,
    title: "Start Online Submission",
    body: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence.",
  },
  {
    num: 2,
    title: "Submit The Form",
    body: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence.",
  },
  {
    num: 3,
    title: "Review The Submission",
    body: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence.",
  },
  {
    num: 4,
    title: "Gather Necessary Documents",
    body: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence.",
  },
  {
    num: 5,
    title: "Interviewing Process",
    body: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence.",
  },
  {
    num: 6,
    title: "Last Decision",
    body: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence.",
  },
];

const deadlines = [
  { type: "Early Decision 1", deadline: "November 1", decision: "December 15" },
  { type: "Early Decision 2", deadline: "January 1", decision: "February 15" },
  { type: "Regular Decision", deadline: "January 1", decision: "April 1" },
];

const requirements = [
  "Contact information for the counselor or other school representative who will complete your Common Application School Report and submit your official high school transcript.",
  "Contact information for one teacher (or two, maximum) who will complete the Teacher Evaluation form.",
  "Nonrefundable $50 application fee. Students who are unable to pay the application fee can request a fee waiver.",
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ApplyProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(
        bottomRef.current?.querySelectorAll(".bottom-col") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: bottomRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      gsap.fromTo(
        tableRef.current?.querySelectorAll("tr") ?? [],
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: tableRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto bg-white" aria-label="The Application Process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-10 sm:py-14 lg:py-16">

        {/* ══════════════════════════════════════════
            TOP: Application Process — 6 steps
        ══════════════════════════════════════════ */}
        <h2
          className="text-[#1a2e5a] font-bold mb-6 sm:mb-8 text-xl sm:text-2xl lg:text-[1.7rem]"
          data-aos="fade-up"
        >
          The Application Process
        </h2>

        <div
          ref={stepsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 sm:gap-y-8 mb-10 sm:mb-12"
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="step-item flex flex-col gap-1.5 sm:gap-2"
              data-aos="fade-up"
              data-aos-delay={i * 70}
            >
              {/* Number */}
              <span className="text-[#4caf50] font-extrabold leading-none text-4xl sm:text-5xl">
                {step.num}
              </span>

              {/* Title */}
              <h3 className="text-[#1a2e5a] font-bold text-sm sm:text-base leading-snug">
                {step.title}
              </h3>

              {/* Body */}
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mb-10 sm:mb-12" data-aos="fade-up" />

        {/* ══════════════════════════════════════════
            BOTTOM: Things To Know + When To Apply
        ══════════════════════════════════════════ */}
        <div
          ref={bottomRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16"
        >

          {/* ── Left: Things To Know First ── */}
       
          {/* ── Right: When To Apply + Where to submit ── */}
        </div>
        <AdmissionInfo></AdmissionInfo>

      </div>
    </section>
  );
}