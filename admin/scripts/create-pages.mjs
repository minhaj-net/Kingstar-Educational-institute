import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = join(__dirname, "..", "app", "admin");

const routes = [
  "faculty",
  "faculty/instructors",
  "faculty/departments",
  "faculty/research",
  "programs",
  "programs/undergraduate",
  "programs/graduate",
  "programs/scholarships",
  "students/admissions",
  "students/campus-tour",
  "alumni",
  "alumni/events",
  "alumni/benefits",
  "athletics",
  "university-life",
  "university-life/dining",
  "university-life/housing",
  "university-life/health",
  "university-life/safety",
  "blogs",
  "blogs/add",
  "blogs/categories",
  "gallery",
  "gallery/upload",
  "portfolio",
  "portfolio/categories",
  "pages",
  "pages/about",
  "pages/contact",
  "pages/pricing",
  "donations",
  "courses/categories",
  "courses/add",
];

const template = (label) => `import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <div className="w-16 h-16 bg-[#4caf50]/10 rounded-2xl flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#4caf50]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-[#1a2e5a] dark:text-white capitalize">${label}</h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm text-sm">
        This section is under construction. Content management will be available soon.
      </p>
      <Link
        href="/admin"
        className="mt-2 px-5 py-2.5 bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-semibold rounded-xl transition-colors"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}
`;

let created = 0;
for (const route of routes) {
  const dir = join(base, route);
  const file = join(dir, "page.tsx");
  if (!existsSync(file)) {
    mkdirSync(dir, { recursive: true });
    const label = route.split("/").pop().replace(/-/g, " ");
    writeFileSync(file, template(label), "utf8");
    created++;
    console.log(`✓ Created: /admin/${route}`);
  } else {
    console.log(`  Exists:  /admin/${route}`);
  }
}
console.log(`\nDone — ${created} pages created.`);
