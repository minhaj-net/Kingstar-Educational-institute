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

const majors = [
  { name: "Accounting", image: "/slide-1.jpg" },
  { name: "Finance", image: "/slide-2.jpg" },
  { name: "Marketing", image: "/slide-3.jpg" }
];

const highlights = [
  "Banking",
  "Financial Sector Management",
  "Economic Policy",
  "Quantitative Finance"
];

export default function BusinessDetails() {
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
                Outstanding Academics essential business experience
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-[15px]">
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

            {/* Majors Grid */}
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-bold text-[#1a2e5a] mb-8 border-b-2 border-gray-100 pb-2 w-fit">Majors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {majors.map((major) => (
                  <div 
                    key={major.name} 
                    className="relative h-44 group overflow-hidden rounded-sm cursor-pointer"
                  >
                    <img 
                      src={major.image} 
                      alt={major.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[#4caf50]/80 opacity-90 transition-opacity duration-300 group-hover:opacity-40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg tracking-wider transition-transform duration-300 group-hover:scale-110">
                        {major.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Block */}
            <div 
              data-aos="fade-left" 
              className="bg-gray-50 border-l-4 border-[#4caf50] p-8"
            >
              <p className="text-[#4caf50] text-lg font-medium italic leading-relaxed">
                "If you're an educational professional who are looking to progress into management and consultancy, or an educational planning or development role, this is the best degree for you."
              </p>
            </div>

            {/* Secondary Text */}
            <div data-aos="fade-up" className="space-y-6 text-gray-600 leading-relaxed text-[15px]">
               <p>
                 Provided by the KU Institute of Education, this programme is available by distance learning, 
                 allowing you to study flexibly while balancing work and personal lives. The MSc Finance (Eq. 
                 Banking) deepens your understanding of banks and financial markets, and how they relate to 
                 performance. It will help you to advance your career in finance and policy.
               </p>
            </div>

            {/* Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-aos="fade-up">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 size={18} className="text-[#4caf50]" />
                  <span className="text-[15px]">{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Sidebar Area (Right) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Contact Box */}
            <div 
              data-aos="fade-left"
              className="bg-[#1a2e5a] p-8 text-white rounded-sm shadow-xl"
            >
              <h4 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">
                Department Contact Info
              </h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[#4caf50] font-bold text-sm mb-4 leading-relaxed uppercase tracking-wider">
                    Bachelor Of Science in Business Administration
                  </p>
                  <div className="flex items-start gap-4 text-sm text-gray-300">
                    <MapPin size={18} className="mt-1 flex-shrink-0" />
                    <p>1810 Campus Way NE<br />Bothell, WA 98011-8246</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <Phone size={17} />
                    <span>+1-2345-5432-45</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <Mail size={17} />
                    <span className="text-[#4caf50]">bsba@ku.univer.edu</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <Clock size={17} />
                    <span>Mon - Fri 9:00A.M. - 5:00P.M.</span>
                  </div>
                </div>

                {/* Socials */}
                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm font-bold mb-4">Social Info</p>
                  <div className="flex gap-4">
                    <button className="text-gray-400 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-gray-400 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-gray-400 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-gray-400 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-gray-400 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white py-4 rounded-sm font-bold text-sm transition-all duration-300 transform hover:-translate-y-1 shadow-lg mt-4">
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
