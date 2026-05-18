"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScheduleRow {
  time: string;
  place: string;
  room: string;
  dateRange: string;
  instructor: string;
}

interface Course {
  id: string;
  title: string;
  department: string;
  campus: string;
  level: string;
  instructor: string;
  semester: string;
  credit: string;
  method: string;
  image: string;
  description: string;
  body: string;
  topics: string[];
  schedule: ScheduleRow[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CourseDetail({ course }: { course: Course }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });

    const ctx = gsap.context(() => {
      // Image slides from left
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Info box slides from right
      if (infoBoxRef.current) {
        gsap.fromTo(
          infoBoxRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: infoBoxRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Content stagger up
      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll(".content-section");
        gsap.fromTo(
          sections,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const bodyParagraphs = course.body.split("\n\n");

  const infoItems: { label: string; value: string }[] = [
    { label: "Course ID", value: course.id },
    { label: "Campus", value: course.campus },
    { label: "Level", value: course.level },
    { label: "Semester", value: course.semester },
    { label: "Credit", value: course.credit },
    { label: "Method", value: course.method },
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* ── Course code + title ── */}
        <div className="mb-4">
          <span className="text-[#4caf50] text-sm font-bold tracking-widest uppercase">
            {course.id}
          </span>
          <h1
            className="text-[#1a2e5a] font-bold leading-tight mt-1"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
          >
            {course.title}
          </h1>
        </div>

        {/* ── Breadcrumb ── */}
        <nav
          className="flex items-center gap-1.5 flex-wrap text-sm text-gray-500 mb-8"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#4caf50] transition-colors"
          >
            <Home size={13} />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <Link
            href="/courses"
            className="hover:text-[#4caf50] transition-colors"
          >
            Accounting Required Courses
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#1a2e5a] font-medium">{course.title}</span>
        </nav>

        {/* ── Two-column top section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Left: image */}
          <div
            ref={imageRef}
            className="relative overflow-hidden"
            style={{ height: "400px" }}
          >
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: green info box */}
          <div
            ref={infoBoxRef}
            className="bg-[#4caf50] p-6 sm:p-8 flex flex-col justify-center"
          >
            <h2 className="text-white font-bold text-lg mb-5 border-b border-white/30 pb-3">
              Course Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {infoItems.map(({ label, value }) => (
                <div key={label}>
                  <p className="text-white/70 text-xs uppercase tracking-wide font-bold mb-0.5">
                    {label}
                  </p>
                  <p className="text-white font-semibold text-sm">{value}</p>
                </div>
              ))}
            </div>
            {/* Instructor separately — full width */}
            <div className="mt-4 pt-4 border-t border-white/30">
              <p className="text-white/70 text-xs uppercase tracking-wide font-bold mb-0.5">
                Instructor
              </p>
              <p className="text-white font-semibold text-sm">{course.instructor}</p>
            </div>
          </div>
        </div>

        {/* ── Content sections ── */}
        <div ref={contentRef} className="max-w-4xl flex flex-col gap-8">

          {/* Description lead */}
          <div className="content-section" data-aos="fade-up">
            <p className="text-[#4caf50] text-base sm:text-lg font-medium leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Divider */}
          <div className="content-section" data-aos="fade-up">
            <div className="h-0.5 w-full bg-[#4caf50]" />
          </div>

          {/* Body paragraphs */}
          <div className="content-section flex flex-col gap-5" data-aos="fade-up">
            {bodyParagraphs.map((para, i) => (
              <p key={i} className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Topics */}
          <div className="content-section" data-aos="fade-up">
            <h3 className="text-[#1a2e5a] font-bold text-lg mb-4">Course Topics</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.topics.map((topic) => (
                <li key={topic} className="flex items-center gap-2.5 text-gray-700 text-sm">
                  <CheckCircle size={17} className="text-[#4caf50] flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule table */}
          <div className="content-section" data-aos="fade-up">
            <h3 className="text-[#1a2e5a] font-bold text-lg mb-4">Class Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#4caf50] text-white">
                    <th className="px-4 py-3 text-left font-bold">Time</th>
                    <th className="px-4 py-3 text-left font-bold">Place</th>
                    <th className="px-4 py-3 text-left font-bold">Room</th>
                    <th className="px-4 py-3 text-left font-bold">Date Range</th>
                    <th className="px-4 py-3 text-left font-bold">Instructor</th>
                  </tr>
                </thead>
                <tbody>
                  {course.schedule.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#f4f6f9]"}
                    >
                      <td className="px-4 py-3 text-gray-700">{row.time}</td>
                      <td className="px-4 py-3 text-gray-700">{row.place}</td>
                      <td className="px-4 py-3 text-gray-700">{row.room}</td>
                      <td className="px-4 py-3 text-gray-700">{row.dateRange}</td>
                      <td className="px-4 py-3 text-gray-700">{row.instructor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
