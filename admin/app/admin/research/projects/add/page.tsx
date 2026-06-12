"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, FlaskConical } from "lucide-react";
import type { ResearchProject, ResearchOverviewData } from "../../page";

const STORAGE_KEY = "admin_research_overview";
const TAG_OPTIONS = ["Biomedical", "AI & Computing", "Climate", "Social Sciences", "Engineering", "Humanities"];
const TAG_COLORS: Record<string, string> = {
  "Biomedical": "#4caf50",
  "AI & Computing": "#c8a84b",
  "Climate": "#1a2e5a",
  "Social Sciences": "#4caf50",
  "Engineering": "#c8a84b",
  "Humanities": "#1a2e5a",
};

function Field({ label, name, value, onChange, placeholder = "", required = false, multiline = false }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string; required?: boolean; multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {multiline
        ? <textarea name={name} value={value} onChange={onChange} rows={4} required={required}
            placeholder={placeholder} className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none" />
        : <input type="text" name={name} value={value} onChange={onChange}
            placeholder={placeholder} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm" />}
    </div>
  );
}

export default function AddProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<ResearchProject>({
    tag: TAG_OPTIONS[0], tagColor: TAG_COLORS[TAG_OPTIONS[0]],
    title: "", pi: "", dept: "", funding: "", year: "", desc: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => {
      const next = { ...p, [name]: value };
      if (name === "tag") next.tagColor = TAG_COLORS[value] ?? "#4caf50";
      return next;
    });
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.pi.trim()) e.pi = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const current: ResearchOverviewData = raw ? JSON.parse(raw)
        : { stats: [], missionPoints: [], focusAreas: [], featuredProjects: [], milestones: [], partners: [] };
      const updated = { ...current, featuredProjects: [...current.featuredProjects, form] };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaving(false);
      router.push("/admin/research");
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/research"
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Add Research Project</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Add a featured research project</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/research"
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
                : <FlaskConical className="w-4 h-4" />}
              {saving ? "Saving…" : "Add Project"}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="admin-card rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold border-b pb-3" style={{ color: "var(--text)", borderColor: "var(--border)" }}>
            Project Details
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              Title <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input name="title" value={form.title} onChange={handleChange}
              placeholder="e.g. Next-Generation mRNA Vaccine Platforms"
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title ? "border-red-400" : ""}`} />
            {errors.title && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Tag / Category</label>
              <select name="tag" value={form.tag} onChange={handleChange}
                className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                {TAG_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                Principal Investigator <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input name="pi" value={form.pi} onChange={handleChange}
                placeholder="e.g. Prof. Elena Vasquez"
                className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.pi ? "border-red-400" : ""}`} />
              {errors.pi && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.pi}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Department" name="dept" value={form.dept} onChange={handleChange}
              placeholder="e.g. School of Medicine" />
            <Field label="Funding" name="funding" value={form.funding} onChange={handleChange}
              placeholder="e.g. $12.4M — NIH Grant" />
          </div>

          <Field label="Period (Year)" name="year" value={form.year} onChange={handleChange}
            placeholder="e.g. 2022–2026" />

          <Field label="Description" name="desc" value={form.desc} onChange={handleChange} multiline
            placeholder="Brief description of the research project…" />

          {/* Tag color preview */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Tag Color:</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: `${form.tagColor}15`, color: form.tagColor }}>
              {form.tag}
            </span>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <FlaskConical className="w-4 h-4" />}
          {saving ? "Saving…" : "Add Project"}
        </button>
      </div>
    </form>
  );
}
