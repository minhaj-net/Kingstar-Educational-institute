"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, FlaskConical, Plus, X } from "lucide-react";
import type { FeaturedLab, LabsData } from "../page";

const STORAGE_KEY = "admin_research_labs";
const CLUSTER_OPTIONS = [
  "Biomedical & Health Sciences", "AI, Data & Computing",
  "Climate & Sustainability", "Physical & Chemical Sciences",
  "Social Sciences & Policy", "Engineering & Innovation",
];
const CLUSTER_COLORS: Record<string, string> = {
  "Biomedical & Health Sciences": "#4caf50",
  "AI, Data & Computing": "#1a2e5a",
  "Climate & Sustainability": "#c8a84b",
  "Physical & Chemical Sciences": "#4caf50",
  "Social Sciences & Policy": "#1a2e5a",
  "Engineering & Innovation": "#c8a84b",
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
        ? <textarea name={name} value={value} onChange={onChange} rows={3} required={required}
            placeholder={placeholder} className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none" />
        : <input type="text" name={name} value={value} onChange={onChange}
            placeholder={placeholder} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm" />}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold border-b pb-3"
        style={{ color: "var(--text)", borderColor: "var(--border)" }}>{title}</h3>
      {children}
    </div>
  );
}

export default function AddLabPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [achievementInput, setAchievementInput] = useState("");

  const [form, setForm] = useState<FeaturedLab>({
    name: "", shortName: "", cluster: CLUSTER_OPTIONS[0],
    clusterColor: CLUSTER_COLORS[CLUSTER_OPTIONS[0]],
    director: "", founded: "", staff: "", location: "",
    funding: "", desc: "", achievements: [],
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => {
      const next = { ...p, [name]: value };
      if (name === "cluster") next.clusterColor = CLUSTER_COLORS[value] ?? "#4caf50";
      return next;
    });
  }

  function addAchievement() {
    const a = achievementInput.trim();
    if (a) setForm((p) => ({ ...p, achievements: [...p.achievements, a] }));
    setAchievementInput("");
  }
  function removeAchievement(a: string) {
    setForm((p) => ({ ...p, achievements: p.achievements.filter((x) => x !== a) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const current: LabsData = raw ? JSON.parse(raw) : { stats: [], clusters: [], featuredLabs: [], facilities: [], contact: {} };
      const updated = { ...current, featuredLabs: [...current.featuredLabs, form] };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaving(false);
      router.push("/admin/research/labs-centers");
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/research/labs-centers"
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Add Featured Lab</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Add a new featured lab or research center</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/research/labs-centers"
              className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>Cancel</Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <FlaskConical className="w-4 h-4" />}
              {saving ? "Saving…" : "Add Lab"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-5">
            <Section title="Lab Identity">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Lab Name" name="name" value={form.name} onChange={handleChange}
                  placeholder="e.g. KU Artificial Intelligence Lab" required />
                <Field label="Short Code" name="shortName" value={form.shortName} onChange={handleChange}
                  placeholder="e.g. KU-AIL" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Research Cluster</label>
                <select name="cluster" value={form.cluster} onChange={handleChange}
                  className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                  {CLUSTER_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <Field label="Description" name="desc" value={form.desc} onChange={handleChange}
                multiline placeholder="Brief description of the lab's research focus and mission" />
            </Section>

            <Section title="Lab Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Director" name="director" value={form.director} onChange={handleChange}
                  placeholder="e.g. Prof. David Kwon" />
                <Field label="Founded" name="founded" value={form.founded} onChange={handleChange}
                  placeholder="e.g. 2010" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Staff" name="staff" value={form.staff} onChange={handleChange}
                  placeholder="e.g. 62 researchers" />
                <Field label="Funding" name="funding" value={form.funding} onChange={handleChange}
                  placeholder="e.g. $38M (active grants)" />
              </div>
              <Field label="Location" name="location" value={form.location} onChange={handleChange}
                placeholder="e.g. Engineering Tower, Floor 8–10" />
            </Section>

            <Section title="Key Achievements">
              <div className="flex gap-2">
                <input type="text" value={achievementInput}
                  onChange={(e) => setAchievementInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addAchievement(); } }}
                  placeholder="Type an achievement and press Enter"
                  className="admin-input rounded-xl px-3 py-2.5 text-sm flex-1" />
                <button type="button" onClick={addAchievement}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ backgroundColor: "#4caf50" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {form.achievements.length > 0 ? (
                <div className="space-y-2">
                  {form.achievements.map((a, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                      style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}>
                      <span style={{ color: "var(--text)" }}>{a}</span>
                      <button type="button" onClick={() => removeAchievement(a)}
                        className="opacity-50 hover:opacity-100 ml-2 flex-shrink-0">
                        <X className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs" style={{ color: "var(--text-faint)" }}>No achievements added yet.</p>
              )}
            </Section>
          </div>

          <div className="space-y-5">
            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Summary</h3>
              {[
                { label: "Name",    value: form.name || "—" },
                { label: "Code",    value: form.shortName || "—" },
                { label: "Cluster", value: form.cluster || "—" },
                { label: "Director",value: form.director || "—" },
                { label: "Achievements", value: `${form.achievements.length} added` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm gap-2">
                  <span className="flex-shrink-0" style={{ color: "var(--text-faint)" }}>{label}</span>
                  <span className="font-medium truncate text-right" style={{ color: "var(--text)" }}>{value}</span>
                </div>
              ))}
            </div>
            <button type="submit" disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <FlaskConical className="w-4 h-4" />}
              {saving ? "Saving…" : "Add Lab"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
