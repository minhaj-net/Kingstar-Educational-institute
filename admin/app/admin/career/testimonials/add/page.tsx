"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Star } from "lucide-react";
import type { CareerTestimonial } from "../../page";

const STORAGE_KEY = "admin_career_testimonials";

export default function AddTestimonialPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Omit<CareerTestimonial, "id">>({
    name: "", role: "", year: "", quote: "", rating: 5,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === "rating" ? Number(value) : value }));
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name  = "Required";
    if (!form.role.trim())  e.role  = "Required";
    if (!form.quote.trim()) e.quote = "Required";
    setErrors(e); return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const all: CareerTestimonial[] = raw ? JSON.parse(raw) : [];
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
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Add Testimonial</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Add an alumni success story</p>
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
                : <Star className="w-4 h-4" />}
              {saving ? "Saving…" : "Add Testimonial"}
            </button>
          </div>
        </div>

        <div className="admin-card rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold border-b pb-3" style={{ color: "var(--text)", borderColor: "var(--border)" }}>
            Alumni Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                Full Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. Tasnim Rahman"
                className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.name ? "border-red-400" : ""}`} />
              {errors.name && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Batch / Year</label>
              <input name="year" value={form.year} onChange={handleChange}
                placeholder="e.g. Class of 2023"
                className="admin-input rounded-xl px-3 py-2.5 text-sm" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              Current Role & Organization <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input name="role" value={form.role} onChange={handleChange}
              placeholder="e.g. Software Engineer, Pathao"
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.role ? "border-red-400" : ""}`} />
            {errors.role && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.role}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              Testimonial Quote <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <textarea name="quote" value={form.quote} onChange={handleChange} rows={4}
              placeholder="Their experience with career services in their own words…"
              className={`admin-input rounded-xl px-3 py-2.5 text-sm resize-none ${errors.quote ? "border-red-400" : ""}`} />
            {errors.quote && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.quote}</p>}
          </div>

          {/* Star rating */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n} type="button"
                  onClick={() => setForm((p) => ({ ...p, rating: n }))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: form.rating >= n ? "rgba(200,168,75,0.15)" : "var(--bg-input)",
                    border: `1px solid ${form.rating >= n ? "#c8a84b" : "var(--border)"}`,
                  }}>
                  <Star className="w-4 h-4" style={{ color: form.rating >= n ? "#c8a84b" : "var(--text-faint)", fill: form.rating >= n ? "#c8a84b" : "none" }} />
                </button>
              ))}
              <span className="text-sm font-semibold ml-2 self-center" style={{ color: "#c8a84b" }}>
                {form.rating} / 5
              </span>
            </div>
          </div>

          {/* Preview */}
          {form.name && (
            <div className="p-4 rounded-xl mt-2" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: form.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#c8a84b] text-[#c8a84b]" />
                ))}
              </div>
              <p className="text-sm italic mb-3" style={{ color: "var(--text-muted)" }}>
                &ldquo;{form.quote || "Quote will appear here…"}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#4caf50] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{form.name[0]}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>{form.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-faint)" }}>{form.role}{form.year ? ` · ${form.year}` : ""}</p>
                </div>
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
            : <Star className="w-4 h-4" />}
          {saving ? "Saving…" : "Add Testimonial"}
        </button>
      </div>
    </form>
  );
}
