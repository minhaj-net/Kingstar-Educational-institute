"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Handshake } from "lucide-react";
import type { ResearchOverviewData } from "../../page";

const STORAGE_KEY = "admin_research_overview";

const SUGGESTED = [
  "National Institutes of Health (NIH)",
  "National Science Foundation (NSF)",
  "DARPA",
  "Bill & Melinda Gates Foundation",
  "World Health Organization",
  "Google DeepMind",
  "European Research Council",
  "Wellcome Trust",
];

export default function AddPartnerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function validate() {
    if (!name.trim()) { setError("Partner name is required"); return false; }
    setError("");
    return true;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const current: ResearchOverviewData = raw ? JSON.parse(raw)
        : { stats: [], missionPoints: [], focusAreas: [], featuredProjects: [], milestones: [], partners: [] };
      // Prevent duplicates
      if (!current.partners.includes(name.trim())) {
        const updated = { ...current, partners: [...current.partners, name.trim()] };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      setSaving(false);
      router.push("/admin/research");
    }, 400);
  }

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
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Add Partner</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Add a research partner or funder
              </p>
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
              {saving
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Handshake className="w-4 h-4" />}
              {saving ? "Adding…" : "Add Partner"}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="admin-card rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold border-b pb-3"
            style={{ color: "var(--text)", borderColor: "var(--border)" }}>
            Partner Details
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1"
              style={{ color: "var(--text-muted)" }}>
              Partner / Funder Name <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder="e.g. National Science Foundation (NSF)"
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${error ? "border-red-400" : ""}`}
            />
            {error && <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>}
          </div>

          {/* Quick suggestions */}
          <div>
            <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-muted)" }}>
              Quick suggestions — click to fill:
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setName(s); setError(""); }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    backgroundColor: name === s ? "#4caf50" : "var(--bg-input)",
                    color: name === s ? "white" : "var(--text-muted)",
                    border: `1px solid ${name === s ? "#4caf50" : "var(--border)"}`,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
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
            : <Handshake className="w-4 h-4" />}
          {saving ? "Adding…" : "Add Partner"}
        </button>
      </div>
    </form>
  );
}
