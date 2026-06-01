"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Link2,
} from "lucide-react";
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
  image: string; // replace with real path e.g. "/images/news-1.jpg"
  featured?: boolean;
}

interface QuickLink {
  label: string;
  href: string;
}

interface Tweet {
  text: string;
  time: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const newsItems: NewsItem[] = [
  {
    id: 1,
    date: "JUNE 6, 2018",
    categories: ["ADMISSION", "STUDENT"],
    title: "Professor Albert joint research on mobile money in Tanzania",
    image: "/professor.jpg",
    featured: true,
  },
  {
    id: 2,
    date: "JUNE 6, 2018",
    categories: ["HOT", "UPDATES"],
    title: "A Global MBA for the next generation of business leaders",
    image: "/slide-1.jpg",
  },
  {
    id: 3,
    date: "JUNE 6, 2018",
    categories: ["ADMISSION", "EVENT"],
    title: "Professor Tom comments on voluntary recalls by snack brands",
    image: "/slide-2.jpg",
  },
  {
    id: 4,
    date: "JUNE 6, 2018",
    categories: ["ARTICLE", "RESEARCH"],
    title: "Professor Alexa is interviewed about Twitter's valuation",
    image: "/slide-4.jpg",
  },
];

const quickLinks: QuickLink[] = [
  { label: "Alumni & Donors", href: "#" },
  { label: "Athletic Calendar", href: "#" },
  { label: "All Kingster's Events", href: "#" },
  { label: "Partnership & Out Reach", href: "#" },
  { label: "Academic Programs", href: "#" },
  { label: "Tuition And Fees", href: "#" },
];

const tweets: Tweet[] = [
  {
    text: `Our Chief People Officer @Mildsdale16 joined @benjaminlow and @raejohnston on @tsushow to discuss all things Cultu... https://t.co/usza0qjcU`,
    time: "2 days ago",
  },
  {
    text: `Kingster University ranked among the top 50 universities globally for research excellence and student satisfaction.`,
    time: "3 days ago",
  },
  {
    text: `Applications for Fall 2024 are now open. Visit our admissions page to learn more about scholarships and programs.`,
    time: "5 days ago",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const newsColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const tweetTextRef = useRef<HTMLParagraphElement>(null);
  const [tweetIndex, setTweetIndex] = useState(0);
  const [tweetAnimating, setTweetAnimating] = useState(false);

  // ── AOS + GSAP init ──
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // News column slides from left
      gsap.fromTo(
        newsColRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      // Right column slides from right
      gsap.fromTo(
        rightColRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      // News items stagger
      gsap.fromTo(
        ".news-item",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: newsColRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
      // Quick links stagger
      gsap.fromTo(
        ".quick-link-item",
        { x: 20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: rightColRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Tweet carousel ──
  const changeTweet = (dir: "next" | "prev") => {
    if (tweetAnimating || !tweetTextRef.current) return;
    setTweetAnimating(true);
    gsap.to(tweetTextRef.current, {
      opacity: 0, x: dir === "next" ? -20 : 20, duration: 0.22, ease: "power2.in",
      onComplete: () => {
        setTweetIndex((prev) => {
          const next = dir === "next"
            ? (prev + 1) % tweets.length
            : (prev - 1 + tweets.length) % tweets.length;
          return next;
        });
        gsap.fromTo(
          tweetTextRef.current,
          { opacity: 0, x: dir === "next" ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.28, ease: "power2.out",
            onComplete: () => setTweetAnimating(false) }
        );
      },
    });
  };

  const featured = newsItems.find((n) => n.featured)!;
  const sideNews = newsItems.filter((n) => !n.featured);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto bg-white" aria-label="News and Quick Links">

      {/* ══════════════════════════════════════════
          MAIN ROW — News (left) + Quick Links (right)
      ══════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row min-h-[480px]">

        {/* ── LEFT: News & Updates ── */}
        <div
          ref={newsColRef}
          className="flex-1 px-6 sm:px-10 lg:px-12 py-10 lg:py-12 border-r border-gray-100"
        >
          {/* Header */}
          <div className="flex items-end justify-between mb-1" data-aos="fade-right">
            <div>
              <h2 className="text-[#1a2e5a] font-bold text-xl sm:text-2xl border-b-2 border-[#1a2e5a] pb-1 inline-block">
                News &amp; Updates
              </h2>
            </div>
          </div>
          <Link
            href="#"
            className="text-[#4caf50] text-xs font-semibold hover:underline mb-6 inline-block"
            data-aos="fade-right"
            data-aos-delay="80"
          >
            Read All News
          </Link>

          {/* Two-column news layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">

            {/* Featured news — left */}
            <div className="news-item flex flex-col gap-3">
              {/* Image */}
              <div className="relative w-full overflow-hidden rounded-sm" style={{ height: "170px" }}>
                <Image src={featured.image} alt={featured.title} fill className="object-cover" />
              </div>
              {/* Meta */}
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                <span>{featured.date}</span>
                <span>/</span>
                {featured.categories.map((c) => (
                  <span key={c} className="text-gray-500 font-medium">{c}</span>
                ))}
              </div>
              {/* Title */}
              <h3 className="text-[#1a2e5a] font-bold text-base leading-snug hover:text-[#4caf50] transition-colors duration-200 cursor-pointer">
                {featured.title}
              </h3>
            </div>

            {/* Side news — right (3 stacked) */}
            <div className="flex flex-col gap-5">
              {sideNews.map((item) => (
                <div key={item.id} className="news-item flex gap-3 items-start group">
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0 overflow-hidden rounded-sm" style={{ width: "90px", height: "65px" }}>
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  {/* Text */}
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

        {/* ── RIGHT: Quick Links + slide-3 bg ── */}
        <div
          ref={rightColRef}
          className="relative lg:w-[38%] xl:w-[35%] flex flex-col overflow-hidden"
        >
          {/* Background image: /public/slide-3.jpg */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/slide-3.jpg"
              alt="Kingster University building"
              fill
              className="object-cover object-center"
            />
            {/* Dark navy overlay */}
            <div className="absolute inset-0 bg-[#0f1e3d]/80" />
          </div>

          {/* Quick Links content */}
          <div className="relative z-10 px-8 sm:px-10 py-10 flex-1">
            {/* Header */}
            <div
              className="flex items-center gap-2 mb-6"
              data-aos="fade-left"
            >
              <Link2 size={18} className="text-white/70" />
              <h2 className="text-white font-bold text-xl sm:text-2xl">
                Quick Links
              </h2>
            </div>

            {/* Links list */}
            <ul className="flex flex-col">
              {quickLinks.map((link, i) => (
                <li
                  key={link.label}
                  className="quick-link-item border-b border-white/10 last:border-b-0"
                  data-aos="fade-left"
                  data-aos-delay={i * 70}
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-3.5 text-[#4caf50] text-sm font-semibold hover:text-white hover:pl-2 transition-all duration-250 group"
                  >
                    {link.label}
                    <ArrowRight
                      size={14}
                      className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-250"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apply to Kingster green bar */}
          <div
            className="relative z-10 bg-[#4caf50] hover:bg-[#43a047] transition-colors duration-300 px-8 sm:px-10 py-5 cursor-pointer"
            data-aos="fade-up"
          >
            <Link href="#" className="flex items-center gap-3">
              {/* Logo mark */}
              <div className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
                  <path
                    d="M8 24V12a1 1 0 011-1h5a3 3 0 013 3v10M8 24h9M17 24V14"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M17 14h3a1 1 0 011 1v9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M8 24h13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-white font-bold text-base sm:text-lg tracking-wide">
                Apply To Kingster
              </span>
            </Link>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════
          BOTTOM TICKER — Twitter / social feed
      ══════════════════════════════════════════ */}
      <div
        className="w-full bg-gray-50 border-t border-gray-200"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex items-center gap-4 py-4">
            {/* X (Twitter) icon */}
            <div className="flex-shrink-0 text-[#1da1f2]">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>

            {/* Tweet text */}
            <p
              ref={tweetTextRef}
              className="flex-1 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-1"
            >
              <span className="text-[#1a2e5a] font-medium">
                {tweets[tweetIndex].text.split(" ").slice(0, 4).join(" ")}{" "}
              </span>
              {tweets[tweetIndex].text.split(" ").slice(4).join(" ")}
              <span className="text-gray-400 ml-2">{tweets[tweetIndex].time}</span>
            </p>

            {/* Prev / Next arrows */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => changeTweet("prev")}
                aria-label="Previous tweet"
                className="w-7 h-7 flex items-center justify-center border border-gray-300 hover:border-[#1a2e5a] hover:text-[#1a2e5a] text-gray-400 transition-colors duration-200 rounded-sm"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => changeTweet("next")}
                aria-label="Next tweet"
                className="w-7 h-7 flex items-center justify-center border border-gray-300 hover:border-[#1a2e5a] hover:text-[#1a2e5a] text-gray-400 transition-colors duration-200 rounded-sm"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
