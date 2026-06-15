"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar } from "lucide-react";
import type { CareerEvent } from "../../page";

const STORAGE_KEY = "admin_career_events";
const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

function Field({ label, name, value, onChange, placeholder = "", required = false, error = "" }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string; required?: boolean; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <input type="text" name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className={`admin-input rounded-xl px-3 py-2.5 text-sm ${error ? "border-red-400" : ""}`} />
      {error && <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>}
    </div>
  );
}

export default function AddEventPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Omit<CareerEvent, "id">>({
    day: "", month: "JUL", title: "", desc: "", location: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.day.trim())   e.day   = "Required";
    setErrors(e); return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const all: CareerEvent[] = raw ? JSON.parse(raw) : [];
      const maxId = all.reduce((m, i) => Math.max(m, i.id), 0);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...all, { ...form, id: maxId + 1 }]));
      setSaving(false);
      router.push("/admin/career");
    }, 500);
  }

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
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Add Career Event</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Add a new career fair or workshop</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/career" className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>Cancel</Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Calendar className="w-4 h-4" />}
              {saving ? "Saving…" : "Add Event"}
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
              placeholder="e.g. Annual Career Fair 2025"
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title ? "border-red-400" : ""}`} />
            {errors.title && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                Day <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input name="day" value={form.day} onChange={handleChange}
                placeholder="e.g. 15"
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
              placeholder="Brief description of the event…"
              className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none" />
          </div>

          <Field label="Location" name="location" value={form.location} onChange={handleChange}
            placeholder="e.g. KU Auditorium — Main Campus" />

          {/* Preview */}
          {(form.title || form.day) && (
            <div className="flex gap-4 items-start p-4 rounded-xl mt-2"
              style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}>
              <div className="w-14 h-14 rounded-xl bg-[#1a2e5a] flex flex-col items-center justify-center text-white flex-shrink-0">
                <span className="text-lg font-bold leading-none">{form.day || "—"}</span>
                <span className="text-[9px] font-bold tracking-widest mt-0.5 text-white/70">{form.month}</span>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--text)" }}>{form.title || "Event Title"}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{form.desc || "—"}</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>{form.location || "—"}</p>
              </div>
            </div>
          )}
        </div>

        <button type="submit" disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <Calendar className="w-4 h-4" />}
          {saving ? "Saving…" : "Add Career Event"}
        </button>
      </div>
    </form>
  );
}
