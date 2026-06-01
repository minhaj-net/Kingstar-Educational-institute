"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Download,
  ThumbsUp
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const sidebarLinks = [
  { label: "Course Curriculum", href: "/" },
  { label: "Finance Faculty", href: "faculty" },
  { label: "Scholarships", href: "scholarships" },
  { label: "Application", href: "apply-kingstar" }
];

const highlights = [
  "Accounting majors take a full year of accounting: Principles of Accounting I and II, during your the year.",
  "As Juniors, you will enroll in interm. Accounting I and II, it will you a comprehensive understanding of accounting practice, thoery and financial report.",
  "Senior year will give you a great opportunity to specialize in an area of interest by pairing Accounting Topics with electives of your choosing.",
  "We will assist students in preparing for the Certified Public Accounting Exam through our self study programs."
];

export default function FinanceContentSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb - subtle */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-10 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#4caf50]">Home</Link>
          <ChevronRight size={10} />
          <Link href="/business-administration" className="hover:text-[#4caf50]">Bachelor Of Science in Business Administration</Link>
          <ChevronRight size={10} />
          <span className="text-[#4caf50]">Finance</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Main Body (Left) */}
          <div className="lg:col-span-8 space-y-10">

            {/* Header Image */}
            <div className="relative h-[300px] sm:h-[400px] w-full rounded-sm overflow-hidden shadow-lg" data-aos="zoom-in">
              <Image
                src="/slide-2.jpg" // High quality financial analytics theme
                alt="Finance Analytics"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Content Title */}
            <div data-aos="fade-up">
              <h2 className="text-3xl font-bold text-[#1a2e5a] mb-6">Finance</h2>
              <p className="text-gray-600 text-[15px] leading-relaxed mb-6 font-bold">
                Accounting or accountancy is the measurement, processing, and communication of
                financial information about economic.
              </p>
              <p className="text-[#4caf50] text-lg font-medium italic leading-relaxed border-b border-gray-100 pb-6 mb-8">
                If you're an educational professional who are looking to progress into management and consultancy, or an educational planning or development role, this is the best degree for you.
              </p>

              <p className="text-gray-500 text-[15px] leading-relaxed mb-10">
                Accounting can be divided into several fields including financial accounting, management
                accounting, external auditing, tax accounting and cost accounting. Accounting information
                systems are designed to support accounting functions and related activities. Financial accounting
                focuses on the reporting of an organization's financial information, including the preparation of
                financial statements, to the external users of the information, such as investors.
              </p>
            </div>

            {/* Icon Bullet Points */}
            <div className="space-y-6" data-aos="fade-up">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 text-gray-600 group">
                  <ThumbsUp size={18} className="text-[#4caf50] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-[15px] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap gap-4 pt-8" data-aos="fade-up">
              <button className="bg-[#4caf50] hover:bg-[#43a047] text-white px-8 py-4 rounded-sm font-bold text-sm transition-all flex items-center gap-2 transform hover:-translate-y-1">
                Apply <ExternalLink size={14} />
              </button>
              <button className="bg-[#43a047] hover:bg-[#388e3c] text-white px-8 py-4 rounded-sm font-bold text-sm transition-all flex items-center gap-2 transform hover:-translate-y-1">
                Download Brochure <Download size={14} />
              </button>
            </div>

            {/* Bottom Course Curriculum Placeholder */}
            {/* <div className="pt-12 border-t border-gray-100">
               <h3 className="text-2xl font-bold text-[#1a2e5a]">Course Curriculum</h3>
            </div> */}

          </div>

          {/* Sidebar Area (Right) */}
          <div className="lg:col-span-4 space-y-10">

            {/* Context Nav Box */}
            <div className="bg-gray-50 rounded-sm overflow-hidden" data-aos="fade-left">
              <div className="bg-gray-100 px-6 py-5 border-l-4 border-[#4caf50]">
                <h4 className="text-sm font-bold text-[#1a2e5a] tracking-wider uppercase">Finance Major</h4>
              </div>
              <div className="flex flex-col">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group px-6 py-4 flex items-center justify-between border-b border-gray-200 last:border-b-0 hover:bg-white transition-all"
                  >
                    <span className="text-sm text-gray-600 group-hover:text-[#4caf50] font-medium flex items-center gap-2">
                      <ArrowRight size={14} className="text-[#1a2e5a]" />
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Box */}
            <div
              data-aos="fade-left"
              data-aos-delay="100"
              className="bg-[#1a2e5a] p-10 text-white rounded-sm shadow-xl"
            >
              <h4 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">
                Department Contact Info
              </h4>
              <div className="space-y-8">
                <p className="text-[#4caf50] font-bold text-sm leading-relaxed uppercase tracking-wider">
                  Bachelor Of Science in Business Administration
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 text-sm text-gray-300">
                    <MapPin size={18} className="mt-1 flex-shrink-0 text-gray-400" />
                    <p>1810 Campus Way NE<br />Bothell, WA 98011-8246</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <Phone size={17} className="text-gray-400" />
                    <span>+1-2345-5432-45</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <Mail size={17} className="text-gray-400" />
                    <span className="text-[#4caf50]">bsba@kuuniver.edu</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 italic">
                    <Clock size={17} className="text-gray-400" />
                    <span>Mon - Fri 9:00A.M. - 5:00P.M.</span>
                  </div>
                </div>

                {/* Socials */}
                <div className="pt-8 border-t border-white/10">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Social Info</p>
                  <div className="flex gap-6">
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                  </div>
                </div>

                <button className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white py-4 rounded-sm font-bold text-sm transition-all duration-300 shadow-lg mt-4">
                  Student Resources
                </button>
              </div>
            </div>

            {/* Special Event Box */}
            <div
              data-aos="fade-left"
              data-aos-delay="200"
              className="border-2 border-[#4caf50] p-10 text-center rounded-sm"
            >
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Join Special Event</p>
              <h4 className="text-xl font-bold text-[#1a2e5a] mb-6 uppercase">Accounting Open House</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-10">
                Get real experience in our campus start in 16 August 2020
              </p>
              <button className="bg-[#4caf50] hover:bg-[#43a047] text-white px-8 py-3 rounded-sm font-bold text-xs transition-colors">
                Click to see more
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
