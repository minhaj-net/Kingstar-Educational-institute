"use client";

import { useEffect, useRef } from "react";
import { BookOpen, Globe, GraduationCap, Building2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: <BookOpen size={36} strokeWidth={1.3} />,
    title: "Education Services",
    body: "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized.",
  },
  {
    icon: <Globe size={36} strokeWidth={1.3} />,
    title: "International Hubs",
    body: "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized.",
  },
  {
    icon: <GraduationCap size={36} strokeWidth={1.3} />,
    title: "Bachelor's and Master's",
    body: "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized.",
  },
  {
    icon: <Building2 size={36} strokeWidth={1.3} />,
    title: "University Life",
    body: "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ApplyServices() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Cards stagger in
      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".service-card") ?? [],
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Fixed bg subtle scale on scroll (extra depth feel)
      gsap.fromTo(
        parallaxRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full" aria-label="Apply Services">

      {/* ══════════════════════════════════════════
          TOP BAND — dark navy, 4 service cards
      ══════════════════════════════════════════ */}
      <div className="w-full bg-[#1a2e5a]">
        <div
          ref={cardsRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className="service-card flex flex-col gap-3 group"
                data-aos="fade-up"
                data-aos-delay={i * 90}
              >
                {/* Icon — green tint */}
                <div className="text-[#4caf50] group-hover:scale-110 transition-transform duration-300 w-fit">
                  {svc.icon}
                </div>

                {/* Green divider */}
                <div className="w-7 h-0.5 bg-[#4caf50] rounded-full group-hover:w-12 transition-all duration-400" />

                {/* Title */}
                <h3 className="text-white font-bold text-sm sm:text-base leading-snug">
                  {svc.title}
                </h3>

                {/* Body */}
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  {svc.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM BAND — fixed background image
          (CSS background-attachment: fixed = true parallax)
      ══════════════════════════════════════════ */}
      <div
        ref={parallaxRef}
        className="w-full"
        style={{
          height: "clamp(260px, 38vw, 460px)",
          backgroundImage: "url('/slide-3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",   // ← true CSS fixed parallax
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

    </section>
  );
}
