"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScheduleRow {
  time: string; place: string; room: string;
  dateRange: string; instructor: string;
}

export interface Course {
  id: string; title: string; department: string; campus: string;
  level: string; instructor: string; semester: string; credit: string;
  method: string; image: string; description: string; body: string;
  topics: string[]; schedule: ScheduleRow[];
}

// ─── Column definitions ───────────────────────────────────────────────────────

const columns: Column<Course>[] = [
  {
    key: "image", label: "Thumb",
    render: (v) => (
      <div className="w-12 h-9 rounded-lg overflow-hidden relative flex-shrink-0"
        style={{ backgroundColor: "var(--bg-input)" }}>
        {String(v) && (
          <Image src={String(v)} alt="course" fill sizes="48px" className="object-cover" unoptimized />
        )}
      </div>
    ),
  },
  {
    key: "id", label: "ID", sortable: true,
    render: (v) => (
      <span className="text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
        style={{ backgroundColor: "rgba(76,175,80,0.12)", color: "#4caf50" }}>
        {String(v)}
      </span>
    ),
  },
  {
    key: "title", label: "Title", sortable: true,
    render: (v) => (
      <span className="font-medium text-sm max-w-[200px] truncate block"
        style={{ color: "var(--text)" }} title={String(v)}>{String(v)}</span>
    ),
  },
  { key: "department", label: "Department", sortable: true, hideOnMobile: true },
  { key: "level", label: "Level", sortable: true, render: (v) => <StatusBadge value={String(v)} /> },
  { key: "instructor", label: "Instructor", sortable: true, hideOnMobile: true },
  { key: "semester", label: "Semester", hideOnMobile: true },
  { key: "credit", label: "Credit", hideOnMobile: true },
  { key: "method", label: "Method", render: (v) => <StatusBadge value={String(v)} /> },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_courses");
    if (saved) {
      setCourses(JSON.parse(saved));
      setLoading(false);
      return;
    }
    fetch("/courses.json")
      .then((r) => r.json())
      .then((d: Course[]) => {
        setCourses(d);
        sessionStorage.setItem("admin_courses", JSON.stringify(d));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function persist(updated: Course[]) {
    setCourses(updated);
    sessionStorage.setItem("admin_courses", JSON.stringify(updated));
  }

  function handleEdit(row: Course) {
    // Navigate to full edit page — data autofilled from sessionStorage
    router.push(`/admin/courses/edit/${row.id}`);
  }

  function handleDelete(row: Course) {
    persist(courses.filter((c) => c.id !== row.id));
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Courses</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
            {courses.length} courses total
          </p>
        </div>
        <Link
          href="/admin/courses/add"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: "#4caf50" }}
        >
          <Plus className="w-4 h-4" />
          Add New Course
        </Link>
      </div>

      {/* Table — Edit navigates to full-page form with autofill */}
      <DataTable
        title=""
        columns={columns}
        data={courses}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
