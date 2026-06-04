import Link from "next/link";
import { Tag } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-[#1a2e5a]/10 dark:bg-[#1a2e5a]/30 rounded-2xl flex items-center justify-center mb-4">
        <Tag className="w-8 h-8 text-[#1a2e5a] dark:text-[#93c5fd]" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Categories
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        This section is coming soon.
      </p>
      <Link
        href="/admin"
        className="px-4 py-2 bg-[#4caf50] text-white rounded-xl text-sm font-medium hover:bg-[#43a047] transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
