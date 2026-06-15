"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Star, Loader } from "lucide-react";
import type { CareerTestimonial } from "../../../page";

const STORAGE_KEY = "admin_career_testimonials";

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [form, setForm] = useState<CareerTestimonial | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;
    function load(data: CareerTestimonial[]) {
      const found = data.find((t) => t.id === id);
      if (!found) { setNotFound(true); return; }
      setForm({ ...found });
    }
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) { try { load(JSON.parse(raw)); return; } catch { /* fall */ } }
    fetch("/career-testimonials.json")
      .then((r) => r.json())
      .then((d: CareerTestimonial[]) => { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d)); load(d); })
      .catch(() => setNotFound(true));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((p) => p ? { ...p, [name]: value } : p);
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function validate() {
    if (!form) return false;
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name  = "Required";
    if (!form.role.trim())  e.role  = "Required";
    if (!form.quote.trim()) e.quote = "Required";
    setErrors(e); return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !form) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const all: CareerTestimonial[] = raw ? JSON.parse(raw) : [];
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all.map((t) => t.id === id ? form! : t)));
      setSaving(false);
      router.push("/admin/career");
    }, 500);
  }

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg font-semibold" style={{ color: "var(--text)" }}>Testimonial not found</p>
      <Link href="/admin/career" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: "#4caf50" }}>← Back to Career</Link>
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
            <Link href="/admin/career" className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Edit Testimonial</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Editing: <span style={{ color: "#4caf50" }}>{form.name}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/career" className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>Discard</Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Star className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
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
                className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.name ? "border-red-400" : ""}`} />
              {errors.name && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Batch / Year</label>
              <input name="year" value={form.year} onChange={handleChange}
                className="admin-input rounded-xl px-3 py-2.5 text-sm" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              Current Role & Organization <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input name="role" value={form.role} onChange={handleChange}
              className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.role ? "border-red-400" : ""}`} />
            {errors.role && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.role}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              Testimonial Quote <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <textarea name="quote" value={form.quote} onChange={handleChange} rows={4}
              className={`admin-input rounded-xl px-3 py-2.5 text-sm resize-none ${errors.quote ? "border-red-400" : ""}`} />
            {errors.quote && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.quote}</p>}
          </div>

          {/* Star rating */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button"
                  onClick={() => setForm((p) => p ? { ...p, rating: n } : p)}
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
        </div>

        <button type="submit" disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <Star className="w-4 h-4" />}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
