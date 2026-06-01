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
  ChevronRight
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

interface FacultyMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string;
  qualifications: string[];
}

const sidebarLinks = [
  { label: "Course Curriculum", href: "/finance#curriculum" },
  { label: "Finance Faculty", href: "#" },
  { label: "Scholarships", href: "#" },
  { label: "Application", href: "#" }
];

export default function FacultyListSection() {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetch("/faculty.json")
      .then(res => res.json())
      .then(data => setFaculty(data))
      .catch(err => console.error("Error loading faculty:", err));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-12 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#4caf50]">Home</Link>
          <ChevronRight size={10} />
          <Link href="/business-administration" className="hover:text-[#4caf50]">Bachelor Of Science in Business Administration</Link>
          <ChevronRight size={10} />
          <Link href="/finance" className="hover:text-[#4caf50]">Finance</Link>
          <ChevronRight size={10} />
          <span className="text-[#4caf50]">Finance Faculty</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Faculty List (Left) */}
          <div className="lg:col-span-8 space-y-16">
            {faculty.map((member) => (
              <div 
                key={member.id} 
                className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 pb-16 last:border-0"
                data-aos="fade-up"
              >
                {/* Profile Image */}
                <div className="w-full md:w-64 h-64 relative rounded-sm overflow-hidden flex-shrink-0 shadow-md">
                   <Image 
                     src={member.image} 
                     alt={member.name}
                     fill
                     className="object-cover"
                   />
                </div>

                {/* Info Text */}
                <div className="flex-grow space-y-4">
                  <div className="flex gap-4 mb-2">
                     <button className="text-blue-600 hover:text-[#4caf50] transition-colors"><Globe size={14} /></button>
                     <button className="text-blue-700 hover:text-[#4caf50] transition-colors"><Globe size={14} /></button>
                     <button className="text-[#4caf50] hover:text-[#4caf50] transition-colors"><Globe size={14} /></button>
                     <button className="text-sky-500 hover:text-[#4caf50] transition-colors"><Globe size={14} /></button>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1a2e5a]">{member.name}</h3>
                  <p className="text-gray-400 text-sm font-medium -mt-2">{member.role}</p>

                  <div className="space-y-2 py-2">
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <Mail size={16} className="text-[#1a2e5a]" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <Phone size={16} className="text-[#1a2e5a]" />
                      <span>{member.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-gray-500 text-sm leading-relaxed italic">
                    {member.qualifications.map((q, i) => (
                      <p key={i}>– {q}</p>
                    ))}
                  </div>

                  <Link 
                    href={`/finance-faculty/${member.id}`}
                    className="inline-block bg-[#4caf50] hover:bg-[#43a047] text-white px-8 py-3 rounded-sm font-bold text-sm transition-all mt-4 transform hover:-translate-y-1"
                  >
                    More Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Finance Major Multi-Box */}
            <div className="bg-gray-50 rounded-sm overflow-hidden shadow-sm" data-aos="fade-left">
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

            {/* Department Contact Card */}
            <div 
              data-aos="fade-left"
              data-aos-delay="100"
              className="bg-[#1a2e5a] p-10 text-white rounded-sm shadow-xl"
            >
              <h4 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">
                Department Contact Info
              </h4>
              <div className="space-y-8">
                <p className="text-[#4caf50] font-bold text-sm tracking-widest uppercase mb-4 leading-relaxed">
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
                    <span>bsba@kuuniver.edu</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#4caf50] italic py-2">
                    <Clock size={17} />
                    <span>Mon - Fri 9:00A.M. - 5:00P.M.</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Social Info</p>
                  <div className="flex gap-5">
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                    <button className="text-white/60 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                  </div>
                </div>

                <button className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white py-4 rounded-sm font-bold text-sm transition-all shadow-md mt-4">
                  Student Resources
                </button>
              </div>
            </div>

            {/* Event Highlight Box */}
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
              <button className="bg-[#4caf50] hover:bg-[#43a047] text-white px-8 py-3 rounded-sm font-bold text-xs transition-colors shadow-sm">
                Click to see more
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
