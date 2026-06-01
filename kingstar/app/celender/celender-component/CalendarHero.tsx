"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CalendarHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });

      tl.fromTo(bgRef.current,
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" }
      );

      const words = titleRef.current?.querySelectorAll(".word") ?? [];
      tl.fromTo(words,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power3.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(140px, 18vw, 220px)" }}
      aria-label="Event Calendar"
    >
      {/* Background: university building / campus event image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ willChange: "transform" }}>
        <Image
          src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1400&q=85"
          alt="Event Calendar – Kingster University campus"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark navy overlay */}
      <div className="absolute inset-0 bg-[#0f1e3d]/78" />

      {/* Content — bottom-left */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16">
          <h1
            ref={titleRef}
            className="text-white font-bold leading-tight flex flex-wrap gap-x-3"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}
          >
            {["Event", "Calendar"].map((w, i) => (
              <span key={i} className="word inline-block">{w}</span>
            ))}
          </h1>
        </div>
      </div>

      {/* Bottom green accent */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#4caf50] via-[#4caf50]/50 to-transparent" />
    </section>
  );
}
