"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

interface InfoBlock {
  title: string;
  body: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "How long will the tour take?",
    answer:
      "Provided by the KU Institute of Education, this programme is available by distance learning, allowing you to study flexibly while balancing work and personal lives.\n\nThe MSc Finance (EG. Banking) deepens your understanding of banks and financial markets, and how they relate to performance. It will help you to advance your career in finance and policy.",
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
    question: "Can I leave my bags or luggage at meeting point?",
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

const infoBlocks: InfoBlock[] = [
  {
    title: "Undergraduate Visitors",
    body: "This tour is intended for prospective graduate and professional students. All are welcome, but students interested in undergraduate programs may wish to visit KU Undergraduate Admissions page for a more appropriate visit experience.",
  },
  {
    title: "Complete Your Visit",
    body: "To learn more about the specific admissions process for your program, we recommend that you arrange to visit a specific graduate or professional school. We suggest that you connect with your specific school or department of interest ahead of time.",
  },
  {
    title: "Foreign Visitors",
    body: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me.",
  },
];

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(item.defaultOpen ?? false);
  const bodyRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Animate open/close
  useEffect(() => {
    if (!bodyRef.current || !innerRef.current) return;
    if (open) {
      gsap.fromTo(
        bodyRef.current,
        { height: 0, opacity: 0 },
        { height: innerRef.current.offsetHeight, opacity: 1, duration: 0.35, ease: "power2.out",
          onComplete: () => { if (bodyRef.current) bodyRef.current.style.height = "auto"; } }
      );
    } else {
      gsap.to(bodyRef.current, {
        height: 0, opacity: 0, duration: 0.28, ease: "power2.in",
      });
    }
  }, [open]);

  const paragraphs = item.answer.split("\n\n");

  return (
    <div className="border border-gray-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold transition-colors duration-200
          ${open ? "bg-[#4caf50] text-white" : "bg-white text-[#4caf50] hover:bg-gray-50"}`}
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <span className="flex-shrink-0 ml-3">
          {open
            ? <Minus size={16} className="text-white" />
            : <Plus size={16} className="text-[#4caf50]" />
          }
        </span>
      </button>

      {/* Body */}
      <div
        ref={bodyRef}
        style={{ height: item.defaultOpen ? "auto" : 0, overflow: "hidden", opacity: item.defaultOpen ? 1 : 0 }}
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

export default function CampusTourFAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Left column slides from left
      gsap.fromTo(leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Right column slides from right
      gsap.fromTo(rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // Info blocks stagger
      gsap.fromTo(
        rightRef.current?.querySelectorAll(".info-block") ?? [],
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.14, ease: "power2.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white" aria-label="Campus Tour FAQ">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: FAQ Accordion ── */}
          <div ref={leftRef} data-aos="fade-right">
            <h2
              className="text-[#1a2e5a] font-bold mb-6"
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

          {/* ── RIGHT: Info blocks ── */}
          <div ref={rightRef} className="flex flex-col gap-8" data-aos="fade-left" data-aos-delay="100">
            {infoBlocks.map((block, i) => (
              <div
                key={block.title}
                className="info-block flex flex-col gap-3"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                {/* Title with bottom border */}
                <div>
                  <h3 className="text-[#1a2e5a] font-bold text-base sm:text-lg">
                    {block.title}
                  </h3>
                  <div className="w-full h-px bg-gray-200 mt-2" />
                </div>

                {/* Body */}
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  {block.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
