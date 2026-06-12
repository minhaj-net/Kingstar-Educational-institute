"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Lightbulb, Loader } from "lucide-react";
import type { ResearchFocus, ResearchOverviewData } from "../../../page";

const STORAGE_KEY = "admin_research_overview";
const COLOR_OPTIONS = [
  { label: "Green",  value: "#4caf50" },
  { label: "Navy",   value: "#1a2e5a" },
  { label: "Gold",   value: "#c8a84b" },
  { label: "Purple", value: "#8b5cf6" },
  { label: "Red",    value: "#ef4444" },
];
const ICON_OPTIONS = ["FlaskConical","Globe2","Lightbulb","Users","Building2","Award","Microscope","BookOpen"];

export default function EditFocusPage() {
  const router = useRouter();
  const params = useParams();
  const idx = Number(params?.id);

  const [form, setForm] = useState<ResearchFocus | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNaN(idx)) return;
    function load(d: ResearchOverviewData) {
      const f = d.focusAreas[idx];
      if (!f) { setNotFound(true); return; }
      setForm({ ...f });
    }
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) { try { load(JSON.parse(raw)); return; } catch { /* fall */ } }
    fetch("/research-overview.json")
      .then((r) => r.json())
      .then((d: ResearchOverviewData) => { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d)); load(d); })
      .catch(() => setNotFound(true));
  }, [idx]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => p ? { ...p, [name]: value } : p);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form || !form.title.trim()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const current: ResearchOverviewData = raw ? JSON.parse(raw)
        : { stats: [], missionPoints: [], focusAreas: [], featuredProjects: [], milestones: [], partners: [] };
      const updated = {
        ...current,
        focusAreas: current.focusAreas.map((f, i) => i === idx ? form! : f),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaving(false);
      router.push("/admin/research");
    }, 500);
  }

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg font-semibold" style={{ color: "var(--text)" }}>Focus area not found</p>
      <Link href="/admin/research" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: "#4caf50" }}>← Back</Link>
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
            <Link href="/admin/research" className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Edit Focus Area</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Editing: <span style={{ color: "#4caf50" }}>{form.title}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/research" className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>
              Discard
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Lightbulb className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="admin-card rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold border-b pb-3" style={{ color: "var(--text)", borderColor: "var(--border)" }}>
            Focus Area Details
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              Title <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input name="title" value={form.title} onChange={handleChange}
              className="admin-input rounded-xl px-3 py-2.5 text-sm" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Description</label>
            <textarea name="desc" value={form.desc} onChange={handleChange} rows={3}
              className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Project Count</label>
              <input name="count" value={form.count} onChange={handleChange}
                className="admin-input rounded-xl px-3 py-2.5 text-sm" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Icon</label>
              <select name="icon" value={form.icon} onChange={handleChange}
                className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Color</label>
              <select name="color" value={form.color} onChange={handleChange}
                className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                {COLOR_OPTIONS.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl"
            style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${form.color}15` }}>
              <Lightbulb className="w-5 h-5" style={{ color: form.color }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{form.title}</p>
              <p className="text-xs" style={{ color: "var(--text-faint)" }}>{form.count}</p>
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <Lightbulb className="w-4 h-4" />}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
