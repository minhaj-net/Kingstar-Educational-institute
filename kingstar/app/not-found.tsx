import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 – Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-6">
      <h1 className="text-7xl font-bold text-[#1a2e5a]">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
      <p className="text-gray-500 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#4caf50] hover:bg-[#43a047] text-white font-semibold px-6 py-3 rounded-sm transition-colors duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
