"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, ExternalLink, Download } from "lucide-react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

const tabs = [
  { 
    id: "benefits", 
    label: "Benefits",
    content: {
      title: "Why Choose Kingster?",
      desc1: "The Kingster University Alumni Association is excited to announce the arrival of KU Alumni Connect. This is a new community building platform for Kingster's alumni. It is the only place online where you can find, and connect with, all 80,000 Kingster's alumni. All alumni are automatically enrolled!",
      desc2: "Kingster University was established by John Smith in 1920 for the public benefit and it is recognized globally. Throughout our great history, Kingster has offered access to a wide range of academic opportunities. As a world leader in higher education, the University has pioneered change in the sector."
    }
  },
  { id: "self-dev", label: "Self Development", content: { title: "Self Development", desc1: "Empowering our students with advanced leadership skills and professional growth opportunities.", desc2: "Our workshops focus on soft skills, technical expertise, and career-readiness programs tailored for the modern business world." } },
  { id: "spirituality", label: "Spirituality", content: { title: "Spirituality & Wellness", desc1: "Nurturing the mind and soul through dedicated wellness spaces and community gathering programs.", desc2: "We believe in a holistic approach to education that includes mental well-being and spiritual growth." } },
  { id: "alumni", label: "Alumni", content: { title: "Global Alumni Network", desc1: "A vast network of professionals spanning across 150 countries, providing mentorship and career support.", desc2: "Join local chapters and stay connected with your alma mater through exclusive events and networking sessions." } }
];

export default function BusinessExtraSection() {
  const [activeTab, setActiveTab] = useState("benefits");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <section className="bg-white overflow-hidden">
      
      {/* ─── Top Video/Tabs Section ─── */}
      <div className="py-16 lg:py-24 bg-[#f3f3f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row shadow-2xl rounded-sm overflow-hidden bg-white">
            
            {/* Video Preview Column */}
            <div className="lg:w-2/5 relative h-[300px] lg:h-auto min-h-[400px]">
              <Image 
                src="/students.jpg" // Using existing student image
                alt="Student Life"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group cursor-pointer flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#4caf50] shadow-2xl transform transition-transform duration-300 hover:scale-110">
                  <Play size={24} fill="currentColor" className="ml-1" />
                </div>
              </div>
            </div>

            {/* Tabs Content Column */}
            <div className="lg:w-3/5 flex flex-col">
              {/* Tab Headers */}
              <div className="flex flex-wrap bg-gray-50">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-5 text-sm font-bold tracking-wider uppercase transition-all duration-300 border-r border-gray-100 last:border-r-0
                      ${activeTab === tab.id 
                        ? "bg-white text-[#1a2e5a] border-b-2 border-b-[#4caf50]" 
                        : "text-gray-400 hover:text-[#1a2e5a] hover:bg-gray-100"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Panel */}
              <div className="p-8 lg:p-12 animate__animated animate__fadeIn">
                <h3 className="text-2xl font-bold text-[#1a2e5a] mb-8">
                  {currentTab?.content.title}
                </h3>
                <div className="space-y-6 text-gray-500 text-sm leading-relaxed max-w-2xl">
                  <p>{currentTab?.content.desc1}</p>
                  <p>{currentTab?.content.desc2}</p>
                </div>

                {/* Subtle watermark logo as in image */}
                <div className="mt-12 opacity-5 pointer-events-none select-none flex justify-end">
                  <svg viewBox="0 0 40 40" className="w-24 h-24" fill="none">
                    <circle cx="20" cy="20" r="19" stroke="#1a2e5a" strokeWidth="1.5" />
                    <path d="M12 28V14a1 1 0 011-1h6a3 3 0 013 3v12M12 28h10M22 28V16" stroke="#1a2e5a" strokeWidth="1.8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Middle Text Section ─── */}
      <div className="py-20 lg:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <h2 
          data-aos="fade-up"
          className="text-2xl lg:text-3xl font-bold text-[#1a2e5a] mb-10"
        >
          Why Study Here?
        </h2>
        <div data-aos="fade-up" data-aos-delay="100" className="space-y-8 text-gray-500 text-[15px] leading-relaxed">
          <p>
            The Academic offers include 14 majors, 15 minors, and more than 100 in-major specializations so your 
            degree will surely reflect your interests and strengths.
          </p>
          <p>
            Not only does Kingster University provide you the practical skills that is necessary to transition seamlessly 
            into the workforce upon your graduation, but we also make sure that you will have a good sense of social 
            justice so that you make the transition responsibly.
          </p>
        </div>
      </div>

      {/* ─── Bottom Dark CTA Section ─── */}
      <div className="relative bg-[#1a2e5a] py-20 lg:py-0 min-h-[400px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* CTA Text Column */}
            <div className="lg:w-1/2" data-aos="fade-right">
              <h3 className="text-xl lg:text-2xl font-bold text-white leading-relaxed mb-10">
                The PLP in Drafting Legislation, Regulation, and Policy 
                has been offered by the Institute of Advanced Legal 
                Studies with considerable success since 2004.
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#4caf50] hover:bg-[#43a047] text-white px-8 py-4 rounded-sm font-bold text-sm transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1">
                  Apply <ExternalLink size={16} />
                </button>
                <button className="bg-[#43a047]/20 border border-[#4caf50] hover:bg-[#4caf50] text-white px-8 py-4 rounded-sm font-bold text-sm transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1">
                  Download Brochure <Download size={16} />
                </button>
              </div>
            </div>

            {/* CTA Image Column */}
            <div className="lg:w-1/2 lg:translate-y-10" data-aos="fade-left">
              <div className="relative h-[300px] lg:h-[380px] w-full rounded-sm overflow-hidden shadow-2xl border-b-8 border-[#4caf50]">
                <Image 
                  src="/professor_cta.png" 
                  alt="Graduation Success"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
        
        {/* Decorative pattern for dark section */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden hidden lg:block">
           <div className="absolute top-0 right-0 w-96 h-96 border-8 border-white rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

    </section>
  );
}
