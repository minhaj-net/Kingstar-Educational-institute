"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronRight, Home } from "lucide-react";
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

interface Filters {
  keywords: string;
  courseId: string;
  department: string;
  campus: string;
  level: string;
  instructor: string;
  semester: string;
  credit: string;
  method: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function unique(arr: string[]): string[] {
  return Array.from(new Set(arr)).sort();
}

function filterCourses(courses: Course[], filters: Filters): Course[] {
  return courses.filter((c) => {
    const kw = filters.keywords.toLowerCase();
    if (
      kw &&
      !c.title.toLowerCase().includes(kw) &&
      !c.id.toLowerCase().includes(kw) &&
      !c.description.toLowerCase().includes(kw)
    )
      return false;
    if (filters.courseId && !c.id.toLowerCase().includes(filters.courseId.toLowerCase()))
      return false;
    if (filters.department && c.department !== filters.department) return false;
    if (filters.campus && c.campus !== filters.campus) return false;
    if (filters.level && c.level !== filters.level) return false;
    if (filters.instructor && c.instructor !== filters.instructor) return false;
    if (filters.semester && c.semester !== filters.semester) return false;
    if (filters.credit && c.credit !== filters.credit) return false;
    if (filters.method && c.method !== filters.method) return false;
    return true;
  });
}

// ─── Select Field ─────────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="bg-white/10 border border-white/20 text-white placeholder-white/50 px-3 py-2.5 text-sm w-full appearance-none focus:outline-none focus:border-white/50 pr-8"
        style={{ colorScheme: "dark" }}
      >
        <option value="" className="bg-[#1a2e5a] text-white">
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#1a2e5a] text-white">
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
      />
    </div>
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────────

function CourseCard({ course, index }: { course: Course; index: number }) {
  const details: { label: string; value: string }[] = [
    { label: "Department", value: course.department },
    { label: "Campus", value: course.campus },
    { label: "Level", value: course.level },
    { label: "Instructor", value: course.instructor },
    { label: "Semester", value: course.semester },
    { label: "Credit", value: course.credit },
    { label: "Method", value: course.method },
  ];

  return (
    <div
      className="bg-[#f4f6f9] border border-white p-5 sm:p-6 flex flex-col gap-4"
      data-aos="fade-up"
      data-aos-delay={index * 60}
    >
      {/* Header */}
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-[#4caf50] font-bold text-sm">{course.id}</span>
        <span className="text-[#1a2e5a] font-bold text-base sm:text-lg leading-snug">
          {course.title}
        </span>
      </div>

      {/* Details grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
        {details.map(({ label, value }) => (
          <li key={label} className="text-sm text-gray-600">
            <span className="font-bold text-[#1a2e5a]">{label}: </span>
            {value}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div>
        <Link
          href={`/courses/${course.id}`}
          className="inline-block bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-bold px-5 py-2.5 transition-colors duration-300"
        >
          More Detail
        </Link>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [displayed, setDisplayed] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [draft, setDraft] = useState<Filters>({
    keywords: "",
    courseId: "",
    department: "",
    campus: "",
    level: "",
    instructor: "",
    semester: "",
    credit: "",
    method: "",
  });

  const sidebarRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Load courses
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });
    fetch("/courses.json")
      .then((r) => r.json())
      .then((data: Course[]) => {
        setAllCourses(data);
        setDisplayed(data);
        setLoading(false);
      });
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Sidebar slides from left
      if (sidebarRef.current) {
        gsap.fromTo(
          sidebarRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
        );
      }

      // Cards stagger up
      if (listRef.current) {
        const cards = listRef.current.querySelectorAll(".course-card");
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }
    });

    return () => ctx.revert();
  }, [loading]);

  // Derived option lists
  const departments = unique(allCourses.map((c) => c.department));
  const campuses = unique(allCourses.map((c) => c.campus));
  const levels = unique(allCourses.map((c) => c.level));
  const instructors = unique(allCourses.map((c) => c.instructor));
  const semesters = unique(allCourses.map((c) => c.semester));
  const credits = unique(allCourses.map((c) => c.credit));
  const methods = unique(allCourses.map((c) => c.method));

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const results = filterCourses(allCourses, draft);
    setDisplayed(results);

    // Animate cards back in
    if (listRef.current) {
      const cards = listRef.current.querySelectorAll(".course-card");
      gsap.fromTo(
        cards,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" }
      );
    }
  }

  const inputClass =
    "bg-white/10 border border-white/20 text-white placeholder-white/50 px-3 py-2.5 text-sm w-full focus:outline-none focus:border-white/50";

  return (
    <div className="w-full bg-white">
      {/* ── Page header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1 hover:text-[#4caf50] transition-colors">
            <Home size={13} />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#1a2e5a] font-medium">Course Search</span>
        </nav>

        {/* Heading */}
        <p className="text-[#4caf50] text-xs font-semibold tracking-widest uppercase mb-1">
          Find course that suit you
        </p>
        <h1 className="text-[#1a2e5a] font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          Course Search
        </h1>
      </div>

      {/* ── Two-column layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr] gap-8 items-start">

          {/* ── LEFT SIDEBAR ── */}
          <aside
            ref={sidebarRef}
            className="bg-[#1a2e5a] text-white p-6 flex flex-col gap-4 lg:sticky lg:top-6"
          >
            <h2 className="text-white font-bold text-base border-b border-white/20 pb-3 mb-1">
              Search For Courses
            </h2>

            <form onSubmit={handleSearch} className="flex flex-col gap-3">
              {/* Keywords */}
              <input
                type="text"
                placeholder="Keywords"
                value={draft.keywords}
                onChange={(e) => setDraft({ ...draft, keywords: e.target.value })}
                className={inputClass}
              />

              {/* Course ID */}
              <input
                type="text"
                placeholder="Course ID"
                value={draft.courseId}
                onChange={(e) => setDraft({ ...draft, courseId: e.target.value })}
                className={inputClass}
              />

              {/* Department */}
              <SelectField
                label="Department"
                value={draft.department}
                options={departments}
                onChange={(v) => setDraft({ ...draft, department: v })}
              />

              {/* Campus */}
              <SelectField
                label="Campus"
                value={draft.campus}
                options={campuses}
                onChange={(v) => setDraft({ ...draft, campus: v })}
              />

              {/* Level */}
              <SelectField
                label="Level"
                value={draft.level}
                options={levels}
                onChange={(v) => setDraft({ ...draft, level: v })}
              />

              {/* Instructor */}
              <SelectField
                label="Instructor"
                value={draft.instructor}
                options={instructors}
                onChange={(v) => setDraft({ ...draft, instructor: v })}
              />

              {/* Semester */}
              <SelectField
                label="Semester"
                value={draft.semester}
                options={semesters}
                onChange={(v) => setDraft({ ...draft, semester: v })}
              />

              {/* Credit */}
              <SelectField
                label="Credit"
                value={draft.credit}
                options={credits}
                onChange={(v) => setDraft({ ...draft, credit: v })}
              />

              {/* Method */}
              <SelectField
                label="Method"
                value={draft.method}
                options={methods}
                onChange={(v) => setDraft({ ...draft, method: v })}
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-2.5 text-sm flex items-center justify-center gap-2 transition-colors duration-300 mt-1"
              >
                <Search size={15} />
                Search Courses
              </button>
            </form>
          </aside>

          {/* ── RIGHT: Course list ── */}
          <div ref={listRef}>
            {loading ? (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-gray-100 animate-pulse h-36 rounded-sm" />
                ))}
              </div>
            ) : displayed.length === 0 ? (
              <div className="py-16 text-center text-gray-500">
                <p className="text-lg font-semibold text-[#1a2e5a] mb-2">No courses found</p>
                <p className="text-sm">Try adjusting your search filters.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-500 mb-1">
                  Showing{" "}
                  <span className="font-semibold text-[#1a2e5a]">{displayed.length}</span>{" "}
                  {displayed.length === 1 ? "course" : "courses"}
                </p>
                {displayed.map((course, i) => (
                  <div key={course.id} className="course-card">
                    <CourseCard course={course} index={i} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
