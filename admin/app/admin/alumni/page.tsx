"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";

export interface AlumniMember {
  id: number; name: string; date: string; category: string;
  title: string; image: string; slug: string;
}

const columns: Column<AlumniMember>[] = [
  {
    key: "image", label: "Photo",
    render: (v) => (
      <div className="w-10 h-10 rounded-lg overflow-hidden relative flex-shrink-0"
        style={{ backgroundColor: "var(--bg-input)" }}>
        {String(v) && <Image src={String(v)} alt="alumni" fill sizes="40px" className="object-cover" unoptimized />}
      </div>
    ),
  },
  { key: "name", label: "Name", sortable: true,
    render: (v) => <span className="font-semibold text-sm" style={{ color: "var(--text)" }}>{String(v)}</span> },
  { key: "category", label: "Category", render: (v) => <StatusBadge value={String(v)} /> },
  { key: "title", label: "Article Title", sortable: true, hideOnMobile: true,
    render: (v) => (
      <span className="text-sm max-w-[220px] truncate block" style={{ color: "var(--text-muted)" }} title={String(v)}>{String(v)}</span>
    ) },
  { key: "date", label: "Date", sortable: true, hideOnMobile: true },
];

export default function AlumniPage() {
  const router = useRouter();
  const [members, setMembers] = useState<AlumniMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_alumni");
    if (saved) { setMembers(JSON.parse(saved)); setLoading(false); return; }
    fetch("/alumni-members.json")
      .then((r) => r.json()).then((d: AlumniMember[]) => {
        setMembers(d);
        sessionStorage.setItem("admin_alumni", JSON.stringify(d));
      }).catch(console.error).finally(() => setLoading(false));
  }, []);

  function persist(updated: AlumniMember[]) {
    setMembers(updated);
    sessionStorage.setItem("admin_alumni", JSON.stringify(updated));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Alumni</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{members.length} members</p>
        </div>
        <Link href="/admin/alumni/add"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: "#4caf50" }}>
          <Plus className="w-4 h-4" /> Add Alumni
        </Link>
      </div>
      <DataTable title="" columns={columns} data={members} loading={loading}
        onEdit={(row) => router.push(`/admin/alumni/edit/${row.id}`)}
        onDelete={(row) => persist(members.filter((m) => m.id !== row.id))} />
    </div>
  );
}
