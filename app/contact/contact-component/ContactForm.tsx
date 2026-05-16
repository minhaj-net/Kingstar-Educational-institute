"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Social icons (inline SVG — lucide doesn't have these) ───────────────────

const socialIcons = [
  {
    label: "Email",
    href: "mailto:contact@kingsterunl.edu",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Skype",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.668 4.324m9.931-5.728a9.538 9.538 0 0 0 .2-1.96C22.2 5.951 17.652 1.5 12.077 1.5a10.1 10.1 0 0 0-1.959.198A5.647 5.647 0 0 0 6.4 0C3.421 0 1 2.426 1 5.393c0 1.222.414 2.36 1.102 3.252a9.5 9.5 0 0 0-.202 1.923c0 5.322 4.381 9.633 9.777 9.633a9.7 9.7 0 0 0 2.065-.223A5.618 5.618 0 0 0 17.6 21c2.979 0 5.4-2.426 5.4-5.393a5.38 5.38 0 0 0-1-3.461" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// ─── Input field component ────────────────────────────────────────────────────

function Field({
  label,
  type = "text",
  textarea = false,
  value,
  onChange,
  required = true,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const fieldRef = useRef<HTMLDivElement>(null);

  const focusStyle = "focus:outline-none focus:border-[#4caf50] transition-colors duration-200";
  const baseStyle  = `w-full border border-gray-200 bg-white text-gray-700 text-sm px-4 py-3 placeholder-gray-400 ${focusStyle}`;

  return (
    <div ref={fieldRef} className="w-full">
      {textarea ? (
        <textarea
          placeholder={`${label}${required ? "*" : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={5}
          className={`${baseStyle} resize-none`}
        />
      ) : (
        <input
          type={type}
          placeholder={`${label}${required ? "*" : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={baseStyle}
        />
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ContactForm() {
  const sectionRef  = useRef<HTMLElement>(null);
  const formColRef  = useRef<HTMLDivElement>(null);
  const infoColRef  = useRef<HTMLDivElement>(null);
  const socialRef   = useRef<HTMLDivElement>(null);
  const btnRef      = useRef<HTMLButtonElement>(null);

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Form column slides from left
      gsap.fromTo(formColRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
        }
      );

      // Info column slides from right
      gsap.fromTo(infoColRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
        }
      );

      // Form fields stagger
      gsap.fromTo(
        formColRef.current?.querySelectorAll(".form-field") ?? [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: formColRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Social icons stagger
      gsap.fromTo(
        socialRef.current?.querySelectorAll(".social-icon") ?? [],
        { y: 15, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: socialRef.current, start: "top 92%", toggleActions: "play none none none" },
        }
      );

      // Button hover
      if (btnRef.current) {
        btnRef.current.addEventListener("mouseenter", () =>
          gsap.to(btnRef.current, { scale: 1.02, duration: 0.18, ease: "power2.out" })
        );
        btnRef.current.addEventListener("mouseleave", () =>
          gsap.to(btnRef.current, { scale: 1, duration: 0.18, ease: "power2.in" })
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.fromTo(btnRef.current,
      { scale: 0.96 },
      { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)",
        onComplete: () => setSent(true) }
    );
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#f4f6f9]" aria-label="Contact Form">

      {/* ══════════════════════════════════════════
          MAIN CONTENT — Form (left) + Info (right)
      ══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 xl:gap-16 items-start">

          {/* ── LEFT: Contact Form ── */}
          <div ref={formColRef} data-aos="fade-right">
            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-[#1a2e5a] font-extrabold text-xl sm:text-2xl tracking-wide uppercase">
                Leave Us Your Info
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-3 max-w-lg">
                A wonderful serenity has taken possession of my entire soul, like these sweet
                mornings of spring which I enjoy with my whole heart. I am alone, and feel the
                charm of existence in this spot, which was created for the bliss of souls like mine.
              </p>
            </div>

            {sent ? (
              <div className="bg-[#4caf50]/10 border border-[#4caf50] rounded-sm px-6 py-5 text-[#4caf50] font-semibold text-sm animate__animated animate__fadeIn">
                ✓ Thank you! Your message has been sent. We&apos;ll get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="form-field">
                  <Field label="Full Name"  value={name}    onChange={setName} />
                </div>
                <div className="form-field">
                  <Field label="Email"      value={email}   onChange={setEmail}   type="email" />
                </div>
                <div className="form-field">
                  <Field label="Subject"    value={subject} onChange={setSubject} />
                </div>
                <div className="form-field">
                  <Field label="Message"    value={message} onChange={setMessage} textarea />
                </div>

                <div className="form-field mt-1">
                  <button
                    ref={btnRef}
                    type="submit"
                    className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white font-bold text-sm tracking-widest uppercase py-3.5 transition-colors duration-300"
                  >
                    Submit Now
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── RIGHT: Location + Map ── */}
          <div ref={infoColRef} className="flex flex-col gap-8" data-aos="fade-left" data-aos-delay="100">

            {/* Location */}
            <div>
              <h3 className="text-[#1a2e5a] font-extrabold text-lg sm:text-xl tracking-wide uppercase mb-4">
                Location
              </h3>
              <div className="flex flex-col gap-3 text-sm text-gray-600">
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>4 apt. Flawing Street, The Grand Avenue,<br />Liverpool, UK 33342</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="text-gray-400 flex-shrink-0" />
                  <a href="mailto:contact@infinitewptheme.com"
                    className="hover:text-[#4caf50] transition-colors duration-200">
                    contact@infinitewptheme.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-gray-400 flex-shrink-0" />
                  <a href="tel:+13524335" className="hover:text-[#4caf50] transition-colors duration-200">
                    +1-3524-3356
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h3 className="text-[#1a2e5a] font-extrabold text-lg sm:text-xl tracking-wide uppercase mb-4">
                Map
              </h3>
              <div className="w-full overflow-hidden rounded-sm border border-gray-200 shadow-sm"
                style={{ height: "220px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.542!2d-0.1276!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjYiTiAwwrAwNyc0MC4zIlc!5e0!3m2!1sen!2suk!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kingster University Location"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM: Social icons bar
      ══════════════════════════════════════════ */}
      <div className="w-full bg-white border-t border-gray-100">
        <div
          ref={socialRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-center gap-3"
        >
          {socialIcons.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="social-icon w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#1a2e5a] hover:text-white hover:border-[#1a2e5a] transition-all duration-200 rounded-sm"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}
