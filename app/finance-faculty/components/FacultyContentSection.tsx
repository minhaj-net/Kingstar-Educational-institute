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
  ArrowRight,
  ChevronRight,
  Search,
  BookOpen
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const facultyMembers = [
  {
    name: "Dr. Carol Dawson",
    role: "Department Chair",
    qualification: "PhD in International Finance",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    specialization: "Asset Management"
  },
  {
    name: "Prof. John Hagensy",
    role: "Senior Professor",
    qualification: "PhD in Corporate Accounting",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    specialization: "Risk Theory"
  },
  {
    name: "Dr. Sarah Miller",
    role: "Associate Professor",
    qualification: "PhD in Financial Law",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80",
    specialization: "Market Regulation"
  },
  {
    name: "James Wilson (PhD)",
    role: "Researcher",
    qualification: "PhD in Strategic Finance",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    specialization: "Global Markets"
  }
];

const sidebarLinks = [
  { label: "Faculty Directory", href: "#" },
  { label: "Research Centers", href: "#" },
  { label: "Publications", href: "#" },
  { label: "Join the Team", href: "#" }
];

export default function FacultyContentSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-12">
          <Link href="/" className="hover:text-[#4caf50]">Home</Link>
          <ChevronRight size={10} />
          <Link href="/finance" className="hover:text-[#4caf50]">Finance</Link>
          <ChevronRight size={10} />
          <span className="text-[#4caf50]">Faculty</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Faculty Grid (Left) */}
          <div className="lg:col-span-8 space-y-12">
            
            <div data-aos="fade-up">
              <h2 className="text-3xl font-bold text-[#1a2e5a] mb-6">Our Esteemed Faculty</h2>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                The Kingster Finance Department is led by world-class educators and industry practitioners. 
                Our faculty members are dedicated to providing a rigorous academic environment while bridging 
                the gap between financial theory and real-world application.
              </p>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8" data-aos="fade-up">
              {facultyMembers.map((member, idx) => (
                <div key={idx} className="group bg-white rounded-sm border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#4caf50]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <span className="text-[#4caf50] text-[10px] font-bold uppercase tracking-widest block mb-2">{member.role}</span>
                    <h4 className="text-xl font-bold text-[#1a2e5a] mb-2 group-hover:text-[#4caf50] transition-colors">{member.name}</h4>
                    <p className="text-xs text-gray-400 mb-4">{member.qualification}</p>
                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                       <span className="text-xs font-medium text-gray-600">Expertise: {member.specialization}</span>
                       <button className="text-[#1a2e5a] hover:text-[#4caf50] transition-colors">
                         <Mail size={16} />
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Research Section Info */}
            <div className="bg-[#4caf50] p-10 text-white rounded-sm shadow-lg flex flex-col md:flex-row items-center gap-8" data-aos="fade-up">
               <div className="bg-white/20 p-5 rounded-full">
                  <BookOpen size={40} />
               </div>
               <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Faculty Research & Publications</h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Explore the latest academic papers, journal entries, and financial insights developed 
                    by our dedicated team of researchers.
                  </p>
               </div>
               <button className="bg-white text-[#4caf50] px-8 py-3 rounded-sm font-bold text-sm hover:bg-[#1a2e5a] hover:text-white transition-all transform hover:scale-105">
                 View Directory
               </button>
            </div>

          </div>

          {/* Sidebar Area (Right) */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Quick Links Box */}
            <div className="bg-gray-50 rounded-sm overflow-hidden" data-aos="fade-left">
              <div className="bg-[#1a2e5a] px-6 py-5 border-l-4 border-[#4caf50]">
                <h4 className="text-sm font-bold text-white tracking-wider uppercase">Faculty Resources</h4>
              </div>
              <div className="flex flex-col">
                {sidebarLinks.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href}
                    className="group px-6 py-4 flex items-center justify-between border-b border-gray-200 last:border-b-0 hover:bg-white transition-all"
                  >
                    <span className="text-sm text-gray-600 group-hover:text-[#4caf50] font-medium flex items-center gap-3">
                       <ArrowRight size={14} className="text-[#4caf50]" />
                       {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Box */}
            <div className="border border-gray-100 p-8 rounded-sm" data-aos="fade-left" data-aos-delay="100">
               <h4 className="text-sm font-bold text-[#1a2e5a] mb-6 tracking-wide uppercase">Find an Expert</h4>
               <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search by name/expertise..."
                    className="w-full bg-gray-50 border-none px-5 py-4 rounded-sm text-sm focus:ring-2 focus:ring-[#4caf50]"
                  />
                  <Search size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
               </div>
            </div>

            {/* Department CTA Box */}
            <div 
              data-aos="fade-left"
              data-aos-delay="200"
              className="bg-[#1a2e5a] p-10 text-white rounded-sm shadow-xl relative overflow-hidden"
            >
              <h4 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">Department Info</h4>
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4 text-sm text-gray-300">
                  <MapPin size={18} className="mt-1 flex-shrink-0 text-[#4caf50]" />
                  <p>1810 Campus Way NE<br />Bothell, WA 98011-8246</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <Phone size={17} className="text-[#4caf50]" />
                  <span>+1-2345-5432-45</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <Mail size={17} className="text-[#4caf50]" />
                  <span className="text-[#4caf50]">faculty@kuuniver.edu</span>
                </div>
              </div>
              <button className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white py-4 rounded-sm font-bold text-sm transition-all mt-10">
                Contact Admissions
              </button>
              <div className="absolute top-0 right-0 p-6 opacity-5">
                 <Search size={120} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
