"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight, Clock, Mail, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

interface LifeItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  description: string;
  body: string;
  highlights: string[];
  hours: string;
  contact: string;
  gallery: string[];
}

export default function UniversityLifeDetail({ item }: { item: LifeItem }) {
  const heroRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Hero image zoom-in
      gsap.fromTo(heroRef.current?.querySelector("img") ?? null,
        { scale: 1.06 },
        { scale: 1, duration: 1.1, ease: "power2.out" }
      );

      // Content sections stagger
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".content-block") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Gallery images stagger
      gsap.fromTo(
        galleryRef.current?.querySelectorAll(".gallery-img") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: galleryRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const bodyParagraphs = item.body.split("\n\n");

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 flex-wrap text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1 hover:text-[#4caf50] transition-colors">
            <Home size={13} /><span>Home</span>
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <Link href="/university-life" className="hover:text-[#4caf50] transition-colors">
            University Life
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#1a2e5a] font-medium">{item.title}</span>
        </nav>

        {/* ── Category + Title ── */}
        <div className="mb-6">
          <span className="text-[#4caf50] text-xs font-bold tracking-widest uppercase">{item.category}</span>
          <h1 className="text-[#1a2e5a] font-bold leading-tight mt-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}>
            {item.title}
          </h1>
        </div>

        {/* ── Hero image ── */}
        <div ref={heroRef} className="relative w-full overflow-hidden rounded-sm mb-10" style={{ height: "clamp(240px, 38vw, 480px)" }}>
          <Image src={item.image} alt={item.title} fill className="object-cover object-center" priority />
          {/* Subtle bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 xl:gap-16 items-start">

          {/* ── LEFT: Main content ── */}
          <div ref={contentRef} className="flex flex-col gap-8">

            {/* Description lead */}
            <div className="content-block" data-aos="fade-up">
              <p className="text-[#4caf50] text-base sm:text-lg font-medium leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Green divider */}
            <div className="content-block h-0.5 w-full bg-[#4caf50]" data-aos="fade-up" />

            {/* Body paragraphs */}
            <div className="content-block flex flex-col gap-5" data-aos="fade-up">
              {bodyParagraphs.map((para, i) => (
                <p key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed">{para}</p>
              ))}
            </div>

            {/* Highlights */}
            <div className="content-block" data-aos="fade-up">
              <h3 className="text-[#1a2e5a] font-bold text-lg mb-4">Key Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-gray-700 text-sm">
                    <CheckCircle size={16} className="text-[#4caf50] flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div className="content-block" data-aos="fade-up">
              <h3 className="text-[#1a2e5a] font-bold text-lg mb-4">Gallery</h3>
              <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {item.gallery.map((src, i) => (
                  <div key={i} className="gallery-img relative overflow-hidden rounded-sm" style={{ height: "160px" }}>
                    <Image src={src} alt={`${item.title} gallery ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT: Info sidebar ── */}
          <aside className="flex flex-col gap-5" data-aos="fade-left" data-aos-delay="100">

            {/* Hours card */}
            <div className="bg-[#f4f6f9] rounded-sm p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#1a2e5a] font-bold text-sm">
                <Clock size={16} className="text-[#4caf50]" />
                Operating Hours
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{item.hours}</p>
            </div>

            {/* Contact card */}
            <div className="bg-[#4caf50] rounded-sm p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Mail size={16} />
                Contact Us
              </div>
              <a href={`mailto:${item.contact}`} className="text-white/90 text-sm hover:text-white transition-colors duration-200 break-all">
                {item.contact}
              </a>
            </div>

            {/* Back link */}
            <Link
              href="/university-life"
              className="inline-flex items-center gap-2 text-[#1a2e5a] text-sm font-semibold hover:text-[#4caf50] transition-colors duration-200 mt-2"
            >
              ← Back to University Life
            </Link>

          </aside>

        </div>
      </div>
    </div>
  );
}
