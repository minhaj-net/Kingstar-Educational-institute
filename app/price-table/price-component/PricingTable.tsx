"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface PricePlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  priceDecimal?: string;
  period: string;
  features: string[];
  featured: boolean;
  icon: React.ReactNode;
}

// ─── Icons (inline SVG matching the image) ───────────────────────────────────

const LightbulbIcon = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 4a10 10 0 0 1 6 18l-1 3H15l-1-3A10 10 0 0 1 20 4z" />
    <path d="M15 25h10M16 29h8M18 33h4" />
  </svg>
);

const BoxIcon = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 4l14 7-14 7L6 11z" />
    <path d="M6 11v14l14 7 14-7V11" />
    <path d="M20 18v11" />
    <path d="M6 11l14 7 14-7" />
  </svg>
);

const DiamondIcon = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 4l8 8-8 24-8-24z" />
    <path d="M12 12h16" />
    <path d="M4 12l8-8M36 12l-8-8" />
    <path d="M4 12l16 24M36 12L20 36" />
  </svg>
);

// ─── Plans data ───────────────────────────────────────────────────────────────

const plans: PricePlan[] = [
  {
    id: "starter",
    name: "STARTER PLAN",
    subtitle: "Suitable for starter",
    price: "9",
    priceDecimal: ".90",
    period: "MO",
    featured: false,
    icon: <LightbulbIcon />,
    features: [
      "List item here",
      "List item here",
      "List item here",
      "List item here",
    ],
  },
  {
    id: "advanced",
    name: "ADVANCED PLAN",
    subtitle: "Suitable for profession",
    price: "20",
    period: "MO",
    featured: true,
    icon: <BoxIcon />,
    features: [
      "List item here",
      "List item here",
      "List item here",
      "List item here",
    ],
  },
  {
    id: "enterprise",
    name: "ENTERPRISE PLAN",
    subtitle: "Suitable for corporate",
    price: "50",
    period: "MO",
    featured: false,
    icon: <DiamondIcon />,
    features: [
      "List item here",
      "List item here",
      "List item here",
      "List item here",
    ],
  },
];

// ─── Single Price Card ────────────────────────────────────────────────────────

function PriceCard({ plan, index }: { plan: PricePlan; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || plan.featured) return;

    const enter = () =>
      gsap.to(el, { y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.12)", duration: 0.25, ease: "power2.out" });
    const leave = () =>
      gsap.to(el, { y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", duration: 0.25, ease: "power2.in" });

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [plan.featured]);

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col overflow-hidden transition-shadow duration-300
        ${plan.featured
          ? "shadow-2xl scale-[1.04] z-10"
          : "shadow-md bg-white"
        }`}
      style={{ boxShadow: plan.featured ? undefined : "0 2px 8px rgba(0,0,0,0.06)" }}
      data-aos="fade-up"
      data-aos-delay={index * 120}
    >
      {/* ── Header band ── */}
      <div
        className={`flex flex-col items-center gap-3 px-6 py-8
          ${plan.featured ? "bg-[#4caf50]" : "bg-[#2d2d2d]"}`}
      >
        {/* Icon */}
        <div className="text-white opacity-90">
          {plan.icon}
        </div>

        {/* Plan name */}
        <h3
          className={`font-bold text-sm tracking-widest text-center
            ${plan.featured ? "text-white" : "text-[#4caf50]"}`}
        >
          {plan.name}
        </h3>

        {/* Subtitle */}
        <p className="text-white/70 text-xs text-center -mt-1">
          {plan.subtitle}
        </p>
      </div>

      {/* ── Price band ── */}
      <div
        className={`flex items-baseline justify-center gap-0.5 py-6 px-6
          ${plan.featured ? "bg-white" : "bg-white"}`}
      >
        <span className="text-gray-500 text-lg font-light self-start mt-2">$</span>
        <span
          className="text-[#1a2e5a] font-bold leading-none"
          style={{ fontSize: "clamp(2.8rem, 6vw, 4rem)" }}
        >
          {plan.price}
        </span>
        {plan.priceDecimal && (
          <span className="text-gray-500 text-lg font-light self-end mb-1">
            {plan.priceDecimal}
          </span>
        )}
        <span className="text-gray-400 text-sm self-end mb-1 ml-1">
          / {plan.period}
        </span>
      </div>

      {/* ── Features list ── */}
      <div className="flex flex-col bg-white flex-1">
        {plan.features.map((feat, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 py-3.5 border-t border-gray-100"
          >
            <Check size={14} className="text-[#4caf50] flex-shrink-0" strokeWidth={2.5} />
            <span className="text-gray-500 text-sm">{feat}</span>
          </div>
        ))}
      </div>

      {/* ── CTA button ── */}
      <div className="bg-white px-8 pb-8 pt-5">
        <Link
          href="#"
          className={`block w-full text-center text-sm font-semibold py-3 rounded-full transition-all duration-300
            ${plan.featured
              ? "bg-[#4caf50] hover:bg-[#43a047] text-white"
              : "bg-[#2d2d2d] hover:bg-[#1a2e5a] text-white"
            }`}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PricingTable() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Heading slides up
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards stagger up
      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".price-card-wrap") ?? [],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f4f6f9]"
      aria-label="Price Table With Featured"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-10 sm:mb-12 max-w-3xl">
          {/* Eyebrow */}
          <p className="text-gray-400 text-xs sm:text-sm italic mb-2">
            Example of price table
          </p>

          {/* Title */}
          <h2
            className="text-[#1a2e5a] font-extrabold leading-tight mb-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
          >
            Price Table With Featured
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            A wonderful serenity has taken possession of my entire soul, like these sweet mornings
            of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence
            in this spot, which was created for the bliss of souls like mine. I am so happy, my dear
            friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my
            talents. I should be incapable of drawing a single stroke at the present moment.
          </p>
        </div>

        {/* ── Price cards ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-0 items-end"
        >
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className="price-card-wrap"
            >
              <PriceCard plan={plan} index={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
