"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Plus, X, BookOpen } from "lucide-react";
import ImageUploadField from "../../_components/ImageUploadField";
// ─── Types ────────────────────────────────────────────────────────────────────

interface ScheduleRow {
  time: string;
  place: string;
  room: string;
  dateRange: string;
  instructor: string;
}

interface Course {
  id: string;
  title: string;
  department: string;
  campus: string;
  level: string;
  instructor: string;
  semester: string;
  credit: string;
  method: string;
  image: string;
  description: string;
  body: string;
  topics: string[];
  schedule: ScheduleRow[];
}

// ─── Options ──────────────────────────────────────────────────────────────────

const levelOptions = ["Undergraduate", "Graduate", "Doctoral", "Certificate"];
const methodOptions = ["Lecture", "Seminar", "Online", "Workshop", "Clinical", "Lab"];
const semesterOptions = ["Fall 2018", "Spring 2019", "Fall 2019", "Spring 2020", "Fall 2024", "Spring 2025"];
const campusOptions = ["Main Campus", "KU2 Hill", "North Campus", "Online", "International"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold border-b pb-3" style={{ color: "var(--text)", borderColor: "var(--border)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label, name, value, onChange, placeholder = "",
  multiline = false, required = false,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string; multiline?: boolean; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1"
        style={{ color: "var(--text-muted)" }}>
        {label}
        {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {multiline ? (
        <textarea name={name} value={value} onChange={onChange} rows={4}
          placeholder={placeholder} required={required}
          className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none" />
      ) : (
        <input type="text" name={name} value={value} onChange={onChange}
          placeholder={placeholder} required={required}
          className="admin-input rounded-xl px-3 py-2.5 text-sm" />
      )}
    </div>
  );
}

function SelectField({
  label, name, value, options, onChange, required = false,
}: {
  label: string; name: string; value: string;
  options: string[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1"
        style={{ color: "var(--text-muted)" }}>
        {label}
        {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <select name={name} value={value} onChange={onChange} required={required}
        className="admin-input rounded-xl px-3 py-2.5 text-sm"
        style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AddCoursePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<Course>({
    id: "", title: "", department: "", campus: "",
    level: "", instructor: "", semester: "", credit: "",
    method: "", image: "", description: "", body: "",
    topics: [], schedule: [{ time: "", place: "", room: "", dateRange: "", instructor: "" }],
  });

  const [topicInput, setTopicInput] = useState("");

  // ── Handlers ──
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  }

  function addTopic() {
    const t = topicInput.trim();
    if (t && !form.topics.includes(t)) {
      setForm((prev) => ({ ...prev, topics: [...prev.topics, t] }));
    }
    setTopicInput("");
  }

  function removeTopic(t: string) {
    setForm((prev) => ({ ...prev, topics: prev.topics.filter((x) => x !== t) }));
  }

  function handleScheduleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      schedule: prev.schedule.map((row, i) => i === idx ? { ...row, [name]: value } : row),
    }));
  }

  function addScheduleRow() {
    setForm((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { time: "", place: "", room: "", dateRange: "", instructor: "" }],
    }));
  }

  function removeScheduleRow(idx: number) {
    setForm((prev) => ({ ...prev, schedule: prev.schedule.filter((_, i) => i !== idx) }));
  }

  // ── Validation ──
  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.id.trim()) e.id = "Course ID is required";
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.department.trim()) e.department = "Department is required";
    if (!form.instructor.trim()) e.instructor = "Instructor is required";
    if (!form.level) e.level = "Level is required";
    if (!form.method) e.method = "Method is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Submit ──
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setTimeout(() => {
      // Persist to sessionStorage (shared with courses list page)
      const existing = sessionStorage.getItem("admin_courses");
      const courses: Course[] = existing ? JSON.parse(existing) : [];
      const updated = [...courses, form];
      sessionStorage.setItem("admin_courses", JSON.stringify(updated));
      setSaving(false);
      router.push("/admin/courses");
    }, 600);
  }

  return (    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── Page header ── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/courses"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Add New Course</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Fill in all details then click Publish
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/courses"
              className="px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <BookOpen className="w-4 h-4" />
              )}
              {saving ? "Publishing…" : "Publish Course"}
            </button>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── Left (2/3) ── */}
          <div className="xl:col-span-2 space-y-6">

            {/* Basic info */}
            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                    Course ID <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input type="text" name="id" value={form.id} onChange={handleChange}
                    placeholder="e.g. ACC101"
                    className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.id ? "border-red-400" : ""}`} />
                  {errors.id && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.id}</p>}
                </div>
                <SelectField label="Level" name="level" value={form.level}
                  options={levelOptions} onChange={handleChange} required />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                  Course Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input type="text" name="title" value={form.title} onChange={handleChange}
                  placeholder="e.g. Introduction to Financial Accounting"
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title ? "border-red-400" : ""}`} />
                {errors.title && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                    Department <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input type="text" name="department" value={form.department} onChange={handleChange}
                    placeholder="e.g. Business Administration"
                    className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.department ? "border-red-400" : ""}`} />
                  {errors.department && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.department}</p>}
                </div>
                <SelectField label="Campus" name="campus" value={form.campus}
                  options={campusOptions} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                    Instructor <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input type="text" name="instructor" value={form.instructor} onChange={handleChange}
                    placeholder="e.g. Carol Dawson (PhD)"
                    className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.instructor ? "border-red-400" : ""}`} />
                  {errors.instructor && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.instructor}</p>}
                </div>
                <SelectField label="Semester" name="semester" value={form.semester}
                  options={semesterOptions} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Credit Hours" name="credit" value={form.credit} onChange={handleChange}
                  placeholder="e.g. 3.000" />
                <SelectField label="Method" name="method" value={form.method}
                  options={methodOptions} onChange={handleChange} required />
              </div>
            </FormSection>

            {/* Description */}
            <FormSection title="Course Description">
              <Field label="Short Description" name="description" value={form.description}
                onChange={handleChange} multiline
                placeholder="Brief overview of the course for the catalog…" />
              <Field label="Full Body Content" name="body" value={form.body}
                onChange={handleChange} multiline
                placeholder="Detailed course description, learning outcomes, methodology…" />
            </FormSection>

            {/* Topics */}
            <FormSection title="Course Topics">
              <div className="flex gap-2">
                <input type="text" value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTopic(); } }}
                  placeholder="Type a topic and press Enter or click Add"
                  className="admin-input rounded-xl px-3 py-2.5 text-sm flex-1" />
                <button type="button" onClick={addTopic}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#4caf50" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {form.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {form.topics.map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: "rgba(76,175,80,0.12)", color: "#4caf50" }}>
                      {t}
                      <button type="button" onClick={() => removeTopic(t)}
                        className="opacity-60 hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {form.topics.length === 0 && (
                <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                  No topics added yet.
                </p>
              )}
            </FormSection>

            {/* Schedule */}
            <FormSection title="Class Schedule">
              <div className="space-y-4">
                {form.schedule.map((row, idx) => (
                  <div key={idx} className="p-4 rounded-xl space-y-3"
                    style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                        Session {idx + 1}
                      </p>
                      {form.schedule.length > 1 && (
                        <button type="button" onClick={() => removeScheduleRow(idx)}
                          className="text-xs transition-colors"
                          style={{ color: "#ef4444" }}>
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" name="time" value={row.time}
                        onChange={(e) => handleScheduleChange(e, idx)}
                        placeholder="e.g. 9:00am – 11:00am"
                        className="admin-input rounded-lg px-3 py-2 text-sm" />
                      <input type="text" name="place" value={row.place}
                        onChange={(e) => handleScheduleChange(e, idx)}
                        placeholder="e.g. KU2 Hill"
                        className="admin-input rounded-lg px-3 py-2 text-sm" />
                      <input type="text" name="room" value={row.room}
                        onChange={(e) => handleScheduleChange(e, idx)}
                        placeholder="e.g. Room 203"
                        className="admin-input rounded-lg px-3 py-2 text-sm" />
                      <input type="text" name="dateRange" value={row.dateRange}
                        onChange={(e) => handleScheduleChange(e, idx)}
                        placeholder="e.g. Aug 21 – Dec 15, 2024"
                        className="admin-input rounded-lg px-3 py-2 text-sm" />
                      <input type="text" name="instructor" value={row.instructor}
                        onChange={(e) => handleScheduleChange(e, idx)}
                        placeholder="Instructor name"
                        className="admin-input rounded-lg px-3 py-2 text-sm sm:col-span-2" />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addScheduleRow}
                  className="flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: "#4caf50" }}>
                  <Plus className="w-4 h-4" />
                  Add another session
                </button>
              </div>
            </FormSection>

          </div>

          {/* ── Right (1/3) ── */}
          <div className="space-y-6">

            {/* Image */}
            <FormSection title="Course Image">
              <ImageUploadField
                label="Course"
                value={form.image}
                onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
                previewHeight={160}
                placeholderIcon={<BookOpen className="w-8 h-8" style={{ color: "var(--text-faint)" }} />}
              />
            </FormSection>

            {/* Summary card */}
            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Summary</h3>
              {[
                { label: "ID", value: form.id || "—" },
                { label: "Level", value: form.level || "—" },
                { label: "Method", value: form.method || "—" },
                { label: "Semester", value: form.semester || "—" },
                { label: "Credits", value: form.credit || "—" },
                { label: "Topics", value: form.topics.length ? `${form.topics.length} added` : "None" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span style={{ color: "var(--text-faint)" }}>{label}</span>
                  <span className="font-medium" style={{ color: "var(--text)" }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Submit */}
            <button type="submit" disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <BookOpen className="w-4 h-4" />
              )}
              {saving ? "Publishing…" : "Publish Course"}
            </button>

          </div>
        </div>
      </div>
    </form>
  );
}
