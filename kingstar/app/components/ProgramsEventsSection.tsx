"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  MapPin,
  ArrowRight,
  Heart,
  Mail,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProgramCard {
  title: string;
  description: string;
  image: string;
}

interface EventItem {
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const programs: ProgramCard[] = [
  {
    title: "Undergraduate",
    description:
      "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized globally.",
    image: "/slide-1.jpg",
  },
  {
    title: "Graduated & Professional",
    description:
      "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized globally.",
    image: "/slide-2.jpg",
  },
  {
    title: "Scholarships & Financial AID",
    description:
      "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized globally.",
    image: "/slide-4.jpg",
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

export default function ProgramsEventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topBandRef = useRef<HTMLDivElement>(null);
  const donationRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // ── AOS + GSAP ──
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Top program cards stagger
      gsap.fromTo(
        topBandRef.current?.querySelectorAll(".prog-card") ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: "power3.out",
          scrollTrigger: {
            trigger: topBandRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Donation panel
      gsap.fromTo(
        donationRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: {
            trigger: donationRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Events list stagger
      gsap.fromTo(
        eventsRef.current?.querySelectorAll(".event-item") ?? [],
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.55, stagger: 0.12, ease: "power2.out",
          scrollTrigger: {
            trigger: eventsRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Newsletter panel
      gsap.fromTo(
        newsletterRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Subscribe handler ──
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    gsap.to(btnRef.current, {
      scale: 0.95, duration: 0.1, yoyo: true, repeat: 1,
      onComplete: () => setSubscribed(true),
    });
  };

  return (
    <section ref={sectionRef} className="w-full" aria-label="Programs and Events">

      {/* ══════════════════════════════════════════
          TOP BAND — 3 Program Cards
      ══════════════════════════════════════════ */}
      <div ref={topBandRef} className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {programs.map((prog, i) => (
              <div
                key={prog.title}
                className="prog-card relative overflow-hidden rounded-sm group cursor-pointer"
                style={{ minHeight: "180px" }}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                {/* Background image */}
                <Image
                  src={prog.image}
                  alt={prog.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark navy overlay */}
                <div className="absolute inset-0 bg-[#1a2e5a]/75 group-hover:bg-[#1a2e5a]/85 transition-colors duration-300" />

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-7 flex flex-col gap-3 h-full">
                  <h3 className="text-white font-bold text-base sm:text-lg leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    {prog.description}
                  </p>
                  {/* Hover arrow */}
                  <div className="mt-auto pt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center gap-1 text-[#4caf50] text-xs font-semibold">
                      Learn More <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM ROW — Donation | Events | Newsletter
      ══════════════════════════════════════════ */}
      <div className="w-full bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">

            {/* ── Column 1: Donation ── */}
            <div ref={donationRef} className="flex flex-col gap-4" data-aos="fade-right">
              {/* Image */}
              <div
                className="relative w-full overflow-hidden rounded-sm"
                style={{ height: "200px" }}
              >
                <Image
                  src="/professor.jpg"
                  alt="Donation – help us"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Text */}
              <h3 className="text-[#1a2e5a] font-bold text-lg sm:text-xl mt-1">
                Donation helps us
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                The Campaign for the Kingster University is the{" "}
                <strong className="text-gray-700">
                  largest fundraising campaign in history.
                </strong>{" "}
                With a historic $1 billion goal, the campaign is expanding U
                of T&apos;s global leadership capacity.
              </p>

              {/* CTA */}
              <Link
                href="#"
                className="inline-flex items-center gap-2 bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-semibold px-5 py-2.5 rounded-sm transition-colors duration-300 w-fit mt-1 animate__animated animate__fadeInUp"
              >
                <Heart size={14} className="fill-white" />
                Become a donor
              </Link>
            </div>

            {/* ── Column 2: Upcoming Events ── */}
            <div ref={eventsRef} className="flex flex-col gap-1" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-[#1a2e5a] font-bold text-lg sm:text-xl mb-4">
                Upcoming Events
              </h3>

              {events.map((ev, i) => (
                <div
                  key={i}
                  className="event-item flex gap-4 items-start py-4 border-b border-gray-100 last:border-b-0 group cursor-pointer"
                >
                  {/* Date badge */}
                  <div className="flex-shrink-0 flex flex-col items-center w-10">
                    <span className="text-[#1a2e5a] font-bold text-xl leading-none">
                      {ev.day}
                    </span>
                    <span className="text-[#4caf50] font-semibold text-xs tracking-widest mt-0.5">
                      {ev.month}
                    </span>
                    {/* Green line */}
                    <span className="block w-5 h-0.5 bg-[#4caf50] mt-1.5 group-hover:w-8 transition-all duration-300" />
                  </div>

                  {/* Event info */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <h4 className="text-[#1a2e5a] font-semibold text-sm leading-snug group-hover:text-[#4caf50] transition-colors duration-200">
                      {ev.title}
                    </h4>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {ev.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {ev.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* View all */}
              <Link
                href="#"
                className="inline-flex items-center gap-1.5 text-[#1a2e5a] text-sm font-semibold hover:text-[#4caf50] transition-colors duration-200 mt-3 group"
              >
                View All Events
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* ── Column 3: Newsletter ── */}
            <div
              ref={newsletterRef}
              className="relative overflow-hidden rounded-sm flex flex-col"
              style={{ minHeight: "320px" }}
              data-aos="fade-left"
              data-aos-delay="200"
            >
              {/* Background: slide-3.jpg */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/slide-3.jpg"
                  alt="Subscribe to newsletter"
                  fill
                  className="object-cover object-center"
                />
                {/* Dark navy overlay */}
                <div className="absolute inset-0 bg-[#1a2e5a]/82" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 sm:px-8 py-10 gap-5 text-center">
                {/* Email icon */}
                <div className="w-16 h-16 rounded-sm border-2 border-[#4caf50] flex items-center justify-center mb-1">
                  <Mail size={28} className="text-[#4caf50]" strokeWidth={1.5} />
                </div>

                {/* Heading */}
                <h3 className="text-white font-bold text-lg sm:text-xl leading-snug">
                  Subscribe To Newsletter
                </h3>
                <p className="text-white/70 text-sm -mt-2">
                  Get updates to news &amp; events
                </p>

                {/* Form */}
                {subscribed ? (
                  <div className="w-full bg-[#4caf50]/20 border border-[#4caf50] rounded-sm px-4 py-3 text-[#4caf50] text-sm font-semibold animate__animated animate__fadeIn">
                    ✓ Thank you for subscribing!
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="w-full flex flex-col gap-3"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email Address"
                      required
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-[#4caf50] transition-colors duration-200"
                    />
                    <button
                      ref={btnRef}
                      type="submit"
                      className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white font-bold text-sm py-3 rounded-sm transition-colors duration-300"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
