"use client";

import { useEffect, useRef } from "react";
import { BookOpen, Globe, GraduationCap, Building2, LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import type { ApplyServicesData } from "./types";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Globe,
  GraduationCap,
  Building2,
};

interface Props {
  data: ApplyServicesData;
}

export default function ApplyServices({ data }: Props) {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.querySelectorAll(".service-card") ?? [],
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        parallaxRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: parallaxRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full" aria-label="Apply Services">

      {/* Top band — dark navy, service cards */}
      <div className="w-full bg-[#1a2e5a]">
        <div
          ref={cardsRef}
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {data.items.map((svc, i) => {
              const Icon = ICON_MAP[svc.icon] ?? BookOpen;
              return (
                <div
                  key={svc.title}
                  className="service-card flex flex-col gap-3 group"
                  data-aos="fade-up"
                  data-aos-delay={i * 90}
                >
                  <div className="text-[#4caf50] group-hover:scale-110 transition-transform duration-300 w-fit">
                    <Icon size={36} strokeWidth={1.3} />
                  </div>
                  <div className="w-7 h-0.5 bg-[#4caf50] rounded-full group-hover:w-12 transition-all duration-400" />
                  <h3 className="text-white font-bold text-sm sm:text-base leading-snug">{svc.title}</h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{svc.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom band — fixed parallax image */}
      <div
        ref={parallaxRef}
        className="w-full"
        style={{
          height: "clamp(260px, 38vw, 460px)",
          backgroundImage: `url('${data.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
