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

const engineeringMajors = [
  { name: "Construction", image: "/slide-2.jpg" },
  { name: "Cybersecurity", image: "/slide-4.jpg" },
  { name: "Electrical Engineering", image: "/slide-1.jpg" }
];

const highlights = [
  "Banking",
  "Financial Sector Management",
  "Economic Policy",
  "Quantitative Finance"
];

export default function EngineeringDetails() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Title Block */}
            <div data-aos="fade-up">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#1a2e5a] mb-6">
                Outstanding Academics essential engineering experience
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

            {/* Majors Multi-Cards */}
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-bold text-[#1a2e5a] mb-8 border-b-2 border-gray-100 pb-2 w-fit">Majors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {engineeringMajors.map((major) => (
                  <div 
                    key={major.name} 
                    className="relative h-40 group overflow-hidden rounded-sm cursor-pointer shadow-lg"
                  >
                    <img 
                      src={major.image} 
                      alt={major.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#4caf50]/80 group-hover:bg-[#4caf50]/90 transition-colors duration-300 flex items-center justify-center p-4">
                      <span className="text-white font-bold text-sm text-center transform transition-transform group-hover:scale-105">
                        {major.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Wrapper */}
            <div 
              data-aos="fade-left" 
              className="bg-gray-50 border-l-4 border-[#4caf50] p-8 shadow-sm"
            >
              <p className="text-[#4caf50] text-lg font-medium italic leading-relaxed">
                "If you're an educational professional who are looking to progress into management and consultancy, or an educational planning or development role, this is the best degree for you."
              </p>
            </div>

            {/* Secondary Copy */}
            <div data-aos="fade-up" className="space-y-6 text-gray-500 leading-relaxed text-[15px]">
               <p>
                 Provided by the KU Institute of Education, this programme is available by distance learning, 
                 allowing you to study flexibly while balancing work and personal lifes. The MSc Finance (EG. 
                 Banking) deepens your understanding of banks and financial markets, and how they relate to 
                 performance. It will help you to advance your career in finance and policy.
               </p>
            </div>

            {/* Highlight Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5" data-aos="fade-up">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-4 text-gray-700">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#4caf50]" />
                  </div>
                  <span className="text-[15px]">{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 translate-y-0 lg:-translate-y-12">
            
            <div 
              data-aos="fade-left"
              className="bg-[#1a2e5a] p-10 text-white rounded-sm shadow-2xl space-y-10"
            >
              <h4 className="text-xl font-bold border-b border-white/10 pb-4">
                Department Contact Info
              </h4>
              <div className="space-y-8">
                <p className="text-[#4caf50] font-bold text-sm tracking-widest uppercase">
                  Engineering
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 text-sm text-gray-300">
                    <MapPin size={18} className="mt-1 flex-shrink-0 text-[#c8a84b]" />
                    <p>1810 Campus Way NE<br />Bothell, WA 98011-8246</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <Phone size={17} className="text-[#c8a84b]" />
                    <span>+1-2345-5432-45</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <Mail size={17} className="text-[#c8a84b]" />
                    <span className="truncate">bsba@kuuniver.edu</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400 italic">
                    <Clock size={17} className="text-[#c8a84b]" />
                    <span>Mon - Fri 9:00A.M. - 5:00P.M.</span>
                  </div>
                </div>

                {/* Social Row */}
                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs font-bold text-[#4caf50] uppercase tracking-widest mb-4">Social Info</p>
                  <div className="flex gap-5">
                    {[1, 2, 3, 4].map((i) => (
                      <button key={i} className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white py-4 rounded-sm font-bold text-sm transition-all duration-300 transform hover:-translate-y-1 shadow-md">
                  Student Resources
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
