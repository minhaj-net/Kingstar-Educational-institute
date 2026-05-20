"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

interface CalendarEvent {
  id: number;
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
  image: string;
}

export default function CalendarGrid() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    fetch("/events.json")
      .then((r) => r.json())
      .then((data: CalendarEvent[]) => {
        setEvents(data);
        requestAnimationFrame(() => {
          const ctx = gsap.context(() => {
            gsap.fromTo(
              gridRef.current?.querySelectorAll(".event-card") ?? [],
              { y: 40, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play none none none" },
              }
            );
          }, sectionRef);
          return () => ctx.revert();
        });
      });
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white" aria-label="Event Calendar Grid">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">
        {events.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded-sm h-64" />
            ))}
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((ev, i) => (
              <div
                key={ev.id}
                className="event-card flex flex-col gap-0 group cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-sm" style={{ height: "clamp(160px, 20vw, 220px)" }}>
                  <Image
                    src={ev.image}
                    alt={ev.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Date + info */}
                <div className="flex gap-4 items-start pt-4">
                  {/* Date badge */}
                  <div className="flex-shrink-0 flex flex-col items-start w-10">
                    <span className="text-[#1a2e5a] font-extrabold text-2xl leading-none">{ev.day}</span>
                    <span className="text-[#4caf50] font-bold text-xs tracking-widest mt-0.5">{ev.month}</span>
                    <span className="block w-5 h-0.5 bg-[#4caf50] mt-1.5 group-hover:w-8 transition-all duration-300 rounded-full" />
                  </div>

                  {/* Title + meta */}
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <h3 className="text-[#1a2e5a] font-bold text-xs sm:text-sm leading-snug uppercase tracking-wide group-hover:text-[#4caf50] transition-colors duration-200">
                      {ev.title}
                    </h3>
                    <div className="flex flex-col gap-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={10} className="text-[#4caf50]" />{ev.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={10} className="text-[#4caf50]" />{ev.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
