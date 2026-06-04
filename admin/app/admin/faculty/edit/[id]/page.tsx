"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";
import Link from "next/link";
import FacultyForm, { EMPTY_FACULTY, Faculty } from "../../_form/FacultyForm";

export default function EditFacultyPage() {
  const params = useParams();
  const id = params?.id as string;
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = (data: Faculty[]) => {
      const found = data.find((f) => f.id === id);
      if (!found) { setNotFound(true); return; }
      setFaculty(found);
    };
    const saved = sessionStorage.getItem("admin_faculty");
    if (saved) { load(JSON.parse(saved)); return; }
    fetch("/faculty.json")
      .then((r) => r.json())
      .then((data: Faculty[]) => {
        sessionStorage.setItem("admin_faculty", JSON.stringify(data));
        load(data);
      })
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg font-semibold" style={{ color: "var(--text)" }}>Faculty member not found</p>
      <Link href="/admin/faculty"
        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: "#4caf50" }}>← Back to Faculty</Link>
    </div>
  );

  if (!faculty) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader className="w-8 h-8 animate-spin" style={{ color: "#4caf50" }} />
    </div>
  );

  return <FacultyForm initial={faculty} mode="edit" />;
}
