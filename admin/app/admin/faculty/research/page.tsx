import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <div className="w-16 h-16 bg-[#4caf50]/10 rounded-2xl flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#4caf50]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-[#1a2e5a] dark:text-white capitalize">research</h1>
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
