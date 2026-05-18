"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

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
  { type: "Early Decision 1", deadline: "November 1",  decision: "December 15" },
  { type: "Early Decision 2", deadline: "January 1",   decision: "February 15" },
  { type: "Regular Decision", deadline: "January 1",   decision: "April 1"     },
];

const requirements = [
  "Contact information for the counselor or other school representative who will complete your Common Application School Report and submit your official high school transcript.",
  "Contact information for one teacher (or two, maximum) who will complete the Teacher Evaluation form.",
  "Nonrefundable $50 application fee. Students who are unable to pay the application fee can request a fee waiver.",
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ApplyProcess() {
  const sectionRef   = useRef<HTMLElement>(null);
  const stepsRef     = useRef<HTMLDivElement>(null);
  const bottomRef    = useRef<HTMLDivElement>(null);
  const tableRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Steps stagger
      gsap.fromTo(
        stepsRef.current?.querySelectorAll(".step-item") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: stepsRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Bottom two cols
      gsap.fromTo(
        bottomRef.current?.querySelectorAll(".bottom-col") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: bottomRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Table rows stagger
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
    <section ref={sectionRef} className="w-full bg-white" aria-label="The Application Process">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">

        {/* ══════════════════════════════════════════
            TOP: Application Process — 6 steps
        ══════════════════════════════════════════ */}
        <h2
          className="text-[#1a2e5a] font-bold mb-8"
          style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}
          data-aos="fade-up"
        >
          The Application Process
        </h2>

        <div
          ref={stepsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mb-12"
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="step-item flex flex-col gap-2"
              data-aos="fade-up"
              data-aos-delay={i * 70}
            >
              {/* Number */}
              <span
                className="text-[#4caf50] font-extrabold leading-none"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
              >
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
        <div className="w-full h-px bg-gray-200 mb-12" data-aos="fade-up" />

        {/* ══════════════════════════════════════════
            BOTTOM: Things To Know + When To Apply
        ══════════════════════════════════════════ */}
        <div ref={bottomRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left: Things To Know First ── */}
          <div className="bottom-col flex flex-col gap-5" data-aos="fade-right">
            <h3
              className="text-[#1a2e5a] font-bold"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
            >
              Things To Know First
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed">
              The Common Application is required for students applying to any or
              all of KU&apos;s three degree. You&apos;ll be able to choose your
              campus and programs that you are interested.
            </p>

            <p className="text-gray-600 text-sm font-medium">You will need :</p>

            {/* Requirements list */}
            <ul className="flex flex-col gap-3">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle
                    size={16}
                    className="text-[#4caf50] flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <span className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {req}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                href="#"
                className="inline-block bg-[#4caf50] hover:bg-[#43a047] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 transition-colors duration-300 rounded-sm"
              >
                Request a campus tour
              </Link>
              <Link
                href="#"
                className="inline-block bg-[#4caf50] hover:bg-[#43a047] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 transition-colors duration-300 rounded-sm"
              >
                Request Information
              </Link>
            </div>
          </div>

          {/* ── Right: When To Apply + Where to submit ── */}
          <div className="bottom-col flex flex-col gap-8" data-aos="fade-left" data-aos-delay="100">

            {/* When To Apply table */}
            <div>
              <h3
                className="text-[#1a2e5a] font-bold mb-4"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
              >
                When To Apply?
              </h3>

              <div ref={tableRef} className="w-full overflow-hidden rounded-sm border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#4caf50] text-white">
                      <th className="py-3 px-4 text-left font-semibold text-xs tracking-wide w-1/3" />
                      <th className="py-3 px-4 text-left font-semibold text-xs tracking-wide">
                        Application Deadline
                      </th>
                      <th className="py-3 px-4 text-left font-semibold text-xs tracking-wide">
                        Decision
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {deadlines.map((row, i) => (
                      <tr
                        key={row.type}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="py-3 px-4 text-gray-600 text-xs font-medium border-t border-gray-100">
                          {row.type}
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-xs border-t border-gray-100">
                          {row.deadline}
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-xs border-t border-gray-100">
                          {row.decision}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Where to submit */}
            <div>
              <h3
                className="text-[#1a2e5a] font-bold mb-3"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
              >
                Where to submit necessary documents?
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                Documents not submitted through the online method can be mailed to:
              </p>
              <address className="not-italic text-gray-600 text-sm leading-relaxed">
                Box 35300<br />
                1810 Campus Way NE<br />
                Bothell, WA 98011-8246 USA
              </address>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
