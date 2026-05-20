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
  Download,
  ThumbsUp,
  Circle
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "next/navigation";

interface Skill {
  name: string;
  level: number;
}

interface FacultyMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  room?: string;
  image: string;
  qualifications: string[];
  biography: string;
  education: string[];
  publications: string[];
  skills: Skill[];
}

export default function FacultyDetailsPage() {
  const { id } = useParams();
  const [member, setMember] = useState<FacultyMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetch("/faculty.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find((m: FacultyMember) => m.id === id);
        setMember(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading faculty details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-[#1a2e5a] font-bold">Loading Professor Data...</div>;
  if (!member) return <div className="h-screen flex items-center justify-center text-red-500 font-bold">Faculty Member Not Found</div>;

  return (
    <main className="min-h-screen bg-white">
      {/* Detail Header / Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Image and Contact Sidebar (Design matches left col of 2nd image) */}
            <div className="lg:col-span-4 space-y-10" data-aos="fade-right">
              <div className="relative h-[450px] w-full rounded-sm overflow-hidden shadow-2xl">
                 <Image 
                   src={member.image} 
                   alt={member.name}
                   fill
                   className="object-cover"
                 />
              </div>

              {/* Personal Socials and Contact Detail */}
              <div className="space-y-8 bg-gray-50/50 p-8 rounded-sm">
                <div className="flex gap-6 border-b border-gray-100 pb-6">
                   <button className="text-blue-600 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                   <button className="text-blue-700 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                   <button className="text-pink-600 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                   <button className="text-sky-500 hover:text-[#4caf50] transition-colors"><Globe size={18} /></button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <Mail size={18} className="text-[#1a2e5a]" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <Phone size={18} className="text-[#1a2e5a]" />
                    <span>{member.phone}</span>
                  </div>
                  {member.room && (
                    <div className="flex items-start gap-4 text-sm text-gray-600">
                      <MapPin size={18} className="mt-1 text-[#1a2e5a]" />
                      <p className="leading-relaxed">{member.room}</p>
                    </div>
                  )}
                </div>

                <button className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white py-4 rounded-sm font-bold text-sm transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
                  Download CV <Download size={16} />
                </button>
              </div>
            </div>

            {/* Biography and Stats (Right column of 2nd image) */}
            <div className="lg:col-span-8 space-y-16" data-aos="fade-up">
              
              {/* Title and Short Quote */}
              <div>
                <h1 className="text-4xl font-bold text-[#1a2e5a] mb-2">{member.name}</h1>
                <p className="text-gray-400 font-medium text-lg mb-8">{member.role}</p>
                <div className="border-t border-[#4caf50] pt-8">
                  <p className="text-[#4caf50] text-xl font-medium italic leading-relaxed">
                    "If you're an educational professional who are looking to progress into management and consultancy, or an educational planning or development role, this is the best degree for you."
                  </p>
                </div>
              </div>

              {/* Biography Section */}
              <div className="space-y-6">
                 <h3 className="text-2xl font-bold text-[#1a2e5a] border-b border-gray-100 pb-4">Biography</h3>
                 <p className="text-gray-500 leading-relaxed text-[15px]">
                    {member.biography}
                 </p>
              </div>

              {/* Education Section */}
              <div className="space-y-8">
                 <h3 className="text-2xl font-bold text-[#1a2e5a] border-b border-gray-100 pb-4">Education</h3>
                 <div className="space-y-4">
                    {member.education?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-gray-600 group">
                         <div className="w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-[#4caf50] transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#4caf50]" />
                         </div>
                         <span className="text-[15px]">{item}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Publications Section */}
              <div className="space-y-8">
                 <h3 className="text-2xl font-bold text-[#1a2e5a] border-b border-gray-100 pb-4">Publications</h3>
                 <div className="space-y-6">
                    {member.publications?.map((pub, idx) => (
                      <div key={idx} className="flex items-start gap-4 text-gray-600 group">
                         <ThumbsUp size={18} className="mt-1 text-[#4caf50] group-hover:scale-110 transition-transform" />
                         <p className="text-[15px] leading-relaxed italic">{pub}</p>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-10">
                 <h3 className="text-2xl font-bold text-[#1a2e5a] border-b border-gray-100 pb-4">Skills</h3>
                 <div className="space-y-8">
                   {member.skills?.map((skill, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-end">
                           <span className="text-[11px] font-bold text-[#1a2e5a] tracking-widest uppercase">{skill.name}</span>
                           <span className="text-[11px] font-bold text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                           <div 
                             className="h-full bg-[#4caf50] transition-all duration-1000 ease-out" 
                             style={{ width: `${skill.level}%` }}
                           />
                        </div>
                      </div>
                   ))}
                 </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Spacing for footer */}
      <div className="h-12 mb-12" />
    </main>
  );
}
