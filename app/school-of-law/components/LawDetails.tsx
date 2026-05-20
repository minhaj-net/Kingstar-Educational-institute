"use client";

import React, { useEffect } from "react";
import { 
  Globe, 
  CheckCircle2, 
  Mail,
  Phone,
  MapPin,
  Clock
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const lawMajors = [
  { name: "Business Regulation", image: "/slide-4.jpg" },
  { name: "International Tax", image: "/slide-1.jpg" },
  { name: "Corporate Law", image: "/slide-2.jpg" }
];

const highlights = [
  "Banking",
  "Financial Sector Management",
  "Economic Policy",
  "Quantitative Finance"
];

export default function LawDetails() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Content Area (Left) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Title & Description */}
            <div data-aos="fade-up">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#1a2e5a] mb-6">
                Outstanding School Of Law
              </h2>
              <div className="space-y-6 text-gray-500 leading-relaxed text-[15px]">
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

            {/* Majors Selection */}
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-bold text-[#1a2e5a] mb-8 relative inline-block">
                Majors
                <span className="absolute left-full ml-4 top-1/2 w-80 h-px bg-gray-100 hidden md:block" />
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {lawMajors.map((major) => (
                  <div 
                    key={major.name} 
                    className="relative h-40 group overflow-hidden rounded-sm cursor-pointer border border-gray-100"
                  >
                    <img 
                      src={major.image} 
                      alt={major.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#4caf50]/80 group-hover:bg-[#4caf50]/90 transition-colors duration-300 flex items-center justify-center p-4">
                      <span className="text-white font-bold text-sm text-center tracking-wide group-hover:scale-110 transition-transform">
                        {major.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Program Highlight Quote */}
            <div 
              data-aos="fade-left" 
              className="bg-gray-50 border-l-4 border-[#4caf50] p-8 relative"
            >
              <p className="text-[#4caf50] text-lg font-medium italic leading-relaxed">
                "If you're an educational professional who are looking to progress into management and consultancy, or an educational planning or development role, this is the best degree for you."
              </p>
              <div className="absolute top-0 right-8 w-2 h-8 bg-[#4caf50]/20" />
            </div>

            {/* Extended Info */}
            <div data-aos="fade-up" className="space-y-6 text-gray-500 leading-relaxed text-[15px]">
               <p>
                 Provided by the KU Institute of Education, this programme is available by distance learning, 
                 allowing you to study flexibly while balancing work and personal lifes. The MSc Finance (EG. 
                 Banking) deepens your understanding of banks and financial markets, and how they relate to 
                 performance. It will help you to advance your career in finance and policy.
               </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12" data-aos="fade-up">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-4 text-gray-700 group cursor-default">
                  <div className="w-6 h-6 rounded-full border-2 border-[#4caf50] flex items-center justify-center group-hover:bg-[#4caf50] transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-[#4caf50] group-hover:bg-white" />
                  </div>
                  <span className="text-[15px] font-medium group-hover:text-[#4caf50] transition-colors">{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Sidebar Area (Right) */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Contact Information Card */}
            <div 
              data-aos="fade-left"
              className="bg-[#1a2e5a] p-10 text-white rounded-sm shadow-2xl relative overflow-hidden"
            >
              <h4 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">
                Department Contact Info
              </h4>
              <div className="space-y-8 relative z-10">
                <p className="text-[#4caf50] font-bold text-sm tracking-widest uppercase">
                  School Of Law
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 text-sm text-gray-300">
                    <MapPin size={18} className="mt-1 flex-shrink-0 text-[#4caf50]" />
                    <p className="leading-relaxed">1810 Campus Way NE<br />Bothell, WA 98011-8246</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <Phone size={17} className="text-[#4caf50]" />
                    <span>+1-2345-5432-45</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <Mail size={17} className="text-[#4caf50]" />
                    <span className="text-gray-100">bsba@kuuniver.edu</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 italic">
                    <Clock size={17} className="text-[#4caf50]" />
                    <span>Mon - Fri 9:00A.M. - 5:00P.M.</span>
                  </div>
                </div>

                {/* Social Presence */}
                <div className="pt-8 border-t border-white/10">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-5">Social Info</p>
                  <div className="flex gap-6">
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                  </div>
                </div>

                <button className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white py-4 rounded-sm font-bold text-sm transition-all duration-300 shadow-lg mt-6 active:scale-95">
                  Student Resources
                </button>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Globe size={120} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
