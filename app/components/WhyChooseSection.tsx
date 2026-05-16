"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface Tab {
  id: string;
  label: string;
  heading: string;
  body1: string;
  body2: string;
}

// ─── Tab Data ─────────────────────────────────────────────────────────────────

const tabs: Tab[] = [
  {
    id: "benefits",
    label: "Benefits",
    heading: "Why Choose Kingster?",
    body1:
      "The Kingster University Alumni Association is excited to announce the arrival of KU Alumni Connect. This is a new community building platform for Kinster's alumni. It is the only place online where you can find, and connect with, all 90,000 Kingster's alumni. All alumni are automatically enrolled!",
    body2:
      "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized globally. Throughout our great history, Kingster has offered access to a wide range of academic opportunities. As a world leader in higher education, the University has pioneered change in the sector.",
  },
  {
    id: "self-development",
    label: "Self Development",
    heading: "Grow Beyond Limits",
    body1:
      "At Kingster, we believe every student has the potential to grow beyond their current limits. Our self-development programs are designed to nurture leadership, critical thinking, and personal excellence in every individual.",
    body2:
      "From mentorship programs to skill-building workshops, Kingster provides a comprehensive ecosystem that empowers students to discover their strengths and build a future they are proud of.",
  },
  {
    id: "spirituality",
    label: "Spirituality",
    heading: "Holistic Education",
    body1:
      "Kingster University embraces a holistic approach to education that nurtures not just the mind, but also the spirit. Our campus life is enriched with mindfulness programs, meditation spaces, and interfaith dialogue sessions.",
    body2:
      "We believe that spiritual well-being is a cornerstone of academic success. Our programs help students find balance, purpose, and inner peace while pursuing their academic goals.",
  },
  {
    id: "alumni",
    label: "Alumni",
    heading: "A Thriving Alumni Network",
    body1:
      "Join a global network of over 90,000 Kingster alumni who are making a difference in every corner of the world. Our alumni community is one of the most active and supportive networks in higher education.",
    body2:
      "From exclusive networking events to career mentorship and alumni-funded scholarships, being a Kingster graduate opens doors that last a lifetime. Our alumni are our greatest ambassadors.",
  },
];

// ─── Watermark SVG (book icon, faint) ────────────────────────────────────────

function WatermarkBook() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="absolute bottom-4 right-6 w-28 h-28 sm:w-36 sm:h-36 opacity-[0.07] pointer-events-none select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="60" r="58" stroke="#c8a84b" strokeWidth="3" />
      <path
        d="M30 85V38a2 2 0 012-2h20a10 10 0 0110 10v39M30 85h32M62 85V46"
        stroke="#c8a84b"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M62 46h12a2 2 0 012 2v37"
        stroke="#c8a84b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M30 85h46" stroke="#c8a84b" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabLineRef = useRef<HTMLSpanElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  const [activeTab, setActiveTab] = useState("benefits");
  const [isAnimating, setIsAnimating] = useState(false);

  // ── AOS + GSAP entrance ──
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Left image slides in
      gsap.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // Right panel slides in
      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // Ripple pulse on play button
      if (rippleRef.current) {
        gsap.to(rippleRef.current, {
          scale: 2.4,
          opacity: 0,
          duration: 1.8,
          ease: "power1.out",
          repeat: -1,
          transformOrigin: "center",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Tab switch animation ──
  const switchTab = (id: string) => {
    if (id === activeTab || isAnimating || !contentRef.current) return;
    setIsAnimating(true);

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(id);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1, y: 0, duration: 0.35, ease: "power2.out",
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  // ── Tab indicator slide ──
  useEffect(() => {
    if (!tabLineRef.current) return;
    const idx = tabs.findIndex((t) => t.id === activeTab);
    gsap.to(tabLineRef.current, {
      x: `${idx * 100}%`,
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [activeTab]);

  // ── Play button hover ──
  const handlePlayEnter = () =>
    gsap.to(playBtnRef.current, { scale: 1.1, duration: 0.2, ease: "power2.out" });
  const handlePlayLeave = () =>
    gsap.to(playBtnRef.current, { scale: 1, duration: 0.2, ease: "power2.in" });

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f4f6f9] py-10 sm:py-14"
      aria-label="Why Choose Kingster"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-lg rounded-sm overflow-hidden bg-white">

          {/* ── LEFT: Student image with play button ── */}
          <div
            ref={leftRef}
            className="relative overflow-hidden"
            style={{ minHeight: "clamp(280px, 40vw, 480px)" }}
            data-aos="fade-right"
          >
            {/* Background image: slide-3.jpg */}
            <Image
              src="/slide-3.jpg"
              alt="Kingster University student"
              fill
              className="object-cover object-center"
            />

            {/* Subtle dark overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Play button centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Ripple */}
                <span
                  ref={rippleRef}
                  className="absolute w-16 h-16 rounded-full bg-white/30"
                  style={{ transformOrigin: "center" }}
                />
                {/* Button */}
                <button
                  ref={playBtnRef}
                  onMouseEnter={handlePlayEnter}
                  onMouseLeave={handlePlayLeave}
                  aria-label="Play video"
                  className="relative z-10 w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-[#4caf50] transition-colors duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Play
                    size={22}
                    className="text-[#1a2e5a] group-hover:text-white fill-[#1a2e5a] group-hover:fill-white translate-x-0.5 transition-colors duration-300"
                  />
                </button>
              </div>
            </div>

            {/* Dot indicator bottom-left */}
            <div className="absolute bottom-4 left-4 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block rounded-full transition-all duration-300 ${
                    i === 0 ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Tabs + Content ── */}
          <div
            ref={rightRef}
            className="flex flex-col"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            {/* ── Tab bar ── */}
            <div className="relative border-b border-gray-200">
              {/* Tab buttons */}
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => switchTab(tab.id)}
                    className={`relative flex-1 py-4 px-2 text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none
                      ${activeTab === tab.id
                        ? "text-[#1a2e5a]"
                        : "text-gray-400 hover:text-gray-600"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Sliding active indicator */}
              <span
                ref={tabLineRef}
                className="absolute bottom-0 left-0 h-0.5 bg-[#1a2e5a] transition-none"
                style={{ width: `${100 / tabs.length}%`, transform: "translateX(0)" }}
              />
            </div>

            {/* ── Tab content ── */}
            <div
              ref={contentRef}
              className="relative flex-1 px-6 sm:px-8 lg:px-10 py-8 sm:py-10 overflow-hidden"
            >
              {/* Watermark */}
              <WatermarkBook />

              {/* Heading */}
              <h3
                className="text-[#1a2e5a] font-bold mb-5 leading-tight"
                style={{ fontSize: "clamp(1.15rem, 2vw, 1.5rem)" }}
              >
                {current.heading}
              </h3>

              {/* Body paragraphs */}
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">
                {current.body1}
              </p>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {current.body2}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
