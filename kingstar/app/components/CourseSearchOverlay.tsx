"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, BookOpen, GraduationCap, Clock, ArrowRight, Loader2 } from "lucide-react";
import gsap from "gsap";

interface Course {
  id: string;
  title: string;
  department: string;
  level: string;
  instructor: string;
  image: string;
  topics: string[];
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CourseSearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load data once
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/courses.json");
        const data = await response.json();
        setAllCourses(data);
      } catch (error) {
        console.error("Failed to load courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // GSAP Animation
  useEffect(() => {
    if (!overlayRef.current) return;
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", display: "flex" }
      );
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
          setQuery("");
          setResults([]);
        }
      });
    }
  }, [isOpen]);

  // Live Search Logic
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(() => {
      const filtered = allCourses.filter(course => {
        const searchStr = `${course.title} ${course.id} ${course.department} ${course.topics.join(" ")}`.toLowerCase();
        return searchStr.includes(query.toLowerCase());
      }).slice(0, 8); // Limit to 8 results for performance/UI
      
      setResults(filtered);
      setLoading(false);
      
      // Animate results appearing
      if (resultsRef.current) {
        gsap.fromTo(
          resultsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
        );
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, allCourses]);

  const highlightMatch = (text: string, match: string) => {
    if (!match.trim()) return text;
    const parts = text.split(new RegExp(`(${match})`, "gi"));
    return parts.map((part, i) => 
      part.toLowerCase() === match.toLowerCase() 
        ? <span key={i} className="text-[#4caf50] font-bold">{part}</span> 
        : part
    );
  };

  if (!isOpen && !overlayRef.current) return null;

  return (
    <div
      ref={overlayRef}
      style={{ display: "none" }}
      className="fixed inset-0 bg-[#1a2e5a]/95 z-[100] flex flex-col items-center p-6 md:p-12 backdrop-blur-md"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-12 md:right-12 text-white/60 hover:text-white transition-all duration-300 hover:rotate-90 p-2"
        aria-label="Close search"
      >
        <X size={40} strokeWidth={1.5} />
      </button>

      <div className="w-full max-w-5xl mt-12 md:mt-24">
        {/* Search Input Area */}
        <div className="relative group mb-12">
          <div className="flex items-center gap-6 border-b-2 border-white/20 pb-4 transition-colors duration-300 group-focus-within:border-[#4caf50]">
            <Search className="text-white/40 group-focus-within:text-[#4caf50]" size={36} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for courses, IDs, or topics..."
              className="w-full bg-transparent text-white text-3xl md:text-5xl font-light outline-none placeholder:text-white/25"
            />
            {loading && <Loader2 className="animate-spin text-[#4caf50]" size={32} />}
          </div>
          <p className="text-white/30 text-xs mt-4 uppercase tracking-[0.2em] font-medium">
            Type to explore Kingstar University's academic catalog
          </p>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
          {query && results.length > 0 && (
            <div ref={resultsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`} // Assuming course details route
                  onClick={onClose}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#4caf50]/50 p-4 rounded-lg transition-all duration-300 flex gap-4 items-center"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-800">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] bg-[#4caf50] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {course.id}
                      </span>
                      <span className="text-[10px] text-white/50 flex items-center gap-1">
                        <GraduationCap size={10} /> {course.level}
                      </span>
                    </div>
                    <h4 className="text-white text-lg font-semibold line-clamp-1 group-hover:text-[#4caf50] transition-colors">
                      {highlightMatch(course.title, query)}
                    </h4>
                    <p className="text-white/40 text-xs line-clamp-1">
                      {course.department} • {course.instructor}
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-white/10 group-hover:text-[#4caf50] translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
            </div>
          )}

          {/* Empty/No Results States */}
          {query && results.length === 0 && !loading && (
            <div className="text-center py-20 animate__animated animate__fadeIn">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
                <BookOpen size={40} className="text-white/20" />
              </div>
              <h3 className="text-white text-2xl font-semibold mb-2">No results found</h3>
              <p className="text-white/40 max-w-md mx-auto">
                We couldn't find any courses matching "{query}". Try checking your spelling or using more general terms like "Science" or "Management".
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4caf50;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default CourseSearchOverlay;
