"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
}

export default function UniversityLifeGrid() {
  const [items, setItems] = useState<LifeItem[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    fetch("/university-life.json")
      .then((r) => r.json())
      .then((data: LifeItem[]) => {
        setItems(data);
        // Stagger cards after data loads
        requestAnimationFrame(() => {
          if (gridRef.current) {
            gsap.fromTo(
              gridRef.current.querySelectorAll(".life-card"),
              { y: 40, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
                scrollTrigger: {
                  trigger: gridRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });
      });
  }, []);

  return (
    <section className="w-full bg-white" aria-label="University Life Categories">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              className="life-card flex flex-col gap-4 group"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden rounded-sm"
                style={{ height: "clamp(160px, 20vw, 220px)" }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title */}
              <h3
                className="text-[#1a2e5a] font-bold text-base sm:text-lg leading-snug group-hover:text-[#4caf50] transition-colors duration-200"
              >
                <Link href={`/university-life/${item.id}`}>{item.title}</Link>
              </h3>

              {/* Excerpt */}
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                {item.excerpt}
              </p>

              {/* Read More */}
              <Link
                href={`/university-life/${item.id}`}
                className="inline-flex items-center gap-1.5 text-[#4caf50] text-sm font-semibold hover:gap-3 transition-all duration-200 group/link"
              >
                Read More
                <ArrowRight
                  size={14}
                  className="group-hover/link:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
