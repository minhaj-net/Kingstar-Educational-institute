"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  UserPlus,
  TrendingUp,
  TrendingDown,
  BookMarked,
  CreditCard,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Stats {
  totalStudents: number;
  totalCourses: number;
  totalInstructors: number;
  totalRevenue: number;
  newStudentsThisMonth: number;
  activeEvents: number;
}

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  status: string;
  joined: string;
  avatar: string;
}

interface MonthlyRevenue {
  month: string;
  revenue: number;
  students: number;
}

interface CourseCategory {
  name: string;
  value: number;
  color: string;
}

interface Activity {
  id: number;
  type: string;
  message: string;
  time: string;
}

interface AdminData {
  stats: Stats;
  recentStudents: Student[];
  monthlyRevenue: MonthlyRevenue[];
  courseCategories: CourseCategory[];
  recentActivities: Activity[];
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  positive,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  change: string;
  positive: boolean;
  color: string;
  delay: number;
}) {
  const count = useCountUp(value);
  const formatted =
    label === "Total Revenue"
      ? `$${count.toLocaleString()}`
      : count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="admin-card rounded-2xl p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <span
          className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
          style={{
            backgroundColor: positive ? "rgba(76,175,80,0.12)" : "rgba(239,68,68,0.12)",
            color: positive ? "#4caf50" : "#ef4444",
          }}
        >
          {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>{formatted}</p>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
      </div>
    </motion.div>
  );
}

function getActivityIcon(type: string) {
  switch (type) {
    case "enrollment":
      return <UserPlus className="w-4 h-4 text-[#4caf50]" />;
    case "course":
      return <BookMarked className="w-4 h-4 text-[#1a2e5a]" />;
    case "payment":
      return <CreditCard className="w-4 h-4 text-[#c8a84b]" />;
    case "event":
      return <Calendar className="w-4 h-4 text-purple-500" />;
    case "instructor":
      return <GraduationCap className="w-4 h-4 text-blue-500" />;
    default:
      return <TrendingUp className="w-4 h-4 text-gray-400" />;
  }
}

function StatusBadge({ status }: { status: string }) {
  const styleMap: Record<string, { bg: string; color: string }> = {
    active:   { bg: "rgba(76,175,80,0.12)",  color: "#4caf50" },
    inactive: { bg: "rgba(100,116,139,0.12)", color: "var(--text-muted)" },
    pending:  { bg: "rgba(234,179,8,0.12)",   color: "#ca8a04" },
  };
  const s = styleMap[status] ?? styleMap.inactive;
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full capitalize"
      style={{ backgroundColor: s.bg, color: s.color }}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<AdminData | null>(null);

  useEffect(() => {
    fetch("/admin-data.json")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#4caf50] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      icon: Users,
      label: "Total Students",
      value: data.stats.totalStudents,
      change: "+12%",
      positive: true,
      color: "#1a2e5a",
    },
    {
      icon: BookOpen,
      label: "Total Courses",
      value: data.stats.totalCourses,
      change: "+8%",
      positive: true,
      color: "#4caf50",
    },
    {
      icon: GraduationCap,
      label: "Total Instructors",
      value: data.stats.totalInstructors,
      change: "+3%",
      positive: true,
      color: "#c8a84b",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: data.stats.totalRevenue,
      change: "+18%",
      positive: true,
      color: "#8b5cf6",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <StatCard key={card.label} {...card} delay={i * 0.1} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Area chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="xl:col-span-2 admin-card rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>Monthly Revenue</h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Revenue overview for 2026</p>
            </div>
            <span className="text-xs bg-[#4caf50]/10 text-[#4caf50] px-2 py-1 rounded-full font-medium">2026</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data.monthlyRevenue}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4caf50" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-[#334155]" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#f1f5f9",
                  fontSize: "12px",
                }}
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4caf50"
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="admin-card rounded-2xl p-5"
        >
          <div className="mb-4">
            <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>Course Categories</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Distribution by type</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data.courseCategories}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {data.courseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#f1f5f9",
                  fontSize: "12px",
                }}
                formatter={(value) => [`${Number(value)}%`, "Share"]}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "11px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Recent students */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="admin-card rounded-2xl overflow-hidden"
        >
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
            <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>Recent Students</h2>
            <a href="/admin/students" className="text-xs text-[#4caf50] hover:underline font-medium">View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--thead-bg)" }}>
                  <th className="text-left text-xs font-medium px-5 py-3" style={{ color: "var(--text-faint)" }}>Name</th>
                  <th className="text-left text-xs font-medium px-5 py-3 hidden md:table-cell" style={{ color: "var(--text-faint)" }}>Course</th>
                  <th className="text-left text-xs font-medium px-5 py-3" style={{ color: "var(--text-faint)" }}>Status</th>
                  <th className="text-left text-xs font-medium px-5 py-3 hidden sm:table-cell" style={{ color: "var(--text-faint)" }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {data.recentStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-t admin-table-row transition-colors"
                    style={{ borderColor: "var(--divider)" }}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a2e5a] to-[#2d4a8a] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-white">{student.name.charAt(0)}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium truncate" style={{ color: "var(--text)" }}>{student.name}</p>
                          <p className="text-xs truncate" style={{ color: "var(--text-faint)" }}>{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <p className="text-xs truncate max-w-[140px]" style={{ color: "var(--text-muted)" }}>{student.course}</p>
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={student.status} /></td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <p className="text-xs" style={{ color: "var(--text-faint)" }}>{student.joined}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="admin-card rounded-2xl"
        >
          <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
            <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>Recent Activity</h2>
          </div>
          <div className="p-5 space-y-4">
            {data.recentActivities.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "var(--bg-input)" }}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{activity.message}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
