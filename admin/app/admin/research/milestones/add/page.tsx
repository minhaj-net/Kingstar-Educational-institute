"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Award } from "lucide-react";
import type { ResearchMilestone, ResearchOverviewData } from "../../page";

const STORAGE_KEY = "admin_research_overview";

export default function AddMilestonePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ResearchMilestone>({ year: "", event: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.year.trim()) e.year = "Required";
    if (!form.event.trim()) e.event = "Required";
    setErrors(e); return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const current: ResearchOverviewData = raw ? JSON.parse(raw)
        : { stats: [], missionPoints: [], focusAreas: [], featuredProjects: [], milestones: [], partners: [] };
      const updated = { ...current, milestones: [...current.milestones, form] };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaving(false);
      router.push("/admin/research");
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/research" className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Add Milestone</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Add a research history milestone</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/research" className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Award className="w-4 h-4" />}
              {saving ? "Saving…" : "Add Milestone"}
            </button>
          </div>
        </div>

        <div className="admin-card rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold border-b pb-3" style={{ color: "var(--text)", borderColor: "var(--border)" }}>
            Milestone Details
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              Year <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input name="year" value={form.year} onChange={handleChange}
              placeholder="e.g. 2024"
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.year ? "border-red-400" : ""}`} />
            {errors.year && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.year}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              Event / Achievement <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input name="event" value={form.event} onChange={handleChange}
              placeholder="e.g. Research funding surpasses $420M for the first time"
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.event ? "border-red-400" : ""}`} />
            {errors.event && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.event}</p>}
          </div>

          {/* Preview */}
          {(form.year || form.event) && (
            <div className="flex gap-4 items-start p-4 rounded-xl"
              style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}>
              <div className="w-14 h-14 rounded-xl bg-[#4caf50] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {form.year || "—"}
              </div>
              <p className="text-sm pt-4" style={{ color: "var(--text)" }}>{form.event || "—"}</p>
            </div>
          )}
        </div>

        <button type="submit" disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <Award className="w-4 h-4" />}
          {saving ? "Saving…" : "Add Milestone"}
        </button>
      </div>
    </form>
  );
}
