"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Award, Loader } from "lucide-react";
import type { ResearchMilestone, ResearchOverviewData } from "../../../page";

const STORAGE_KEY = "admin_research_overview";

export default function EditMilestonePage() {
  const router = useRouter();
  const params = useParams();
  const idx = Number(params?.id);

  const [form, setForm] = useState<ResearchMilestone | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isNaN(idx)) return;
    function load(d: ResearchOverviewData) {
      const m = d.milestones[idx];
      if (!m) { setNotFound(true); return; }
      setForm({ ...m });
    }
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) { try { load(JSON.parse(raw)); return; } catch { /* fall */ } }
    fetch("/research-overview.json")
      .then((r) => r.json())
      .then((d: ResearchOverviewData) => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d));
        load(d);
      })
      .catch(() => setNotFound(true));
  }, [idx]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((p) => p ? { ...p, [name]: value } : p);
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function validate() {
    if (!form) return false;
    const e: Record<string, string> = {};
    if (!form.year.trim())  e.year  = "Required";
    if (!form.event.trim()) e.event = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !form) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const current: ResearchOverviewData = raw ? JSON.parse(raw)
        : { stats: [], missionPoints: [], focusAreas: [], featuredProjects: [], milestones: [], partners: [] };
      const updated = {
        ...current,
        milestones: current.milestones.map((m, i) => i === idx ? form! : m),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaving(false);
      router.push("/admin/research");
    }, 500);
  }

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg font-semibold" style={{ color: "var(--text)" }}>Milestone not found</p>
      <Link href="/admin/research"
        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: "#4caf50" }}>
        ← Back to Research
      </Link>
    </div>
  );

  if (!form) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader className="w-8 h-8 animate-spin" style={{ color: "#4caf50" }} />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/research"
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Edit Milestone</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Editing: <span style={{ color: "#4caf50" }}>{form.year}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/research"
              className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>
              Discard
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Award className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="admin-card rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold border-b pb-3"
            style={{ color: "var(--text)", borderColor: "var(--border)" }}>
            Milestone Details
          </h3>

          {/* Year */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1"
              style={{ color: "var(--text-muted)" }}>
              Year <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="e.g. 2024"
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.year ? "border-red-400" : ""}`}
            />
            {errors.year && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.year}</p>}
          </div>

          {/* Event */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1"
              style={{ color: "var(--text-muted)" }}>
              Event / Achievement <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              name="event"
              value={form.event}
              onChange={handleChange}
              placeholder="e.g. Research funding surpasses $420M"
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.event ? "border-red-400" : ""}`}
            />
            {errors.event && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.event}</p>}
          </div>

          {/* Live preview */}
          <div className="flex gap-4 items-start p-4 rounded-xl"
            style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}>
            <div className="w-14 h-14 rounded-xl bg-[#4caf50] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {form.year || "—"}
            </div>
            <p className="text-sm pt-4" style={{ color: "var(--text)" }}>
              {form.event || "—"}
            </p>
          </div>
        </div>

        {/* Bottom save */}
        <button type="submit" disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          {saving
            ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <Award className="w-4 h-4" />}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
