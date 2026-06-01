"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe,
  Play,
  Plus,
  Minus
} from "lucide-react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Sub-Components ──────────────────────────────────────────────────────────

const AccordionItem = ({ title, content, isOpen, onClick }: any) => {
  return (
    <div className="border-b border-gray-100 last:border-0 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left group transition-colors duration-300"
      >
        <span className={`text-base font-semibold transition-colors duration-300 ${isOpen ? "text-[#4caf50]" : "text-gray-700 group-hover:text-[#4caf50]"}`}>
          {title}
        </span>
        <div className={`p-1 rounded-full transition-all duration-300 ${isOpen ? "bg-[#4caf50] text-white rotate-180" : "bg-gray-100 text-gray-500"}`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100 pb-6" : "max-h-0 opacity-0"}`}
      >
        <p className="text-gray-500 text-sm leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
};

const DonationOptionCard = ({ title, icon }: any) => (
  <div 
    className="relative group h-32 md:h-28 overflow-hidden rounded-sm cursor-pointer"
    data-aos="zoom-in"
  >
    <div className="absolute inset-0 bg-[#4caf50]/80 group-hover:bg-[#4caf50] transition-colors duration-300 z-10 flex items-center justify-center px-4">
      <span className="text-white font-bold text-sm text-center transform group-hover:scale-110 transition-transform duration-300">
        {title}
      </span>
    </div>
    <div className="absolute inset-0 bg-gray-200" />
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const AboutFundSection = () => {
  const [openAccordion, setOpenAccordion] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const accordionItems = [
    {
      title: "Student Scholarships",
      content: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections."
    },
    {
      title: "Schools & Colleges",
      content: "Kingstar University provides various funding options for different schools and colleges to ensure research and educational excellence across all disciplines."
    },
    {
      title: "Library & Cultural Institutions",
      content: "Our libraries and cultural centers are the heart of our campus. Your donations help us preserve history and provide modern resources for all students."
    },
    {
      title: "Kingster Sport Team",
      content: "Support our athletes as they strive for excellence on and off the field. Funding goes towards equipment, travel, and facility improvements."
    },
    {
      title: "Student Life",
      content: "Enhance the day-to-day experience of our students through better housing, student organizations, and wellness programs."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-[#4caf50] transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span className="text-gray-600">Give To Kingster</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8">
            
            {/* About Kingster Fund */}
            <div data-aos="fade-up">
              <h2 className="text-3xl font-bold text-[#1a2e5a] mb-6 tracking-tight">About Kingster Fund</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">
                We continues to adapt to new ways of teaching, new disciplines of study and new ways of learning. Your gift enriches the experience of all students by supporting efforts to recruit top faculty, expand academic programs and respond to the emerging needs of our campus and our world.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-10">
                Not only does Kingster University provide you the practical skills that is necessary to transition seamlessly into the workforce upon your graduation, but we also make sure that you will have a good sense of social justice so that you make the transition responsibly.
              </p>
            </div>

            {/* Campus Image */}
            <div 
              className="relative aspect-video rounded-sm overflow-hidden mb-16 shadow-lg"
              data-aos="zoom-out"
            >
              <Image 
                src="/campus_building.png" 
                alt="Kingstar Campus" 
                fill 
                className="object-cover"
              />
            </div>

            {/* Various Donation Options */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-[#1a2e5a] mb-8 relative inline-block">
                Various Donation Options
                <span className="absolute left-full ml-4 top-1/2 w-48 h-px bg-gray-100 hidden md:block" />
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <DonationOptionCard title="Student Scholarships" />
                <DonationOptionCard title="Schools & Colleges" />
                <DonationOptionCard title="Library & Cultural" />
                <DonationOptionCard title="Support Sport Team" />
                <DonationOptionCard title="Student Life" />
                <DonationOptionCard title="Emergency Fund" />
              </div>
            </div>

            {/* Why give to Kingster? (Accordion) */}
            <div>
              <h3 className="text-xl font-bold text-[#1a2e5a] mb-8 relative inline-block">
                Why give to Kingster?
                <span className="absolute left-full ml-4 top-1/2 w-48 h-px bg-gray-100 hidden md:block" />
              </h3>
              <div className="flex flex-col border-t border-gray-100">
                {accordionItems.map((item, idx) => (
                  <AccordionItem 
                    key={idx}
                    title={item.title}
                    content={item.content}
                    isOpen={openAccordion === idx}
                    onClick={() => setOpenAccordion(openAccordion === idx ? -1 : idx)}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Become A Donor Button */}
            <Link 
              href="#"
              className="group flex items-center justify-between w-full bg-[#4caf50] text-white py-6 px-8 rounded-sm font-bold text-base hover:bg-[#43a047] transition-all duration-300 shadow-md shadow-green-100"
              data-aos="fade-left"
            >
              <span>Become A Donor</span>
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Contact Info Box */}
            <div 
              className="bg-[#1a2e5a] text-white p-8 rounded-sm space-y-8 shadow-xl"
              data-aos="fade-up"
            >
              <h4 className="text-xl font-bold border-l-4 border-[#4caf50] pl-4">Department Contact Info</h4>
              
              <div className="space-y-6">
                <div>
                  <h5 className="text-[#4caf50] text-sm font-semibold mb-1 uppercase tracking-wider">Office Of Development</h5>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-[#4caf50] flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-300 leading-relaxed">
                    1810 Campus Way NE<br />
                    Bothell, WA 98011-8246
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={18} className="text-[#4caf50] flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-300">+1-2345-5432-45</p>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={18} className="text-[#4caf50] flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-300">bsba@kuuniver.edu</p>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={18} className="text-[#4caf50] flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-300 italic">Mon – Fri 9:00A.M. – 5:00P.M.</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h5 className="text-sm font-semibold mb-4 uppercase tracking-widest text-gray-400">Social Info</h5>
                <div className="flex items-center gap-5">
                  {[Globe, Globe, Globe, Globe].map((Icon, idx) => (
                    <Link key={idx} href="#" className="hover:text-[#4caf50] transition-colors duration-300">
                      <Icon size={20} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Presentation */}
            <div data-aos="fade-up">
              <h4 className="bg-gray-100 text-[#1a2e5a] p-4 text-sm font-bold border-l-4 border-[#4caf50] mb-4 uppercase tracking-widest shadow-sm">
                Video Presentation
              </h4>
              <div className="relative aspect-video rounded-sm overflow-hidden group cursor-pointer shadow-lg">
                <Image 
                  src="/video_presentation.png" 
                  alt="Video Presentation" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#4caf50] flex items-center justify-center text-white shadow-xl animate-pulse">
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFundSection;
