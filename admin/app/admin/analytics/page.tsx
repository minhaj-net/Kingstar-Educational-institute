import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mb-4">
        <BarChart3 className="w-8 h-8 text-indigo-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Analytics
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
