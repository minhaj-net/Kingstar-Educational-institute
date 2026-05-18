"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortfolioItem {
  id: number;
  title: string;
  categories: string[];
  image: string;
  slug: string;
}

// ─── Filter tabs derived from data ───────────────────────────────────────────

const FILTER_ALL = "ALL";

// ─── Portfolio Card ───────────────────────────────────────────────────────────

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const iconRef    = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(iconRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
    );
    gsap.to(cardRef.current?.querySelector("img") ?? null, {
      scale: 1.07, duration: 0.5, ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" });
    gsap.to(iconRef.current, { scale: 0.6, opacity: 0, duration: 0.2 });
    gsap.to(cardRef.current?.querySelector("img") ?? null, {
      scale: 1, duration: 0.4, ease: "power2.in",
    });
  };

  return (
    <div
      ref={cardRef}
      className="portfolio-card group cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100" style={{ height: "clamp(160px, 18vw, 220px)" }}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-center"
        />
        {/* Hover overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#1a2e5a]/70 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <div ref={iconRef} style={{ opacity: 0 }}>
            <Link
              href={`/portfolio/${item.slug}`}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-[#4caf50] transition-colors duration-200"
              aria-label={`View ${item.title}`}
            >
              <Eye size={18} className="text-[#1a2e5a] group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Text below image */}
      <div className="pt-3 pb-1">
        <h3 className="text-[#1a2e5a] font-semibold text-sm sm:text-base leading-snug hover:text-[#4caf50] transition-colors duration-200">
          <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          {item.categories.join(" / ")}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PortfolioGrid() {
  const [items,       setItems]       = useState<PortfolioItem[]>([]);
  const [activeFilter, setActiveFilter] = useState(FILTER_ALL);
  const [filters,     setFilters]     = useState<string[]>([]);
  const [displayed,   setDisplayed]   = useState<PortfolioItem[]>([]);
  const [loading,     setLoading]     = useState(true);

  const gridRef      = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLSpanElement>(null);

  // ── Load data ──
  useEffect(() => {
    AOS.init({ duration: 600, once: true, offset: 60 });
    fetch("/portfolio.json")
      .then((r) => r.json())
      .then((data: PortfolioItem[]) => {
        setItems(data);
        setDisplayed(data);
        // Build unique filter list
        const cats = Array.from(
          new Set(data.flatMap((d) => d.categories))
        ).sort();
        setFilters(cats);
        setLoading(false);
      });
  }, []);

  // ── Filter with GSAP stagger ──
  const applyFilter = useCallback((filter: string) => {
    if (!gridRef.current) return;
    setActiveFilter(filter);

    const cards = gridRef.current.querySelectorAll(".portfolio-card");

    // Fade out all
    gsap.to(cards, {
      opacity: 0, y: 20, duration: 0.22, stagger: 0.03, ease: "power2.in",
      onComplete: () => {
        const filtered =
          filter === FILTER_ALL
            ? items
            : items.filter((item) => item.categories.includes(filter));
        setDisplayed(filtered);

        // Fade in after state update
        requestAnimationFrame(() => {
          const newCards = gridRef.current?.querySelectorAll(".portfolio-card") ?? [];
          gsap.fromTo(
            newCards,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power3.out" }
          );
        });
      },
    });
  }, [items]);

  // ── Slide active pill indicator ──
  useEffect(() => {
    if (!filterBarRef.current || !activePillRef.current) return;
    const activeBtn = filterBarRef.current.querySelector(`[data-filter="${activeFilter}"]`) as HTMLElement;
    if (!activeBtn) return;
    const bar  = filterBarRef.current.getBoundingClientRect();
    const btn  = activeBtn.getBoundingClientRect();
    gsap.to(activePillRef.current, {
      x: btn.left - bar.left,
      width: btn.width,
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [activeFilter, filters]);

  // ── Initial cards entrance ──
  useEffect(() => {
    if (!loading && gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".portfolio-card"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [loading]);

  return (
    <section className="w-full bg-white" aria-label="Portfolio Grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">

        {/* ── Filter bar ── */}
        <div
          className="flex items-center justify-center mb-10"
          data-aos="fade-down"
        >
          <div
            ref={filterBarRef}
            className="relative flex items-center gap-0 border-b border-gray-200 pb-0"
          >
            {/* Sliding active pill (background) */}
            <span
              ref={activePillRef}
              className="absolute bottom-0 h-0.5 bg-[#1a2e5a] transition-none rounded-full"
              style={{ width: 0, left: 0 }}
              aria-hidden="true"
            />

            {/* ALL button */}
            <button
              data-filter={FILTER_ALL}
              onClick={() => applyFilter(FILTER_ALL)}
              className={`relative px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors duration-200
                ${activeFilter === FILTER_ALL ? "text-[#1a2e5a]" : "text-gray-400 hover:text-gray-700"}`}
            >
              All
            </button>

            {/* Category buttons */}
            {filters.map((cat) => (
              <button
                key={cat}
                data-filter={cat}
                onClick={() => applyFilter(cat)}
                className={`relative px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors duration-200
                  ${activeFilter === cat ? "text-[#1a2e5a]" : "text-gray-400 hover:text-gray-700"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded-sm" style={{ height: "200px" }} />
            ))}
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-8"
          >
            {displayed.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && displayed.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm animate__animated animate__fadeIn">
            No items found in this category.
          </div>
        )}

      </div>
    </section>
  );
}
