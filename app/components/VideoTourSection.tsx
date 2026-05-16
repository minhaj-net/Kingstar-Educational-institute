"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

export default function VideoTourSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);

  // ── AOS + GSAP ScrollTrigger entrance ──
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const ctx = gsap.context(() => {
      // Overlay fades in darker on scroll
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.35 },
        {
          opacity: 0.62,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Content slides up
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Continuous ripple pulse on play button
      if (rippleRef.current) {
        gsap.to(rippleRef.current, {
          scale: 2.2,
          opacity: 0,
          duration: 1.6,
          ease: "power1.out",
          repeat: -1,
          transformOrigin: "center",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Play button hover ──
  const handlePlayEnter = () => {
    gsap.to(playBtnRef.current, {
      scale: 1.12,
      duration: 0.25,
      ease: "power2.out",
    });
  };
  const handlePlayLeave = () => {
    gsap.to(playBtnRef.current, {
      scale: 1,
      duration: 0.25,
      ease: "power2.in",
    });
  };

  // ── Modal open ──
  const openModal = () => {
    setModalOpen(true);
    // Animate modal in
    requestAnimationFrame(() => {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        modalBoxRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }
      );
    });
  };

  // ── Modal close ──
  const closeModal = () => {
    gsap.to(modalBoxRef.current, {
      scale: 0.85,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setModalOpen(false),
    });
  };

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  return (
    <>
      {/* ══════════════════════════════════════════
          VIDEO TOUR SECTION
      ══════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ minHeight: "clamp(260px, 38vw, 460px)" }}
        aria-label="Video Tour in Kingster"
      >
        {/* ── Background image: slide-3.jpg ── */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/slide-3.jpg"
            alt="Kingster University colonnade"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* ── Dark overlay (GSAP scrub target) ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black"
          style={{ opacity: 0.55 }}
        />

        {/* ── Centered content ── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={contentRef}
            className="flex flex-col items-center gap-4 px-6 text-center max-w-lg"
            data-aos="fade-up"
          >
            {/* Play button with ripple */}
            <div className="relative flex items-center justify-center mb-2">
              {/* Ripple ring */}
              <span
                ref={rippleRef}
                className="absolute w-14 h-14 rounded-full border border-white/50"
                style={{ transformOrigin: "center" }}
              />
              {/* Button */}
              <button
                ref={playBtnRef}
                onClick={openModal}
                onMouseEnter={handlePlayEnter}
                onMouseLeave={handlePlayLeave}
                aria-label="Play video tour"
                className="relative z-10 w-14 h-14 rounded-full border-2 border-white bg-transparent hover:bg-white/15 flex items-center justify-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Play
                  size={20}
                  className="text-white fill-white translate-x-0.5"
                />
              </button>
            </div>

            {/* Heading */}
            <h2
              className="text-white font-bold leading-tight"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)" }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Video Tour in Kingster
            </h2>

            {/* Sub-text */}
            <p
              className="text-white/80 text-sm sm:text-base leading-relaxed max-w-sm"
              data-aos="fade-up"
              data-aos-delay="180"
            >
              Take a tour in Kingster and you will find the best university in
              the state. The video will take you to every places in this
              university.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VIDEO MODAL
      ══════════════════════════════════════════ */}
      {modalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          style={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === modalRef.current) closeModal();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal box */}
          <div
            ref={modalBoxRef}
            className="relative z-10 w-full max-w-3xl xl:max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl"
            style={{ opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close video"
              className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center bg-black/60 hover:bg-[#4caf50] text-white rounded-full transition-colors duration-200"
            >
              <X size={18} />
            </button>

            {/* 16:9 video embed placeholder */}
            {/* ↓ Replace the iframe src with your real YouTube/Vimeo embed URL */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                title="Video Tour in Kingster"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
