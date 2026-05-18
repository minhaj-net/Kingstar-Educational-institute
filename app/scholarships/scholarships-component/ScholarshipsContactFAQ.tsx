"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "How long will the tour take?",
    answer:
      "Provided by the KU Institute of Education, this programme is available by distance learning, allowing you to study flexibly while balancing work and personal lifes.\n\nThe MSc Finance (EG. Banking) deepens your understanding of banks and financial markets, and how they relate to performance. It will help you to advance your career in finance and policy.",
    defaultOpen: true,
  },
  {
    id: 2,
    question: "Is there any parking nearby?",
    answer:
      "Yes, there is ample parking available near the main campus entrance. Visitor parking is free for the first two hours. Please display your visitor pass on the dashboard when parking in designated visitor areas.",
  },
  {
    id: 3,
    question: "Can I leave my bags at meeting point?",
    answer:
      "Yes, we have a secure luggage storage facility at the main reception. You can leave your bags there during the tour at no extra charge. Please collect them before 6:00 PM.",
  },
  {
    id: 4,
    question: "Will the tour be cancelled due to weather?",
    answer:
      "Our campus tours run in most weather conditions. In the event of severe weather, we will contact you via email or phone to reschedule. We recommend wearing comfortable shoes and bringing an umbrella just in case.",
  },
];

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(item.defaultOpen ?? false);
  const bodyRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyRef.current || !innerRef.current) return;
    if (open) {
      gsap.fromTo(
        bodyRef.current,
        { height: 0, opacity: 0 },
        {
          height: innerRef.current.offsetHeight,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => {
            if (bodyRef.current) bodyRef.current.style.height = "auto";
          },
        }
      );
    } else {
      gsap.to(bodyRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
      });
    }
  }, [open]);

  const paragraphs = item.answer.split("\n\n");

  return (
    <div className="overflow-hidden border border-gray-200">
      {/* Header button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold transition-colors duration-200
          ${open
            ? "bg-[#4caf50] text-white"
            : "bg-[#f4f6f9] text-[#4caf50] hover:bg-gray-100"
          }`}
      >
        <span>{item.question}</span>
        <span className="flex-shrink-0 ml-3">
          {open
            ? <Minus size={16} className="text-white" />
            : <Plus size={16} className="text-[#4caf50]" />
          }
        </span>
      </button>

      {/* Collapsible body */}
      <div
        ref={bodyRef}
        style={{
          height: item.defaultOpen ? "auto" : 0,
          overflow: "hidden",
          opacity: item.defaultOpen ? 1 : 0,
        }}
      >
        <div ref={innerRef} className="px-5 py-4 bg-white flex flex-col gap-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-gray-500 text-sm leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ScholarshipsContactFAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Left contact info slides from left
      gsap.fromTo(
        leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Right FAQ slides from right
      gsap.fromTo(
        rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Left children stagger
      gsap.fromTo(
        leftRef.current?.querySelectorAll(".contact-item") ?? [],
        { y: 18, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.45, stagger: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white border-t border-gray-100"
      aria-label="Contact For Scholarship and FAQ"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Contact For Scholarship ── */}
          <div ref={leftRef} data-aos="fade-right">
            <h2
              className="text-[#1a2e5a] font-bold mb-5"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}
            >
              Contact For Scholarship
            </h2>

            <div className="flex flex-col gap-4">
              <p className="contact-item text-gray-500 text-sm sm:text-base leading-relaxed">
                We are opn on Monday – Friday at 11am and 3pm, except on holidays.
              </p>

              <div className="contact-item flex flex-col gap-1">
                <p className="text-[#1a2e5a] font-bold text-sm sm:text-base">
                  Charlie&apos;s Admissions Center
                </p>
                <address className="not-italic text-gray-500 text-sm leading-relaxed">
                  223 Campus Way NE<br />
                  Bothell, WA 98011-8246
                </address>
              </div>

              <p className="contact-item text-[#1a2e5a] font-bold text-sm sm:text-base">
                Phone :{" "}
                <a
                  href="tel:+13425233544"
                  className="hover:text-[#4caf50] transition-colors duration-200"
                >
                  +1-3425-2335-44
                </a>
              </p>

              <p className="contact-item text-[#1a2e5a] font-bold text-sm sm:text-base">
                Email :{" "}
                <a
                  href="mailto:scholarships@kuuniver.edu"
                  className="hover:text-[#4caf50] transition-colors duration-200"
                >
                  scholarships@kuuniver.edu
                </a>
              </p>
            </div>
          </div>

          {/* ── RIGHT: FAQ Accordion ── */}
          <div ref={rightRef} data-aos="fade-left" data-aos-delay="100">
            <h2
              className="text-[#1a2e5a] font-bold mb-5"
              style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}
            >
              Frequently Asked Questions
            </h2>

            <div className="flex flex-col gap-2">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} item={faq} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
