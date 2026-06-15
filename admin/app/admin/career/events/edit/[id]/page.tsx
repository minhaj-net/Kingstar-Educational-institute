"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, Loader } from "lucide-react";
import type { CareerEvent } from "../../../page";

const STORAGE_KEY = "admin_career_events";
const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [form, setForm] = useState<CareerEvent | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;
    function load(data: CareerEvent[]) {
      const found = data.find((e) => e.id === id);
      if (!found) { setNotFound(true); return; }
      setForm({ ...found });
    }
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) { try { load(JSON.parse(raw)); return; } catch { /* fall */ } }
    fetch("/career-events.json")
      .then((r) => r.json())
      .then((d: CareerEvent[]) => { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d)); load(d); })
      .catch(() => setNotFound(true));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => p ? { ...p, [name]: value } : p);
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function validate() {
    if (!form) return false;
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.day.trim())   e.day   = "Required";
    setErrors(e); return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !form) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const all: CareerEvent[] = raw ? JSON.parse(raw) : [];
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all.map((ev) => ev.id === id ? form! : ev)));
      setSaving(false);
      router.push("/admin/career");
    }, 500);
  }

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg font-semibold" style={{ color: "var(--text)" }}>Event not found</p>
      <Link href="/admin/career" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: "#4caf50" }}>← Back to Career</Link>
    </div>
  );

  if (!form) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader className="w-8 h-8 animate-spin" style={{ color: "#4caf50" }} />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/career" className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Edit Career Event</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Editing: <span style={{ color: "#4caf50" }}>#{id}</span> — {form.title.slice(0,50)}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/career" className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>Discard</Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Calendar className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="admin-card rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold border-b pb-3" style={{ color: "var(--text)", borderColor: "var(--border)" }}>
            Event Details
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              Event Title <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input name="title" value={form.title} onChange={handleChange}
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title ? "border-red-400" : ""}`} />
            {errors.title && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                Day <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input name="day" value={form.day} onChange={handleChange}
                className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.day ? "border-red-400" : ""}`} />
              {errors.day && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.day}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Month</label>
              <select name="month" value={form.month} onChange={handleChange}
                className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Description</label>
            <textarea name="desc" value={form.desc} onChange={handleChange} rows={3}
              className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Location</label>
            <input name="location" value={form.location} onChange={handleChange}
              className="admin-input rounded-xl px-3 py-2.5 text-sm" />
          </div>
        </div>

        <button type="submit" disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <Calendar className="w-4 h-4" />}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
