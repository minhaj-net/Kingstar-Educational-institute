"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  Newspaper,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Image,
  Briefcase,
  Heart,
  School,
  Trophy,
  Building2,
  Globe,
  Tag,
  FileText,
  DollarSign,
  UserCircle,
  MapPin,
  Megaphone,
  FlaskConical,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

// ─── Nav structure ────────────────────────────────────────────────────────────

interface NavChild {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  group: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
    children?: NavChild[];
  }[];
}

const navGroups: NavGroup[] = [
  {
    group: "Main",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Academics",
    items: [
      {
        label: "Courses",
        href: "/admin/courses",
        icon: BookOpen,
        children: [
          { label: "All Courses",    href: "/admin/courses",              icon: BookOpen },
          // { label: "Categories",     href: "/admin/courses/categories",   icon: Tag },
          { label: "Add Course",     href: "/admin/courses/add",          icon: FileText },
        ],
      },
      {
        label: "Instructor",
        href: "/admin/faculty",
        icon: GraduationCap,
          children: [
          { label: "All Instructor",    href: "/admin/faculty",              icon: BookOpen },
          // { label: "Categories",     href: "/admin/courses/categories",   icon: Tag },
          { label: "Add faculty",     href: "/admin/faculty/add",          icon: FileText },
        ],
      },
      // {
      //   label: "Programs",
      //   href: "/admin/programs",
      //   icon: School,
      //   children: [
      //     { label: "Undergraduate",  href: "/admin/programs/undergraduate", icon: School },
      //     { label: "Graduate",       href: "/admin/programs/graduate",      icon: School },
      //     { label: "Scholarships",   href: "/admin/programs/scholarships",  icon: DollarSign },
      //   ],
      // },
    ],
  },
  {
    group: "Students",
    items: [
      {
        label: "Students",
        href: "/admin/students",
        icon: Users,
        children: [
          { label: "All Students",   href: "/admin/students",              icon: Users },
          { label: "Admissions",     href: "/admin/students/admissions",   icon: FileText },
          { label: "Campus Tour",    href: "/admin/students/campus-tour",  icon: MapPin },
        ],
      },
      {
        label: "Alumni",
        href: "/admin/alumni",
        icon: UserCircle,
        children: [
          { label: "All Alumni",     href: "/admin/alumni",           icon: UserCircle },
          { label: "Add Alumni",     href: "/admin/alumni/add",       icon: FileText },
        ],
      },
    ],
  },
  {
    group: "Campus Life",
    items: [
      {
        label: "Events",
        href: "/admin/events",
        icon: Calendar,
        children: [
          { label: "All Events",     href: "/admin/events",           icon: Calendar },
          { label: "Add Event",      href: "/admin/events/add",       icon: FileText },
        ],
      },
      {
        label: "Athletics",
        href: "/admin/athletics",
        icon: Trophy,
      },
      {
        label: "University Life",
        href: "/admin/university-life",
        icon: Building2,
        children: [
          { label: "All University Life", href: "/admin/university-life",     icon: Building2 },
          { label: "Add Item",            href: "/admin/university-life/add", icon: FileText },
        ],
      },
    ],
  },
  {
    group: "Content",
    items: [
      {
        label: "Blog / News",
        href: "/admin/blogs",
        icon: Newspaper,
        children: [
          { label: "All Posts",      href: "/admin/blogs",                icon: Newspaper },
          { label: "Add Post",       href: "/admin/blogs/add",            icon: FileText },
          // { label: "Categories",     href: "/admin/blogs/categories",     icon: Tag },
        ],
      },
      {
        label: "Gallery",
        href: "/admin/gallery",
        icon: Image,
        children: [
          { label: "All Gallery", href: "/admin/gallery",     icon: Image },
          { label: "Add Photo",   href: "/admin/gallery/add", icon: FileText },
        ],
      },
      {
        label: "Portfolio",
        href: "/admin/portfolio",
        icon: Briefcase,
        children: [
          { label: "All Items",      href: "/admin/portfolio",            icon: Briefcase },
          { label: "Categories",     href: "/admin/portfolio/categories", icon: Tag },
        ],
      },
      {
        label: "Pages",
        href: "/admin/pages",
        icon: Globe,
        children: [
          { label: "About Us",       href: "/admin/pages/about",          icon: Globe },
          { label: "Contact",        href: "/admin/pages/contact",        icon: Megaphone },
          { label: "Price Table",    href: "/admin/pages/pricing",        icon: DollarSign },
        ],
      },
    ],
  },
  {
    group: "Commerce",
    items: [
      { label: "Shop",    href: "/admin/shop",    icon: ShoppingBag },
      { label: "Orders",  href: "/admin/orders",  icon: ShoppingCart },
      {
        label: "Give to KU",
        href: "/admin/donations",
        icon: Heart,
      },
    ],
  },
  {
    group: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

// Shield icon not in lucide bundle used — replace with a working one
function Shield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// ─── Single nav item (may have children) ─────────────────────────────────────

function NavItem({
  item,
  collapsed,
  onClose,
}: {
  item: NavGroup["items"][number];
  collapsed: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const selfActive = isActive(item.href);
  const childActive = item.children?.some((c) => isActive(c.href)) ?? false;
  const highlighted = selfActive || childActive;

  if (item.children && !collapsed) {
    return (
      <li>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
          style={{
            color: highlighted ? "var(--accent)" : "var(--text-muted)",
            backgroundColor: highlighted ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
          }}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium flex-1 text-left whitespace-nowrap overflow-hidden">
            {item.label}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden ml-3 mt-0.5 pl-3 border-l-2 space-y-0.5"
              style={{ borderColor: "var(--border)" }}
            >
              {item.children.map((child) => {
                const ChildIcon = child.icon;
                const active = isActive(child.href);
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={onClose}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-200`}
                      style={{
                        backgroundColor: active ? "var(--accent)" : "transparent",
                        color: active ? "white" : "var(--text-muted)",
                      }}
                    >
                      <ChildIcon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{child.label}</span>
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  }

  return (
    <li>
      <motion.div whileHover={{ x: collapsed ? 0 : 2 }} transition={{ duration: 0.15 }}>
        <Link
          href={item.href}
          onClick={onClose}
          title={collapsed ? item.label : undefined}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
          style={{
            backgroundColor: highlighted ? "var(--accent)" : "transparent",
            color: highlighted ? "white" : "var(--text-muted)",
            boxShadow: highlighted ? "0 2px 8px color-mix(in srgb, var(--accent) 30%, transparent)" : "none",
          }}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>
    </li>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileOpen, setMobileOpen } = useThemeStore();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className="flex items-center justify-between px-4 py-4 border-b flex-shrink-0"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 bg-gradient-to-br from-[#1a2e5a] to-[#2d4a8a] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="font-bold text-sm whitespace-nowrap" style={{ color: "var(--text)" }}>Kingster Admin</p>
                <p className="text-xs whitespace-nowrap" style={{ color: "var(--text-faint)" }}>University Panel</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden flex-shrink-0"
          style={{ color: "var(--text-muted)" }}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4 scrollbar-hide">
        {navGroups.map((group) => (
          <div key={group.group}>
            {/* Group label */}
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[10px] font-bold uppercase tracking-widest px-3 mb-1.5"
                  style={{ color: "var(--text-faint)" }}
                >
                  {group.group}
                </motion.p>
              )}
            </AnimatePresence>
            {sidebarCollapsed && (
              <div className="h-px mx-2 mb-2" style={{ backgroundColor: "var(--border)" }} />
            )}

            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  collapsed={sidebarCollapsed}
                  onClose={() => setMobileOpen(false)}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="hidden lg:flex px-4 py-3 border-t flex-shrink-0" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 transition-colors text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 64 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:flex flex-col flex-shrink-0 bg-sidebar border-r border-base h-screen sticky top-0 overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/40 z-20"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-base z-30 flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
