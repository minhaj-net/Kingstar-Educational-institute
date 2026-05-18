"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, Clock, MapPin, ArrowRight, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface NewsItem {
  id: number;
  date: string;
  categories: string[];
  title: string;
  image: string;
  featured?: boolean;
}

interface EventItem {
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const newsItems: NewsItem[] = [
  {
    id: 1,
    date: "JUNE 6, 2016",
    categories: ["ADMISSION", "STUDENT"],
    title: "Professor Albert joint research on mobile money in Tanzania",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    featured: true,
  },
  {
    id: 2,
    date: "JUNE 6, 2016",
    categories: ["HOT", "UPDATES"],
    title: "A Global MBA for the next generation of business leaders",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&q=80",
  },
  {
    id: 3,
    date: "JUNE 6, 2016",
    categories: ["ADMISSION", "EVENT"],
    title: "Professor Tom comments on voluntary recalls by snack brands",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80",
  },
  {
    id: 4,
    date: "JUNE 6, 2016",
    categories: ["ARTICLE", "RESEARCH"],
    title: "Professor Alexa is interviewed about Twitter's valuation",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&q=80",
  },
];

const events: EventItem[] = [
  {
    day: "17",
    month: "DEC",
    title: "Fintech & Key Investment Conference",
    time: "1:00 pm – 1:00 pm",
    location: "Kingster Grand Hall",
  },
  {
    day: "04",
    month: "NOV",
    title: "Sport Management Information Webinar",
    time: "1:00 pm – 1:00 pm",
    location: "Kingster Grand Hall",
  },
  {
    day: "11",
    month: "SEP",
    title: "Planning and Facilitating Effective Meetings",
    time: "8:00 am – 8:00 am",
    location: "Kingster Grand Hall",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AthleticsContent() {
  const sectionRef  = useRef<HTMLElement>(null);
  const introRef    = useRef<HTMLDivElement>(null);
  const newsRef     = useRef<HTMLDivElement>(null);
  const eventsRef   = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Intro section
      gsap.fromTo(introRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: introRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Green underline draw
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.6, ease: "power3.out", transformOrigin: "left",
          scrollTrigger: { trigger: introRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // News column
      gsap.fromTo(newsRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: newsRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Events column
      gsap.fromTo(eventsRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: eventsRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // News items stagger
      gsap.fromTo(
        newsRef.current?.querySelectorAll(".news-item") ?? [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: newsRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Event items stagger
      gsap.fromTo(
        eventsRef.current?.querySelectorAll(".event-item") ?? [],
        { x: 20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: eventsRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured  = newsItems.find((n) => n.featured)!;
  const sideNews  = newsItems.filter((n) => !n.featured);

  return (
    <section ref={sectionRef} className="w-full bg-white" aria-label="Athletics Content">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-12">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm mb-6" data-aos="fade-right">
          <Link href="/" className="flex items-center gap-1 text-gray-400 hover:text-[#4caf50] transition-colors duration-200">
            <Home size={12} /><span>Home</span>
          </Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-[#4caf50] font-medium">Athletics</span>
        </div>

        {/* ── Intro text ── */}
        <div ref={introRef} className="mb-10 max-w-4xl">
          {/* Green underline */}
          <span
            ref={lineRef}
            className="block h-0.5 bg-[#4caf50] w-24 mb-5"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          />

          {/* Green lead */}
          <p className="text-[#4caf50] text-base sm:text-lg font-medium leading-relaxed mb-4">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
            there live the blind texts. Separated they live in
          </p>

          {/* Body */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river
            named Duden flows by their place and supplies it with the necessary regelialia. It is a
            paradisematic country, in which roasted parts of sentences fly into your mouth. Even the
            all-powerful Pointing has no control about the blind texts it is an almost unorthographic
            life One day however a small line of blind text by the name of Lorem Ipsum decided to
            leave for the far World of Grammar. The Big Oxmox advised her not to do so.
          </p>
        </div>

        {/* ── News & Events two-column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 xl:gap-14 items-start">

          {/* ── LEFT: News & Updates ── */}
          <div ref={newsRef}>
            {/* Header */}
            <div className="mb-1" data-aos="fade-right">
              <h2 className="text-[#1a2e5a] font-bold text-xl sm:text-2xl border-b-2 border-[#1a2e5a] pb-1 inline-block">
                News &amp; Updates
              </h2>
            </div>
            <Link href="#" className="text-[#4caf50] text-xs font-semibold hover:underline mb-6 inline-block">
              Read All News
            </Link>

            {/* Two-column news grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">

              {/* Featured */}
              <div className="news-item flex flex-col gap-3">
                <div className="relative w-full overflow-hidden rounded-sm" style={{ height: "180px" }}>
                  <Image src={featured.image} alt={featured.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <span>{featured.date}</span>
                  <span>/</span>
                  {featured.categories.map((c) => (
                    <span key={c} className="text-gray-500 font-medium">{c}</span>
                  ))}
                </div>
                <h3 className="text-[#1a2e5a] font-bold text-base leading-snug hover:text-[#4caf50] transition-colors duration-200 cursor-pointer">
                  {featured.title}
                </h3>
              </div>

              {/* Side news */}
              <div className="flex flex-col gap-5">
                {sideNews.map((item) => (
                  <div key={item.id} className="news-item flex gap-3 items-start group">
                    <div className="relative flex-shrink-0 overflow-hidden rounded-sm" style={{ width: "90px", height: "65px" }}>
                      <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
                        <span>{item.date}</span>
                        <span>/</span>
                        {item.categories.map((c) => (
                          <span key={c} className="font-medium text-gray-500">{c}</span>
                        ))}
                      </div>
                      <h4 className="text-[#1a2e5a] font-semibold text-sm leading-snug hover:text-[#4caf50] transition-colors duration-200 cursor-pointer line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ── RIGHT: Upcoming Events ── */}
          <div ref={eventsRef} data-aos="fade-left" data-aos-delay="100">
            <div className="mb-4">
              <h2 className="text-[#1a2e5a] font-bold text-xl sm:text-2xl border-b-2 border-[#1a2e5a] pb-1 inline-block">
                Upcoming Events
              </h2>
            </div>

            <div className="flex flex-col gap-0">
              {events.map((ev, i) => (
                <div
                  key={i}
                  className="event-item flex gap-4 items-start py-5 border-b border-gray-100 last:border-b-0 group cursor-pointer"
                >
                  {/* Date badge */}
                  <div className="flex-shrink-0 flex flex-col items-center w-10">
                    <span className="text-[#4caf50] font-extrabold text-2xl leading-none">{ev.day}</span>
                    <span className="text-[#4caf50] font-bold text-xs tracking-widest mt-0.5">{ev.month}</span>
                    <span className="block w-5 h-0.5 bg-[#4caf50] mt-1.5 group-hover:w-8 transition-all duration-300 rounded-full" />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <h4 className="text-[#1a2e5a] font-bold text-sm leading-snug group-hover:text-[#4caf50] transition-colors duration-200">
                      {ev.title}
                    </h4>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />{ev.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />{ev.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
