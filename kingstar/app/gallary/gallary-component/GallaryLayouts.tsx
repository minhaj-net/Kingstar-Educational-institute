"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
interface GalleryItem {
  id: number;
  title: string;
  caption: string;
  category: string;
  image: string;
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="text-center mb-8" data-aos="fade-up">
      <h2 className="text-[#1a2e5a] font-bold text-xl sm:text-2xl">{title}</h2>
      {sub && <p className="text-gray-400 text-sm mt-1">{sub}</p>}
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(boxRef.current, { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.4)" });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={onClose}>
      <div ref={boxRef} className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/70 hover:text-white"><X size={24} /></button>
        <div className="relative w-full overflow-hidden rounded-sm" style={{ height: "clamp(260px, 55vw, 580px)" }}>
          <Image src={items[index].image} alt={items[index].title} fill className="object-cover" />
        </div>
        <div className="mt-3 text-center">
          <p className="text-white font-semibold">{items[index].title}</p>
          <p className="text-white/60 text-sm">{items[index].caption}</p>
        </div>
        <button onClick={onPrev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-[#4caf50] text-white flex items-center justify-center rounded-full transition-colors"><ChevronLeft size={20} /></button>
        <button onClick={onNext} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-[#4caf50] text-white flex items-center justify-center rounded-full transition-colors"><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}

// ─── 1. Grid Style (with space) ───────────────────────────────────────────────
function GridStyle({ items }: { items: GalleryItem[] }) {
  const [lb, setLb] = useState<number | null>(null);
  return (
    <div>
      <SectionHeading title="Grid Style" sub="With Space" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.slice(0, 8).map((item, i) => (
          <div key={item.id} className="relative overflow-hidden rounded-sm cursor-pointer group" style={{ height: "clamp(140px,18vw,220px)" }}
            data-aos="fade-up" data-aos-delay={i * 60} onClick={() => setLb(i)}>
            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>
      {lb !== null && <Lightbox items={items.slice(0, 8)} index={lb} onClose={() => setLb(null)} onPrev={() => setLb((lb - 1 + 8) % 8)} onNext={() => setLb((lb + 1) % 8)} />}
    </div>
  );
}

// ─── 2. Grid Style Without Space ─────────────────────────────────────────────
function GridNoSpace({ items }: { items: GalleryItem[] }) {
  const [lb, setLb] = useState<number | null>(null);
  return (
    <div>
      <SectionHeading title="Grid Style Without Space" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 overflow-hidden">
        {items.slice(0, 8).map((item, i) => (
          <div key={item.id} className="relative overflow-hidden cursor-pointer group" style={{ height: "clamp(140px,18vw,220px)" }}
            data-aos="zoom-in" data-aos-delay={i * 50} onClick={() => setLb(i)}>
            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-108 transition-transform duration-500" />
            <div className="absolute inset-0 bg-[#1a2e5a]/0 group-hover:bg-[#1a2e5a]/50 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn size={26} className="text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300" />
            </div>
          </div>
        ))}
      </div>
      {lb !== null && <Lightbox items={items.slice(0, 8)} index={lb} onClose={() => setLb(null)} onPrev={() => setLb((lb - 1 + 8) % 8)} onNext={() => setLb((lb + 1) % 8)} />}
    </div>
  );
}

// ─── 3. Horizontal Scrolling (Hover With Center Caption) ─────────────────────
function HorizontalScroll({ items }: { items: GalleryItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lb, setLb] = useState<number | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, { scrollLeft: trackRef.current.scrollLeft + (dir === "right" ? 320 : -320), duration: 0.5, ease: "power2.inOut" });
  };

  return (
    <div>
      <SectionHeading title="Horizontal Scrolling" sub="Hover With Center Caption" />
      <div className="relative" data-aos="fade-up">
        {/* Arrows */}
        <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-md hover:bg-[#1a2e5a] hover:text-white text-gray-600 flex items-center justify-center rounded-full transition-colors duration-200 -translate-x-4">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-md hover:bg-[#1a2e5a] hover:text-white text-gray-600 flex items-center justify-center rounded-full transition-colors duration-200 translate-x-4">
          <ChevronRight size={18} />
        </button>

        {/* Scrollable track */}
        <div ref={trackRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2" style={{ scrollBehavior: "auto" }}>
          {items.map((item, i) => (
            <div key={item.id} className="relative flex-shrink-0 overflow-hidden rounded-sm cursor-pointer group" style={{ width: "clamp(220px,28vw,300px)", height: "clamp(160px,20vw,240px)" }}
              onClick={() => setLb(i)}>
              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              {/* Center caption on hover */}
              <div className="absolute inset-0 bg-[#1a2e5a]/0 group-hover:bg-[#1a2e5a]/65 transition-all duration-350 flex flex-col items-center justify-center gap-1 px-4 text-center">
                <p className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">{item.title}</p>
                <p className="text-white/80 text-xs opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lb !== null && <Lightbox items={items} index={lb} onClose={() => setLb(null)} onPrev={() => setLb((lb - 1 + items.length) % items.length)} onNext={() => setLb((lb + 1) % items.length)} />}
    </div>
  );
}

// ─── 4. Plain Carousel (Hover With Left Title & Caption) ─────────────────────
function PlainCarousel({ items }: { items: GalleryItem[] }) {
  const [current, setCurrent] = useState(0);
  const [lb, setLb] = useState<number | null>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const go = (dir: "prev" | "next") => {
    if (!slideRef.current) return;
    const next = dir === "next" ? (current + 1) % items.length : (current - 1 + items.length) % items.length;
    gsap.to(slideRef.current, {
      opacity: 0, x: dir === "next" ? -30 : 30, duration: 0.22, ease: "power2.in",
      onComplete: () => {
        setCurrent(next);
        gsap.fromTo(slideRef.current, { opacity: 0, x: dir === "next" ? 30 : -30 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" });
      },
    });
  };

  const item = items[current];

  return (
    <div>
      <SectionHeading title="Gallery Plain Carousel" sub="Hover With Left Title & Caption" />
      <div className="relative overflow-hidden rounded-sm" style={{ height: "clamp(240px,35vw,420px)" }} data-aos="fade-up">
        <div ref={slideRef} className="absolute inset-0 cursor-pointer group" onClick={() => setLb(current)}>
          <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          {/* Left-aligned caption on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e5a]/80 via-[#1a2e5a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col justify-end p-8">
            <p className="text-white font-bold text-lg sm:text-xl translate-x-[-20px] group-hover:translate-x-0 transition-transform duration-350">{item.title}</p>
            <p className="text-white/80 text-sm mt-1 translate-x-[-20px] group-hover:translate-x-0 transition-transform duration-350 delay-75">{item.caption}</p>
            <p className="text-[#4caf50] text-xs font-semibold mt-1 uppercase tracking-widest translate-x-[-20px] group-hover:translate-x-0 transition-transform duration-350 delay-100">{item.category}</p>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={() => go("prev")} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/40 hover:bg-[#4caf50] text-white flex items-center justify-center rounded-full transition-colors duration-200">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => go("next")} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/40 hover:bg-[#4caf50] text-white flex items-center justify-center rounded-full transition-colors duration-200">
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {items.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-[#4caf50]" : "w-2 h-2 bg-white/50"}`} />
          ))}
        </div>
      </div>
      {lb !== null && <Lightbox items={items} index={lb} onClose={() => setLb(null)} onPrev={() => setLb((lb - 1 + items.length) % items.length)} onNext={() => setLb((lb + 1) % items.length)} />}
    </div>
  );
}

// ─── 5. Gallery With Thumbnail (Hover With Title & Caption) ──────────────────
function ThumbnailGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(0);
  const [lb, setLb] = useState<number | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const switchTo = (i: number) => {
    if (!mainRef.current) return;
    gsap.to(mainRef.current, {
      opacity: 0, scale: 0.97, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        setActive(i);
        gsap.to(mainRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
      },
    });
  };

  return (
    <div>
      <SectionHeading title="Gallery With Thumbnail" sub="Hover With Title & Caption" />
      <div className="flex flex-col gap-3" data-aos="fade-up">
        {/* Main image */}
        <div ref={mainRef} className="relative overflow-hidden rounded-sm cursor-pointer group" style={{ height: "clamp(240px,38vw,460px)" }} onClick={() => setLb(active)}>
          <Image src={items[active].image} alt={items[active].title} fill className="object-cover group-hover:scale-105 transition-transform duration-600" />
          <div className="absolute inset-0 bg-[#1a2e5a]/0 group-hover:bg-[#1a2e5a]/55 transition-colors duration-350 flex flex-col items-center justify-center gap-2 text-center px-6">
            <p className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">{items[active].title}</p>
            <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">{items[active].caption}</p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-7 gap-2">
          {items.slice(0, 7).map((item, i) => (
            <div key={item.id} className={`relative overflow-hidden rounded-sm cursor-pointer transition-all duration-200 ${i === active ? "ring-2 ring-[#4caf50]" : "opacity-60 hover:opacity-100"}`}
              style={{ height: "clamp(48px,7vw,80px)" }} onClick={() => switchTo(i)}>
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      {lb !== null && <Lightbox items={items} index={lb} onClose={() => setLb(null)} onPrev={() => { const p = (lb - 1 + items.length) % items.length; setActive(p); setLb(p); }} onNext={() => { const n = (lb + 1) % items.length; setActive(n); setLb(n); }} />}
    </div>
  );
}

// ─── 6. Gallery Vertical (Caption Underneath, Hover With Icon) ───────────────
function VerticalGallery({ items }: { items: GalleryItem[] }) {
  const [lb, setLb] = useState<number | null>(null);

  return (
    <div>
      <SectionHeading title="Gallery Vertical" sub="Caption Underneath, Hover With Icon" />
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="break-inside-avoid" data-aos="fade-up" data-aos-delay={i * 50}>
            <div className="relative overflow-hidden rounded-sm cursor-pointer group" onClick={() => setLb(i)}>
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ display: "block" }}
              />
              {/* Hover icon overlay */}
              <div className="absolute inset-0 bg-[#1a2e5a]/0 group-hover:bg-[#1a2e5a]/55 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <ZoomIn size={20} className="text-[#1a2e5a]" />
                </div>
              </div>
            </div>
            {/* Caption underneath */}
            <div className="pt-2 pb-1">
              <p className="text-[#1a2e5a] font-semibold text-sm">{item.title}</p>
              <p className="text-gray-400 text-xs mt-0.5">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
      {lb !== null && <Lightbox items={items} index={lb} onClose={() => setLb(null)} onPrev={() => setLb((lb - 1 + items.length) % items.length)} onNext={() => setLb((lb + 1) % items.length)} />}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GallaryLayouts() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });
    fetch("/gallery.json")
      .then((r) => r.json())
      .then((data: GalleryItem[]) => { setItems(data); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse rounded-sm" style={{ height: "180px" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col gap-20">

        {/* 1. Grid Style */}
        <GridStyle items={items} />

        {/* 2. Grid Without Space */}
        <GridNoSpace items={items} />

        {/* 3. Horizontal Scrolling */}
        <HorizontalScroll items={items} />

        {/* 4. Plain Carousel */}
        <PlainCarousel items={items} />

        {/* 5. Thumbnail Gallery */}
        <ThumbnailGallery items={items} />

        {/* 6. Vertical Gallery */}
        <VerticalGallery items={items} />

      </div>
    </div>
  );
}
