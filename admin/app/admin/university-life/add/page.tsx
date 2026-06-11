"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Building2, Plus, X } from "lucide-react";
import ImageUploadField from "../../_components/ImageUploadField";
import type { ULItem } from "../page";

const categoryOptions = ["Campus Life","Athletics","Health","Safety","Technology","Culture","Events","Research"];

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold border-b pb-3" style={{ color: "var(--text)", borderColor: "var(--border)" }}>{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, name, value, onChange, required=false, multiline=false }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
  required?: boolean; multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {multiline
        ? <textarea name={name} value={value} onChange={onChange} rows={4} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none" />
        : <input type="text" name={name} value={value} onChange={onChange} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm" />}
    </div>
  );
}

function ListEditor({ label, items, onAdd, onRemove }: {
  label: string; items: string[];
  onAdd:(v:string)=>void; onRemove:(v:string)=>void;
}) {
  const [input, setInput] = useState("");
  function add() { const v=input.trim(); if(v&&!items.includes(v)) onAdd(v); setInput(""); }
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{label}</label>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();add();}}}
          className="admin-input rounded-xl px-3 py-2 text-sm flex-1" />
        <button type="button" onClick={add}
          className="px-3 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={e=>(e.currentTarget.style.backgroundColor="#43a047")}
          onMouseLeave={e=>(e.currentTarget.style.backgroundColor="#4caf50")}>
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-col gap-1">
          {items.map((item,i) => (
            <div key={i} className="flex items-start justify-between gap-2 px-3 py-2 rounded-lg text-xs"
              style={{ backgroundColor:"var(--bg-input)", color:"var(--text-muted)" }}>
              <span className="flex-1">{item}</span>
              <button type="button" onClick={()=>onRemove(item)} className="opacity-50 hover:opacity-100 flex-shrink-0">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const EMPTY: ULItem = {
  id:"", title:"", excerpt:"", image:"", category:"", description:"",
  body:"", highlights:[], hours:"", contact:"", gallery:[],
};

export default function AddULPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [form, setForm] = useState<ULItem>({...EMPTY});

  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) {
    const {name,value} = e.target;
    setForm(p=>({...p,[name]:value}));
    if(errors[name]) setErrors(p=>{const n={...p};delete n[name];return n;});
  }
  function addToList(field: "highlights"|"gallery", v:string) {
    setForm(p=>({...p,[field]:[...(p[field] as string[]),v]}));
  }
  function removeFromList(field: "highlights"|"gallery", v:string) {
    setForm(p=>({...p,[field]:(p[field] as string[]).filter(x=>x!==v)}));
  }

  function validate() {
    const e:Record<string,string>={};
    if(!form.id.trim())    e.id="Required";
    if(!form.title.trim()) e.title="Required";
    setErrors(e);
    return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if(!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem("admin_university_life");
      const all: ULItem[] = raw ? JSON.parse(raw) : [];
      sessionStorage.setItem("admin_university_life", JSON.stringify([...all, form]));
      setSaving(false);
      router.push("/admin/university-life");
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/university-life"
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor:"var(--bg-input)", color:"var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color:"var(--text)" }}>Add University Life Item</h1>
              <p className="text-xs mt-0.5" style={{ color:"var(--text-faint)" }}>Fill in details and click Publish</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/university-life"
              className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor:"var(--border)", color:"var(--text-muted)", backgroundColor:"var(--bg-input)" }}>
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor:"#4caf50" }}
              onMouseEnter={e=>!saving&&(e.currentTarget.style.backgroundColor="#43a047")}
              onMouseLeave={e=>(e.currentTarget.style.backgroundColor="#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Building2 className="w-4 h-4" />}
              {saving ? "Publishing…" : "Publish Item"}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-5">
            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color:"var(--text-muted)" }}>
                    ID (slug) <span style={{ color:"#ef4444" }}>*</span>
                  </label>
                  <input name="id" value={form.id} onChange={handleChange}
                    placeholder="e.g. dining-on-campus"
                    className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.id?"border-red-400":""}`} />
                  {errors.id && <p className="text-xs" style={{ color:"#ef4444" }}>{errors.id}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color:"var(--text-muted)" }}>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}
                    className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance:"none" }}>
                    <option value="">Select category</option>
                    {categoryOptions.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1" style={{ color:"var(--text-muted)" }}>
                  Title <span style={{ color:"#ef4444" }}>*</span>
                </label>
                <input name="title" value={form.title} onChange={handleChange}
                  placeholder="e.g. Dining On Campus"
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title?"border-red-400":""}`} />
                {errors.title && <p className="text-xs" style={{ color:"#ef4444" }}>{errors.title}</p>}
              </div>
              <Field label="Excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} multiline />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Operating Hours" name="hours" value={form.hours} onChange={handleChange} />
                <Field label="Contact Email" name="contact" value={form.contact} onChange={handleChange} />
              </div>
            </FormSection>

            <FormSection title="Content">
              <Field label="Description (lead text)" name="description" value={form.description} onChange={handleChange} multiline />
              <Field label="Full Body Content" name="body" value={form.body} onChange={handleChange} multiline />
            </FormSection>

            <FormSection title="Highlights">
              <ListEditor label="Key Highlights" items={form.highlights}
                onAdd={v=>addToList("highlights",v)}
                onRemove={v=>removeFromList("highlights",v)} />
            </FormSection>
          </div>

          {/* Right */}
          <div className="space-y-5">
            <FormSection title="Cover Image">
              <ImageUploadField
                label="Cover"
                value={form.image}
                onChange={(url) => setForm(p => ({ ...p, image: url }))}
                previewHeight={160}
                placeholderIcon={<Building2 className="w-8 h-8" style={{ color:"var(--text-faint)" }} />}
              />
            </FormSection>

            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color:"var(--text)" }}>Summary</h3>
              {[
                { label:"ID",         value:form.id       ||"—" },
                { label:"Category",   value:form.category ||"—" },
                { label:"Highlights", value:`${form.highlights.length} items` },
              ].map(({label,value}) => (
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
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Building2 className="w-4 h-4" />}
              {saving ? "Publishing…" : "Publish Item"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
