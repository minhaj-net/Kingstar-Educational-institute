"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import DataTable, { Column } from "../_components/DataTable";

export interface KUEvent {
  id: number; day: string; month: string; title: string;
  time: string; location: string; image: string;
}

const columns: Column<KUEvent>[] = [
  {
    key: "image", label: "Photo",
    render: (v) => (
      <div className="w-12 h-9 rounded-lg overflow-hidden relative flex-shrink-0"
        style={{ backgroundColor: "var(--bg-input)" }}>
        {String(v) && <Image src={String(v)} alt="event" fill sizes="48px" className="object-cover" unoptimized />}
      </div>
    ),
  },
  {
    key: "day", label: "Date",
    render: (_, row) => (
      <div className="flex flex-col items-start">
        <span className="text-lg font-extrabold leading-none" style={{ color: "#4caf50" }}>{row.day}</span>
        <span className="text-xs font-bold tracking-widest" style={{ color: "var(--text-faint)" }}>{row.month}</span>
      </div>
    ),
  },
  { key: "title", label: "Title", sortable: true,
    render: (v) => (
      <span className="font-semibold text-sm max-w-[220px] truncate block"
        style={{ color: "var(--text)" }} title={String(v)}>{String(v)}</span>
    ) },
  { key: "time", label: "Time", hideOnMobile: true },
  { key: "location", label: "Location", sortable: true },
];

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<KUEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_events");
    if (saved) { setEvents(JSON.parse(saved)); setLoading(false); return; }
    fetch("/events.json")
      .then((r) => r.json()).then((d: KUEvent[]) => {
        setEvents(d);
        sessionStorage.setItem("admin_events", JSON.stringify(d));
      }).catch(console.error).finally(() => setLoading(false));
  }, []);

  function persist(updated: KUEvent[]) {
    setEvents(updated);
    sessionStorage.setItem("admin_events", JSON.stringify(updated));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Events</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{events.length} events</p>
        </div>
        <Link href="/admin/events/add"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: "#4caf50" }}>
          <Plus className="w-4 h-4" /> Add Event
        </Link>
      </div>
      <DataTable title="" columns={columns} data={events} loading={loading}
        onEdit={(row) => router.push(`/admin/events/edit/${row.id}`)}
        onDelete={(row) => persist(events.filter((e) => e.id !== row.id))} />
    </div>
  );
}
