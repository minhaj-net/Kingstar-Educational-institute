"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  Folder,
  Tag,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tag: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const POSTS_PER_PAGE = 4;

const recentPosts = [
  { title: "A Global MBA for the Next Generation", date: "June 6, 2018", image: "/slide-1.jpg" },
  { title: "Professor Albert Research on Mobile Money", date: "June 6, 2018", image: "/slide-2.jpg" },
  { title: "Professor Tom on Voluntary Recalls", date: "June 6, 2018", image: "/slide-3.jpg" },
  { title: "KU Alumni Connect Platform Launched", date: "August 20, 2018", image: "/slide-4.jpg" },
];

const categories = [
  { name: "Academics",   count: 2 },
  { name: "Research",    count: 1 },
  { name: "Events",      count: 2 },
  { name: "Technology",  count: 1 },
  { name: "Athletics",   count: 1 },
  { name: "Campus Life", count: 2 },
  { name: "Alumni",      count: 1 },
  { name: "Admissions",  count: 1 },
];

const tagCloud = ["HOT", "RESEARCH", "EVENT", "ARTICLE", "UPDATES", "STUDENT", "ADMISSION", "ALUMNI"];

// ─── Tag color map ────────────────────────────────────────────────────────────

function tagColor(tag: string) {
  const map: Record<string, string> = {
    HOT:       "bg-red-100 text-red-600",
    RESEARCH:  "bg-blue-100 text-blue-600",
    EVENT:     "bg-purple-100 text-purple-600",
    ARTICLE:   "bg-yellow-100 text-yellow-700",
    UPDATES:   "bg-green-100 text-green-700",
    STUDENT:   "bg-indigo-100 text-indigo-600",
    ADMISSION: "bg-orange-100 text-orange-600",
    ALUMNI:    "bg-teal-100 text-teal-600",
  };
  return map[tag] ?? "bg-gray-100 text-gray-600";
}

// ─── Blog Card ────────────────────────────────────────────────────────────────

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Hover lift effect
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const enter = () => gsap.to(el, { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)", duration: 0.25, ease: "power2.out" });
    const leave = () => gsap.to(el, { y: 0,  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",  duration: 0.25, ease: "power2.in"  });
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <article
      ref={cardRef}
      className="group bg-white border border-gray-100 overflow-hidden"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      data-aos="fade-up"
      data-aos-delay={index * 80}
    >
      {/* ── Full-width top image ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(200px, 28vw, 320px)" }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* ── Content below image ── */}
      <div className="px-6 py-6 flex flex-col gap-4">

        {/* Title */}
        <h2
          className="text-[#1a2e5a] font-bold leading-snug hover:text-[#4caf50] transition-colors duration-200 cursor-pointer"
          style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)" }}
        >
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Meta row — date / by author / category / comments */}
        <div className="flex flex-wrap items-center gap-0 text-xs text-gray-400 uppercase tracking-wide font-medium">
          <span className="flex items-center gap-1">
            <Calendar size={11} className="text-gray-400" />
            {post.date}
          </span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="flex items-center gap-1">
            BY {post.author.toUpperCase()}
          </span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="flex items-center gap-1 text-gray-400">
            <Folder size={11} />
            {post.category.toUpperCase()}
          </span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="flex items-center gap-1 text-gray-400">
            💬 1
          </span>
        </div>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          {post.excerpt}
        </p>

        {/* Read More button */}
        <div className="pt-1">
          <Link
            href={`/blogs/${post.slug}`}
            className="inline-block bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-bold px-6 py-2.5 transition-colors duration-300"
          >
            Read More
          </Link>
        </div>

      </div>
    </article>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        aria-label="Previous page"
        className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-[#1a2e5a] hover:text-[#1a2e5a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 rounded-sm"
      >
        <ChevronLeft size={15} />
      </button>

      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-label={`Page ${p}`}
          aria-current={p === current ? "page" : undefined}
          className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-sm border transition-all duration-200
            ${p === current
              ? "bg-[#1a2e5a] text-white border-[#1a2e5a]"
              : "border-gray-200 text-gray-600 hover:border-[#1a2e5a] hover:text-[#1a2e5a]"
            }`}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        aria-label="Next page"
        className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-[#1a2e5a] hover:text-[#1a2e5a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 rounded-sm"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar() {
  const [search, setSearch] = useState("");
  const sideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sideRef.current?.querySelectorAll(".sidebar-widget") ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: {
            trigger: sideRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sideRef);
    return () => ctx.revert();
  }, []);

  return (
    <aside ref={sideRef} className="flex flex-col gap-7">

      {/* ── Search ── */}
      <div className="sidebar-widget">
        <h4 className="text-[#1a2e5a] font-bold text-base mb-3 pb-2 border-b-2 border-[#4caf50] inline-block">
          Search
        </h4>
        <div className="flex mt-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#1a2e5a] rounded-l-sm"
          />
          <button className="bg-[#1a2e5a] hover:bg-[#4caf50] text-white px-3 py-2 transition-colors duration-200 rounded-r-sm">
            <Search size={15} />
          </button>
        </div>
      </div>

      {/* ── Recent Posts ── */}
      <div className="sidebar-widget">
        <h4 className="text-[#1a2e5a] font-bold text-base mb-4 pb-2 border-b-2 border-[#4caf50] inline-block">
          Recent Posts
        </h4>
        <div className="flex flex-col gap-3 mt-3">
          {recentPosts.map((post) => (
            <Link
              key={post.title}
              href="#"
              className="flex gap-3 items-start group"
            >
              <div className="relative flex-shrink-0 overflow-hidden rounded-sm" style={{ width: "64px", height: "48px" }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-[#1a2e5a] text-xs font-semibold leading-snug group-hover:text-[#4caf50] transition-colors duration-200 line-clamp-2">
                  {post.title}
                </p>
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <Calendar size={10} />
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="sidebar-widget">
        <h4 className="text-[#1a2e5a] font-bold text-base mb-4 pb-2 border-b-2 border-[#4caf50] inline-block">
          Categories
        </h4>
        <ul className="flex flex-col gap-1 mt-3">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                href="#"
                className="flex items-center justify-between py-2 px-3 text-sm text-gray-600 hover:bg-[#1a2e5a] hover:text-white rounded-sm transition-all duration-200 group"
              >
                <span className="flex items-center gap-2">
                  <ChevronRight size={12} className="text-[#4caf50] group-hover:text-white transition-colors" />
                  {cat.name}
                </span>
                <span className="text-xs bg-gray-100 group-hover:bg-white/20 text-gray-500 group-hover:text-white px-2 py-0.5 rounded-full transition-colors duration-200">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Tags ── */}
      <div className="sidebar-widget">
        <h4 className="text-[#1a2e5a] font-bold text-base mb-4 pb-2 border-b-2 border-[#4caf50] inline-block">
          Tags
        </h4>
        <div className="flex flex-wrap gap-2 mt-3">
          {tagCloud.map((tag) => (
            <Link
              key={tag}
              href="#"
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-[#1a2e5a] hover:text-white hover:border-[#1a2e5a] transition-all duration-200 rounded-sm"
            >
              <Tag size={10} />
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Newsletter widget ── */}
      <div className="sidebar-widget relative overflow-hidden rounded-sm">
        <div className="absolute inset-0">
          <Image src="/slide-3.jpg" alt="Newsletter" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#1a2e5a]/85" />
        </div>
        <div className="relative z-10 p-6 flex flex-col gap-3 text-center">
          <h4 className="text-white font-bold text-base">Subscribe</h4>
          <p className="text-white/70 text-xs">Get the latest posts in your inbox</p>
          <input
            type="email"
            placeholder="Your email address"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs px-3 py-2 focus:outline-none focus:border-[#4caf50] rounded-sm"
          />
          <button className="w-full bg-[#4caf50] hover:bg-[#43a047] text-white text-xs font-bold py-2 rounded-sm transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>

    </aside>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });
    fetch("/blogs.json")
      .then((r) => r.json())
      .then((data: BlogPost[]) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginated = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = useCallback((page: number) => {
    if (!listRef.current) {
      setCurrentPage(page);
      return;
    }
    // Animate out
    gsap.to(listRef.current, {
      opacity: 0, y: 20, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        setCurrentPage(page);
        window.scrollTo({ top: listRef.current!.offsetTop - 100, behavior: "smooth" });
        // Animate in
        gsap.fromTo(
          listRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      },
    });
  }, []);

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 xl:gap-14 items-start">

          {/* ── LEFT: Blog posts ── */}
          <div>
            {loading ? (
              /* Skeleton */
              <div className="grid grid-cols-1 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-sm animate-pulse" style={{ height: "340px" }} />
                ))}
              </div>
            ) : (
              <>
                <div
                  ref={listRef}
                  className="grid grid-cols-1 gap-6"
                >
                  {paginated.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
                  <p className="text-sm text-gray-400">
                    Showing{" "}
                    <span className="font-semibold text-[#1a2e5a]">
                      {(currentPage - 1) * POSTS_PER_PAGE + 1}–
                      {Math.min(currentPage * POSTS_PER_PAGE, posts.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-[#1a2e5a]">{posts.length}</span>{" "}
                    posts
                  </p>
                  <Pagination
                    current={currentPage}
                    total={totalPages}
                    onChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <Sidebar />

        </div>
      </div>
    </div>
  );
}
