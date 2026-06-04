"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";

interface Skill { name: string; level: number; }
export interface Faculty {
  id: string; name: string; role: string; email: string; phone: string;
  room: string; image: string; biography: string;
  qualifications: string[]; education: string[];
  publications: string[]; skills: Skill[];
}

const columns: Column<Faculty>[] = [
  {
    key: "image", label: "Photo",
    render: (v) => (
      <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0"
        style={{ backgroundColor: "var(--bg-input)" }}>
        {String(v) && <Image src={String(v)} alt="faculty" fill sizes="40px" className="object-cover" unoptimized />}
      </div>
    ),
  },
  {
    key: "name", label: "Name", sortable: true,
    render: (v) => (
      <span className="font-semibold text-sm" style={{ color: "var(--text)" }}>{String(v)}</span>
    ),
  },
  { key: "role", label: "Role", sortable: true, render: (v) => <StatusBadge value={String(v)} /> },
  { key: "email", label: "Email", sortable: true, hideOnMobile: true },
  { key: "phone", label: "Phone", hideOnMobile: true },
  { key: "room", label: "Office", hideOnMobile: true,
    render: (v) => (
      <span className="text-xs max-w-[160px] truncate block" style={{ color: "var(--text-muted)" }}
        title={String(v)}>{String(v)}</span>
    ),
  },
];

export default function FacultyPage() {
  const router = useRouter();
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_faculty");
    if (saved) { setFaculty(JSON.parse(saved)); setLoading(false); return; }
    fetch("/faculty.json")
      .then((r) => r.json())
      .then((d: Faculty[]) => {
        setFaculty(d);
        sessionStorage.setItem("admin_faculty", JSON.stringify(d));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function persist(updated: Faculty[]) {
    setFaculty(updated);
    sessionStorage.setItem("admin_faculty", JSON.stringify(updated));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Faculty</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{faculty.length} members</p>
        </div>
        <Link href="/admin/faculty/add"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: "#4caf50" }}>
          <Plus className="w-4 h-4" /> Add Faculty Member
        </Link>
      </div>

      <DataTable
        title=""
        columns={columns}
        data={faculty}
        loading={loading}
        onEdit={(row) => router.push(`/admin/faculty/edit/${row.id}`)}
        onDelete={(row) => persist(faculty.filter((f) => f.id !== row.id))}
      />
    </div>
  );
}
