"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Course {
  id: string;
  title: string;
  department: string;
}

export default function FinanceCurriculum() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    // Fetch courses from public/courses.json
    fetch("/courses.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter for Business Administration / Finance related courses
        const filtered = data.filter((c: any) =>
          c.id.startsWith("ACC") ||
          c.id.startsWith("FIN") ||
          c.department === "Business Administration"
        );
        setCourses(filtered);
      })
      .catch((err) => console.error("Error loading courses:", err));
  }, []);

  // Matching the design image exactly:
  // Required: ACC101, ACC201, ACC402, ACC302, ITT203, ASC103
  // Elective: BPS201, CAA558, ACC604, AUD012

  const requiredIds = ["ACC101", "ACC201", "ACC402", "ACC302", "ITT203", "ASC103"];
  const electiveIds = ["BPS201", "CAA558", "ACC604", "AUD012"];

  // Helper to find title or use fallback
  const getCourseTitle = (id: string) => {
    const found = courses.find(c => c.id === id);
    if (found) return found.title;
    // Fallbacks based on the design image labels
    const fallbacks: Record<string, string> = {
      "ACC101": "Introduction to Financial Accounting",
      "ACC201": "Introduction to Managerial Accounting",
      "ACC402": "Intermediate Accounting I",
      "ACC302": "Contemporary Accounting Topics",
      "ITT203": "Introduction to Taxation",
      "ASC103": "Accounting Systems and Auditing",
      "BPS201": "Business Processes and Controls",
      "CAA558": "Cost Accounting",
      "ACC604": "Advanced Cost Accounting and Management",
      "AUD012": "Auditing"
    };
    return fallbacks[id] || "Course Title Unknown";
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          <div className="lg:col-span-8 space-y-12">

            <div data-aos="fade-up">
              <h2 className="text-2xl font-bold text-[#1a2e5a] mb-8">Course Curriculum</h2>
            </div>

            {/* Required Courses Section */}
            <div data-aos="fade-up">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Required Courses</h4>
              <div className="border-t border-gray-100">
                {requiredIds.map((id) => (
                  <Link
                    key={id}
                    href={`/courses/${id}`}
                    className="group border-b border-gray-100 py-5 flex items-center justify-between hover:bg-gray-50/50 px-2 transition-all"
                  >
                    <div className="flex items-center gap-8">
                      <span className="text-sm font-bold text-[#4caf50] w-16">{id}</span>
                      <span className="text-[15px] text-gray-700 group-hover:text-[#4caf50] transition-colors">{getCourseTitle(id)}</span>
                    </div>
                    <ArrowRight size={16} className="text-[#4caf50] transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Elective Courses Section */}
            <div data-aos="fade-up" className="pt-8">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Elective Courses</h4>
              <div className="border-t border-gray-100">
                {electiveIds.map((id) => (
                  <Link
                    key={id}
                    href={`/courses/${id}`}
                    className="group border-b border-gray-100 py-5 flex items-center justify-between hover:bg-gray-50/50 px-2 transition-all"
                  >
                    <div className="flex items-center gap-8">
                      <span className="text-sm font-bold text-[#4caf50] w-16">{id}</span>
                      <span className="text-[15px] text-gray-700 group-hover:text-[#4caf50] transition-colors">{getCourseTitle(id)}</span>
                    </div>
                    <ArrowRight size={16} className="text-[#4caf50] transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Empty Sidebar spacer to maintain alignment with the section above */}
          <div className="lg:col-span-4" />

        </div>
      </div>
    </section>
  );
}
