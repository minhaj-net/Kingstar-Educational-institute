"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const benefits = [
  {
    id: 1,
    title: "15% Off For Restaurant in KU",
    description:
      "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Dudenmouth.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
    href: "#",
  },
  {
    id: 2,
    title: "40% Off KU Fitness",
    description:
      "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Dudenmouth.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80",
    href: "#",
  },
  {
    id: 3,
    title: "Free Library Access",
    description:
      "Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Dudenmouth.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&q=80",
    href: "#",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AlumniBenefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Cards stagger up
      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".benefit-card") ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.13, ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image hover zoom handled via Tailwind group-hover
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white"
      aria-label="Enjoy Benefits & Privileges"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">

        {/* Heading */}
        <h2
          className="text-[#1a2e5a] font-bold mb-8"
          style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}
          data-aos="fade-up"
        >
          Enjoy Benefits &amp; Privileges
        </h2>

        {/* 3-column cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8"
        >
          {benefits.map((item, i) => (
            <div
              key={item.id}
              className="benefit-card flex flex-col gap-4 group"
              data-aos="fade-up"
              data-aos-delay={i * 90}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden rounded-sm"
                style={{ height: "clamp(160px, 20vw, 220px)" }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title */}
              <h3 className="text-[#1a2e5a] font-bold text-sm sm:text-base leading-snug group-hover:text-[#4caf50] transition-colors duration-200">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                {item.description}
              </p>

              {/* Read More */}
              <Link
                href={item.href}
                className="inline-flex items-center gap-1.5 text-[#4caf50] text-sm font-semibold hover:gap-3 transition-all duration-200 group/link"
              >
                Read More
                <ArrowRight
                  size={14}
                  className="group-hover/link:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
