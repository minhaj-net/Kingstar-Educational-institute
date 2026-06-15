"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Briefcase } from "lucide-react";
import type { CareerJob } from "../../page";

const STORAGE_KEY = "admin_career_jobs";
const JOB_TYPES   = ["Full-time","Internship","Part-time","Faculty","Research","Contract"];
const DEPARTMENTS  = ["Computer Science & Engineering","Business Administration","School of Medicine","School of Law","Engineering","Art & Science","Hospitality Management","Development & Policy","Banking & Finance","Software Engineering","Business & Strategy"];

function Field({ label, name, value, onChange, placeholder = "", required = false }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <input type="text" name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="admin-input rounded-xl px-3 py-2.5 text-sm" />
    </div>
  );
}

export default function AddJobPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Omit<CareerJob, "id">>({
    title: "", company: "", location: "Dhaka, Bangladesh",
    type: "Full-time", department: "", posted: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.title.trim())   e.title   = "Required";
    if (!form.company.trim()) e.company = "Required";
    setErrors(e); return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const all: CareerJob[] = raw ? JSON.parse(raw) : [];
      const maxId = all.reduce((m, i) => Math.max(m, i.id), 0);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...all, { ...form, id: maxId + 1 }]));
      setSaving(false);
      router.push("/admin/career");
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/career" className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Add Job Listing</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Add a new job or internship opening</p>
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
                : <Briefcase className="w-4 h-4" />}
              {saving ? "Saving…" : "Add Job"}
            </button>
          </div>
        </div>

        {/* Form card */}
        <div className="admin-card rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold border-b pb-3" style={{ color: "var(--text)", borderColor: "var(--border)" }}>
            Job Details
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              Position Title <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input name="title" value={form.title} onChange={handleChange}
              placeholder="e.g. Lecturer, Department of Computer Science"
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title ? "border-red-400" : ""}`} />
            {errors.title && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.title}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              Organization <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input name="company" value={form.company} onChange={handleChange}
              placeholder="e.g. Kingster University / BRAC Bank Limited"
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.company ? "border-red-400" : ""}`} />
            {errors.company && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.company}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Job Type</label>
              <select name="type" value={form.type} onChange={handleChange}
                className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Department / Field</label>
              <select name="department" value={form.department} onChange={handleChange}
                className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                <option value="">Select department</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <Field label="Location" name="location" value={form.location} onChange={handleChange}
            placeholder="e.g. Dhaka, Bangladesh" />
          <Field label="Posted" name="posted" value={form.posted} onChange={handleChange}
            placeholder="e.g. 2 days ago / June 10, 2025" />
        </div>

        <button type="submit" disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <Briefcase className="w-4 h-4" />}
          {saving ? "Saving…" : "Add Job Listing"}
        </button>
      </div>
    </form>
  );
}
