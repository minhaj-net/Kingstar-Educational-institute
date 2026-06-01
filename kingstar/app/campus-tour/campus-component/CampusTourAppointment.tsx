"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppointmentForm {
  fullName: string;
  date: string;
  time: string;
  phone: string;
  email: string;
  specialRequest?: string;
}

// ─── Field component ──────────────────────────────────────────────────────────

const inputBase =
  "w-full border border-gray-300 text-gray-700 text-sm px-4 py-3 focus:outline-none focus:border-[#4caf50] transition-colors duration-200 bg-white placeholder-gray-400";

const errorBase = "text-red-500 text-xs mt-1";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CampusTourAppointment() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const btnRef     = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentForm>();

  // ── AOS + GSAP ──
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Left info slides from left
      gsap.fromTo(leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Right form slides from right
      gsap.fromTo(rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Form fields stagger
      gsap.fromTo(
        rightRef.current?.querySelectorAll(".form-row") ?? [],
        { y: 18, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      // Button hover
      if (btnRef.current) {
        btnRef.current.addEventListener("mouseenter", () =>
          gsap.to(btnRef.current, { scale: 1.03, duration: 0.18, ease: "power2.out" })
        );
        btnRef.current.addEventListener("mouseleave", () =>
          gsap.to(btnRef.current, { scale: 1, duration: 0.18, ease: "power2.in" })
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Submit handler ──
  const onSubmit = async (_data: AppointmentForm) => {
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 600));

    // Button bounce
    gsap.fromTo(btnRef.current,
      { scale: 0.94 },
      { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" }
    );

    setSubmitted(true);
    reset();

    // Animate success message in
    requestAnimationFrame(() => {
      if (successRef.current) {
        gsap.fromTo(successRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      }
    });

    // Auto-hide after 5s
    setTimeout(() => {
      if (successRef.current) {
        gsap.to(successRef.current, {
          opacity: 0, y: -10, duration: 0.4, ease: "power2.in",
          onComplete: () => setSubmitted(false),
        });
      }
    }, 5000);
  };

  return (
    <section ref={sectionRef} className="w-full bg-white" aria-label="Make an Appointment">

      {/* Top green accent line */}
      <div className="w-full h-0.5 bg-gradient-to-r from-[#4caf50] via-[#4caf50]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Campus Tour Time info ── */}
          <div ref={leftRef} className="flex flex-col gap-5" data-aos="fade-right">
            <h2
              className="text-[#1a2e5a] font-bold"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}
            >
              Campus Tour Time
            </h2>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              We are opn on Monday – Friday at 11am and 3pm, except on holidays.
            </p>

            <div className="flex flex-col gap-1.5">
              <p className="text-[#1a2e5a] font-bold text-sm sm:text-base">
                Charlie&apos;s Admissions Center
              </p>
              <address className="not-italic text-gray-500 text-sm leading-relaxed">
                223 Campus Way NE<br />
                Bothell, WA 98011-8246
              </address>
            </div>

            <p className="text-[#1a2e5a] font-bold text-sm sm:text-base">
              Phone :{" "}
              <a href="tel:+13425233544" className="font-bold hover:text-[#4caf50] transition-colors duration-200">
                +1-3425-2335-44
              </a>
            </p>

            <p className="text-[#1a2e5a] font-bold text-sm sm:text-base">
              Email :{" "}
              <a href="mailto:scholarships@kuuniver.edu" className="font-bold hover:text-[#4caf50] transition-colors duration-200">
                scholarships@kuuniver.edu
              </a>
            </p>
          </div>

          {/* ── RIGHT: Appointment Form ── */}
          <div ref={rightRef} data-aos="fade-left" data-aos-delay="100">
            <h2
              className="text-[#1a2e5a] font-bold mb-6"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}
            >
              Make an appointment
            </h2>

            {/* Success message */}
            {submitted && (
              <div
                ref={successRef}
                className="flex items-start gap-3 bg-[#4caf50]/10 border border-[#4caf50] rounded-sm px-5 py-4 mb-5 animate__animated animate__fadeIn"
              >
                <CheckCircle size={20} className="text-[#4caf50] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#1a2e5a] font-semibold text-sm">
                    Appointment Submitted Successfully!
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Thank you! We&apos;ll confirm your campus tour appointment shortly via email.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3">

              {/* Full Name */}
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Full name*"
                  className={`${inputBase} ${errors.fullName ? "border-red-400" : ""}`}
                  {...register("fullName", { required: "Full name is required" })}
                />
                {errors.fullName && <p className={errorBase}>{errors.fullName.message}</p>}
              </div>

              {/* Date */}
              <div className="form-row">
                <input
                  type="date"
                  className={`${inputBase} ${errors.date ? "border-red-400" : ""}`}
                  {...register("date", { required: "Please select a date" })}
                />
                {errors.date && <p className={errorBase}>{errors.date.message}</p>}
              </div>

              {/* Select Time */}
              <div className="form-row">
                <select
                  className={`${inputBase} ${errors.time ? "border-red-400" : ""}`}
                  defaultValue=""
                  {...register("time", { required: "Please select a time" })}
                >
                  <option value="" disabled>Select Time*</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
                {errors.time && <p className={errorBase}>{errors.time.message}</p>}
              </div>

              {/* Phone */}
              <div className="form-row">
                <input
                  type="tel"
                  placeholder="Phone*"
                  className={`${inputBase} ${errors.phone ? "border-red-400" : ""}`}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: { value: /^[+\d\s\-()]{7,}$/, message: "Enter a valid phone number" },
                  })}
                />
                {errors.phone && <p className={errorBase}>{errors.phone.message}</p>}
              </div>

              {/* Email */}
              <div className="form-row">
                <input
                  type="email"
                  placeholder="Email*"
                  className={`${inputBase} ${errors.email ? "border-red-400" : ""}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                  })}
                />
                {errors.email && <p className={errorBase}>{errors.email.message}</p>}
              </div>

              {/* Special Request */}
              <div className="form-row">
                <textarea
                  placeholder="Special Request"
                  rows={4}
                  className={`${inputBase} resize-none`}
                  {...register("specialRequest")}
                />
              </div>

              {/* Submit */}
              <div className="form-row mt-1">
                <button
                  ref={btnRef}
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#4caf50] hover:bg-[#43a047] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm px-8 py-3 transition-colors duration-300 rounded-sm"
                >
                  {isSubmitting ? "Submitting..." : "Submit Now"}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
