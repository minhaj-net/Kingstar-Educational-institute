"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar } from "lucide-react";
import ImageUploadField from "../../_components/ImageUploadField";
import type { KUEvent } from "../page";

const monthOptions = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

function Field({ label, name, value, onChange, required = false }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <input type="text" name={name} value={value} onChange={onChange} required={required}
        className="admin-input rounded-xl px-3 py-2.5 text-sm" />
    </div>
  );
}

export default function AddEventPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ day: "", month: "", title: "", time: "", location: "", image: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.day.trim())   e.day   = "Required";
    if (!form.month)        e.month = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem("admin_events");
      const all: KUEvent[] = raw ? JSON.parse(raw) : [];
      const newEvent: KUEvent = { ...form, id: Date.now() };
      sessionStorage.setItem("admin_events", JSON.stringify([...all, newEvent]));
      setSaving(false);
      router.push("/admin/events");
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/events"
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Add Event</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Fill in event details and click Publish</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/events"
              className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Calendar className="w-4 h-4" />}
              {saving ? "Publishing…" : "Publish Event"}
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left */}
          <div className="xl:col-span-2 admin-card rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold border-b pb-3"
              style={{ color: "var(--text)", borderColor: "var(--border)" }}>Event Details</h3>

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                Event Title <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input name="title" value={form.title} onChange={handleChange}
                className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title ? "border-red-400" : ""}`}
                placeholder="e.g. Fintech & Key Investment Conference" />
              {errors.title && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.title}</p>}
            </div>

            {/* Date row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                  Day <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input name="day" value={form.day} onChange={handleChange}
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.day ? "border-red-400" : ""}`}
                  placeholder="e.g. 17" />
                {errors.day && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.day}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                  Month <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <select name="month" value={form.month} onChange={handleChange}
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.month ? "border-red-400" : ""}`}
                  style={{ appearance: "none" }}>
                  <option value="">Select month</option>
                  {monthOptions.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                {errors.month && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.month}</p>}
              </div>
            </div>

            <Field label="Time" name="time" value={form.time} onChange={handleChange as (e: React.ChangeEvent<HTMLInputElement>) => void} />
            <Field label="Location" name="location" value={form.location} onChange={handleChange as (e: React.ChangeEvent<HTMLInputElement>) => void} />
          </div>

          {/* Right */}
          <div className="space-y-5">
            <div className="admin-card rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Event Image</h3>
              <ImageUploadField
                label="Event"
                value={form.image}
                onChange={(url) => setForm((p) => ({ ...p, image: url }))}
                previewHeight={160}
                placeholderIcon={<Calendar className="w-8 h-8" style={{ color: "var(--text-faint)" }} />}
              />
            </div>

            {/* Summary */}
            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Summary</h3>
              {[
                { label: "Date",     value: form.day && form.month ? `${form.day} ${form.month}` : "—" },
                { label: "Time",     value: form.time     || "—" },
                { label: "Location", value: form.location || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span style={{ color: "var(--text-faint)" }}>{label}</span>
                  <span className="font-medium text-right max-w-[150px] truncate" style={{ color: "var(--text)" }}>{value}</span>
                </div>
              ))}
            </div>

            <button type="submit" disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Calendar className="w-4 h-4" />}
              {saving ? "Publishing…" : "Publish Event"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
