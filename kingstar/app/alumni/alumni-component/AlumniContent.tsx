"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface AlumniEvent {
  id: number;
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
  image: string;
}

interface AlumniUpdate {
  id: number;
  date: string;
  category: string;
  title: string;
  image: string;
  slug: string;
}

interface AlumniData {
  events: AlumniEvent[];
  updates: AlumniUpdate[];
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AlumniContent() {
  const [data, setData] = useState<AlumniData | null>(null);
  const sectionRef   = useRef<HTMLElement>(null);
  const eventsRef    = useRef<HTMLDivElement>(null);
  const updatesRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    fetch("/alumni.json")
      .then((r) => r.json())
      .then((d: AlumniData) => {
        setData(d);
        // Animate after data loads
        requestAnimationFrame(() => {
          const ctx = gsap.context(() => {
            // Event cards stagger
            gsap.fromTo(
              eventsRef.current?.querySelectorAll(".event-card") ?? [],
              { y: 40, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
                scrollTrigger: { trigger: eventsRef.current, start: "top 80%", toggleActions: "play none none none" },
              }
            );
            // Update cards stagger
            gsap.fromTo(
              updatesRef.current?.querySelectorAll(".update-card") ?? [],
              { y: 40, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
                scrollTrigger: { trigger: updatesRef.current, start: "top 80%", toggleActions: "play none none none" },
              }
            );
          }, sectionRef);
          return () => ctx.revert();
        });
      });
  }, []);

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse rounded-sm h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="w-full bg-white" aria-label="Alumni Events and Updates">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">

        {/* ══════════════════════════════════════════
            ALUMNI EVENTS
        ══════════════════════════════════════════ */}
        <div className="mb-14">
          {/* Header */}
          <div className="flex items-end justify-between mb-1" data-aos="fade-up">
            <h2
              className="text-[#1a2e5a] font-bold border-b-2 border-[#1a2e5a] pb-1 inline-block"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)" }}
            >
              Alumni Events
            </h2>
          </div>
          <Link href="#" className="text-[#4caf50] text-xs font-semibold hover:underline mb-6 inline-block">
            View All Events
          </Link>

          {/* 3-column event cards */}
          <div ref={eventsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {data.events.map((ev, i) => (
              <div
                key={ev.id}
                className="event-card flex flex-col gap-0 group cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={i * 90}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-sm" style={{ height: "clamp(140px, 18vw, 200px)" }}>
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
                  <div className="flex-shrink-0 flex flex-col items-center w-10">
                    <span className="text-[#4caf50] font-extrabold text-2xl leading-none">{ev.day}</span>
                    <span className="text-[#4caf50] font-bold text-xs tracking-widest mt-0.5">{ev.month}</span>
                    <span className="block w-5 h-0.5 bg-[#4caf50] mt-1.5 group-hover:w-8 transition-all duration-300 rounded-full" />
                  </div>

                  {/* Title + meta */}
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <h3 className="text-[#1a2e5a] font-bold text-sm leading-snug group-hover:text-[#4caf50] transition-colors duration-200">
                      {ev.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs text-[#4caf50]">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />{ev.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />{ev.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ALUMNI UPDATES
        ══════════════════════════════════════════ */}
        <div>
          {/* Header */}
          <div className="flex items-end justify-between mb-1" data-aos="fade-up">
            <h2
              className="text-[#1a2e5a] font-bold border-b-2 border-[#1a2e5a] pb-1 inline-block"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)" }}
            >
              Alumni Updates
            </h2>
          </div>
          <Link href="/blogs" className="text-[#4caf50] text-xs font-semibold hover:underline mb-6 inline-block">
            Read All News
          </Link>

          {/* 3-column update cards */}
          <div ref={updatesRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {data.updates.map((post, i) => (
              <div
                key={post.id}
                className="update-card flex flex-col gap-4 group"
                data-aos="fade-up"
                data-aos-delay={i * 90}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-sm" style={{ height: "clamp(160px, 20vw, 220px)" }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
                  <span>{post.date}</span>
                  <span>/</span>
                  <span className="font-semibold text-gray-500">{post.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-[#1a2e5a] font-bold text-sm sm:text-base leading-snug group-hover:text-[#4caf50] transition-colors duration-200 flex-1">
                  <Link href={post.slug}>{post.title}</Link>
                </h3>

                {/* Read More button */}
                <Link
                  href={post.slug}
                  className="inline-block bg-[#4caf50] hover:bg-[#43a047] text-white text-xs font-bold px-5 py-2.5 transition-colors duration-300 w-fit animate__animated"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
