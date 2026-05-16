"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const footerLinks = [
  {
    heading: "Our Campus",
    links: [
      "Academic",
      "Planning & Administration",
      "Campus Safety",
      "Office of the Chancellor",
      "Facility Services",
      "Human Resources",
    ],
  },
  {
    heading: "Campus Life",
    links: [
      "Accessibility",
      "Financial Aid",
      "Food Services",
      "Housing",
      "Information Technologies",
      "Student Life",
    ],
  },
  {
    heading: "Academics",
    links: [
      "Canvas",
      "Catalyst",
      "Library",
      "Time Schedule",
      "Apply For Admissions",
      "Pay My Tuition",
    ],
  },
];

const socialLinks = [
  {
    icon: (
      // Facebook
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    href: "#",
    label: "Facebook",
  },
  {
    icon: (
      // LinkedIn
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: (
      // Skype
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.668 4.324m9.931-5.728a9.538 9.538 0 0 0 .2-1.96C22.2 5.951 17.652 1.5 12.077 1.5a10.1 10.1 0 0 0-1.959.198A5.647 5.647 0 0 0 6.4 0C3.421 0 1 2.426 1 5.393c0 1.222.414 2.36 1.102 3.252a9.5 9.5 0 0 0-.202 1.923c0 5.322 4.381 9.633 9.777 9.633a9.7 9.7 0 0 0 2.065-.223A5.618 5.618 0 0 0 17.6 21c2.979 0 5.4-2.426 5.4-5.393a5.38 5.38 0 0 0-1-3.461"/>
      </svg>
    ),
    href: "#",
    label: "Skype",
  },
  {
    icon: (
      // X (Twitter)
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    href: "#",
    label: "X (Twitter)",
  },
  {
    icon: (
      // Instagram
      <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
    href: "#",
    label: "Instagram",
  },
];

// ─── Logo Mark ────────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-full border-2 border-white/40 flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
          <path
            d="M8 24V12a1 1 0 011-1h5a3 3 0 013 3v10M8 24h9M17 24V14"
            stroke="#c8a84b"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 14h3a1 1 0 011 1v9"
            stroke="#c8a84b"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M8 24h13" stroke="#c8a84b" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <span className="text-white font-bold text-base tracking-wide">
        Kingster University
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Footer() {
  const footerRef   = useRef<HTMLElement>(null);
  const colsRef     = useRef<HTMLDivElement>(null);
  const bottomRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 40 });

    const ctx = gsap.context(() => {
      // Columns stagger in
      gsap.fromTo(
        colsRef.current?.querySelectorAll(".footer-col") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Bottom bar slides up
      gsap.fromTo(
        bottomRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-[#1c1f26]" aria-label="Site Footer">

      {/* ══════════════════════════════════════════
          MAIN FOOTER CONTENT
      ══════════════════════════════════════════ */}
      <div ref={colsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Col 1: Brand + Contact ── */}
          <div className="footer-col flex flex-col gap-5" data-aos="fade-up">
            <LogoMark />

            {/* Address */}
            <div className="flex flex-col gap-1.5 text-white/55 text-sm leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-white/30" />
                <span>
                  Box 35300<br />
                  1810 Campus Way NE<br />
                  Bothell, WA 98011-8246
                </span>
              </div>
            </div>

            {/* Phone */}
            <a
              href="tel:+12534456345"
              className="flex items-center gap-2 text-white font-semibold text-sm hover:text-[#4caf50] transition-colors duration-200"
            >
              <Phone size={13} className="text-white/40" />
              +1-2534-4456-345
            </a>

            {/* Email */}
            <a
              href="mailto:admin@kingsterunl.edu"
              className="flex items-center gap-2 text-[#4caf50] text-sm hover:text-white transition-colors duration-200 -mt-2"
            >
              <Mail size={13} className="text-[#4caf50]" />
              admin@kingsterunl.edu
            </a>

            {/* Divider line */}
            <div className="w-full h-px bg-white/10 mt-1" />
          </div>

          {/* ── Cols 2–4: Link columns ── */}
          {footerLinks.map((col, i) => (
            <div
              key={col.heading}
              className="footer-col flex flex-col gap-4"
              data-aos="fade-up"
              data-aos-delay={(i + 1) * 80}
            >
              {/* Heading */}
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base tracking-wide">
                  {col.heading}
                </h4>
                {/* Green underline */}
                <div className="w-full h-px bg-[#4caf50] mt-2.5" />
              </div>

              {/* Links */}
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-white/55 text-sm hover:text-white hover:pl-1.5 transition-all duration-200 inline-block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM BAR — copyright + social icons
      ══════════════════════════════════════════ */}
      <div
        ref={bottomRef}
        className="border-t border-white/8 bg-[#16181f]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
            Copyright. All Right Reserved 2020, GoodLayers
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-1.5">
            {socialLinks.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-7 h-7 flex items-center justify-center rounded-sm text-white/40 hover:text-white hover:bg-[#4caf50] transition-all duration-200"
              >
                {s.icon}
              </Link>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}
