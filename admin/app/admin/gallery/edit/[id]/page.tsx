"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Loader, ImageIcon } from "lucide-react";
import type { GalleryItem } from "../../page";

const STORAGE_KEY = "admin_gallery";
const CATEGORY_OPTIONS = ["Campus Life","Academics","Graduation","Campus","Research","Athletics","Events"];

function Field({ label, name, value, onChange, required=false, multiline=false }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
  required?: boolean; multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1" style={{ color:"var(--text-muted)" }}>
        {label}{required&&<span style={{ color:"#ef4444" }}>*</span>}
      </label>
      {multiline
        ? <textarea name={name} value={value} onChange={onChange} rows={3} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none"/>
        : <input type="text" name={name} value={value} onChange={onChange} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm"/>}
    </div>
  );
}

export default function EditGalleryPage() {
  const params   = useParams();
  const id       = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const router   = useRouter();

  const [form,     setForm]     = useState<GalleryItem|null>(null);
  const [notFound, setNotFound] = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [errors,   setErrors]   = useState<Record<string,string>>({});

  useEffect(() => {
    if (!id) return;

    function load(data: GalleryItem[]) {
      const found = data.find(i => String(i.id) === String(id));
      if (!found) { setNotFound(true); return; }
      setForm({ ...found });
    }

    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed: GalleryItem[] = JSON.parse(raw);
        const found = parsed.find(i => String(i.id) === String(id));
        if (found) { load(parsed); return; }
      } catch { sessionStorage.removeItem(STORAGE_KEY); }
    }

    fetch("/gallery.json")
      .then(r => r.json())
      .then((data: GalleryItem[]) => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        load(data);
      })
      .catch(() => setNotFound(true));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(p => p ? { ...p, [name]: value } : p);
    if (errors[name]) setErrors(p=>{const n={...p};delete n[name];return n;});
  }

  function validate() {
    if (!form) return false;
    const e: Record<string,string> = {};
    if (!form.title.trim())    e.title    = "Required";
    if (!form.category.trim()) e.category = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !form) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const all: GalleryItem[] = raw ? JSON.parse(raw) : [];
      const updated = all.map(i => String(i.id) === String(id) ? form : i);
      if (!updated.find(i => String(i.id) === String(form.id))) updated.push(form);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaving(false);
      router.push("/admin/gallery");
    }, 500);
  }

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg font-semibold" style={{ color:"var(--text)" }}>Photo not found (ID: {id})</p>
      <Link href="/admin/gallery" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor:"#4caf50" }}>← Back to Gallery</Link>
    </div>
  );

  if (!form) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader className="w-8 h-8 animate-spin" style={{ color:"#4caf50" }}/>
    </div>
  );

  const imageOk = !!form.image?.startsWith("http");

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/gallery" className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor:"var(--bg-input)", color:"var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5"/>
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color:"var(--text)" }}>Edit Gallery Photo</h1>
              <p className="text-xs mt-0.5" style={{ color:"var(--text-faint)" }}>
                Editing: <span style={{ color:"#4caf50" }}>{form.title}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/gallery" className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor:"var(--border)", color:"var(--text-muted)", backgroundColor:"var(--bg-input)" }}>
              Discard
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor:"#4caf50" }}
              onMouseEnter={e=>!saving&&(e.currentTarget.style.backgroundColor="#43a047")}
              onMouseLeave={e=>(e.currentTarget.style.backgroundColor="#4caf50")}>
              {saving?<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                :<ImageIcon className="w-4 h-4"/>}
              {saving?"Saving…":"Save Changes"}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left */}
          <div className="xl:col-span-2 admin-card rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold border-b pb-3"
              style={{ color:"var(--text)", borderColor:"var(--border)" }}>Photo Details</h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold flex items-center gap-1" style={{ color:"var(--text-muted)" }}>
                Title<span style={{ color:"#ef4444" }}>*</span>
              </label>
              <input name="title" value={form.title} onChange={handleChange}
                className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title?"border-red-400":""}`}/>
              {errors.title&&<p className="text-xs" style={{ color:"#ef4444" }}>{errors.title}</p>}
            </div>

            <Field label="Caption" name="caption" value={form.caption} onChange={handleChange} multiline/>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold flex items-center gap-1" style={{ color:"var(--text-muted)" }}>
                Category<span style={{ color:"#ef4444" }}>*</span>
              </label>
              <select name="category" value={form.category} onChange={handleChange}
                className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.category?"border-red-400":""}`}
                style={{ appearance:"none" }}>
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category&&<p className="text-xs" style={{ color:"#ef4444" }}>{errors.category}</p>}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            <div className="admin-card rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold" style={{ color:"var(--text)" }}>Photo Image</h3>
              <Field label="Image URL" name="image" value={form.image||""} onChange={handleChange}/>
              {imageOk?(
                <div className="relative w-full rounded-xl overflow-hidden" style={{ height:"160px" }}>
                  <Image src={form.image} alt="preview" fill className="object-cover" unoptimized/>
                </div>
              ):(
                <div className="flex flex-col items-center justify-center rounded-xl py-8"
                  style={{ backgroundColor:"var(--bg-input)", border:"2px dashed var(--border)" }}>
                  <ImageIcon className="w-8 h-8" style={{ color:"var(--text-faint)" }}/>
                  <p className="text-xs mt-2" style={{ color:"var(--text-faint)" }}>Paste URL above</p>
                </div>
              )}
            </div>

            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color:"var(--text)" }}>Summary</h3>
              {[
                { label:"Title",    value:form.title    ||"—" },
                { label:"Category", value:form.category ||"—" },
              ].map(({label,value})=>(
                <div key={label} className="flex items-center justify-between text-sm">
                  <span style={{ color:"var(--text-faint)" }}>{label}</span>
                  <span className="font-medium" style={{ color:"var(--text)" }}>{value}</span>
                </div>
              ))}
            </div>

            <button type="submit" disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor:"#4caf50" }}
              onMouseEnter={e=>!saving&&(e.currentTarget.style.backgroundColor="#43a047")}
              onMouseLeave={e=>(e.currentTarget.style.backgroundColor="#4caf50")}>
              {saving?<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                :<ImageIcon className="w-4 h-4"/>}
              {saving?"Saving…":"Save Changes"}
            </button>
          </div>
        </div>

      </div>
    </form>
  );
}
