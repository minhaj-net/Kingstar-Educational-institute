"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Calendar,
  BarChart3,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stats {
  totalStudents: number;
  totalCourses: number;
  totalInstructors: number;
  totalRevenue: number;
  newStudentsThisMonth: number;
  activeEvents: number;
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

interface AdminData {
  stats: Stats;
  monthlyRevenue: MonthlyRevenue[];
  courseCategories: CourseCategory[];
}

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1600) {
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

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({
  icon: Icon,
  label,
  value,
  change,
  positive,
  color,
  delay,
  prefix = "",
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  change: string;
  positive: boolean;
  color: string;
  delay: number;
  prefix?: string;
}) {
  const count = useCountUp(value);
  const formatted = prefix
    ? `${prefix}${count.toLocaleString()}`
    : count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      className="admin-card rounded-2xl p-5 hover:shadow-lg transition-all duration-300 group cursor-default"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span
          className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
          style={{
            backgroundColor: positive
              ? "rgba(76,175,80,0.12)"
              : "rgba(239,68,68,0.12)",
            color: positive ? "#4caf50" : "#ef4444",
          }}
        >
          {positive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {change}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
          {formatted}
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          {label}
        </p>
      </div>
      {/* subtle bottom accent line */}
      <div
        className="mt-4 h-0.5 rounded-full opacity-30 group-hover:opacity-70 transition-opacity"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div>
      <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
        {title}
      </h2>
      {sub && (
        <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const ChartTooltip = {
  contentStyle: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "12px",
    color: "#f1f5f9",
    fontSize: "12px",
    padding: "8px 12px",
  },
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [data, setData] = useState<AdminData | null>(null);
  const [activeTab, setActiveTab] = useState<"revenue" | "students">("revenue");

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

  // ── derived data ───────────────────────────────────────────────────────────
  const totalRevenue = data.monthlyRevenue.reduce(
    (s, m) => s + m.revenue,
    0
  );
  const totalNewStudents = data.monthlyRevenue.reduce(
    (s, m) => s + m.students,
    0
  );

  // Quarter comparison
  const q1 = data.monthlyRevenue.slice(0, 3).reduce((s, m) => s + m.revenue, 0);
  const q2 = data.monthlyRevenue.slice(3, 6).reduce((s, m) => s + m.revenue, 0);
  const q3 = data.monthlyRevenue.slice(6, 9).reduce((s, m) => s + m.revenue, 0);
  const q4 = data.monthlyRevenue.slice(9, 12).reduce((s, m) => s + m.revenue, 0);
  const quarterData = [
    { quarter: "Q1", revenue: q1, students: data.monthlyRevenue.slice(0,3).reduce((s,m)=>s+m.students,0) },
    { quarter: "Q2", revenue: q2, students: data.monthlyRevenue.slice(3,6).reduce((s,m)=>s+m.students,0) },
    { quarter: "Q3", revenue: q3, students: data.monthlyRevenue.slice(6,9).reduce((s,m)=>s+m.students,0) },
    { quarter: "Q4", revenue: q4, students: data.monthlyRevenue.slice(9,12).reduce((s,m)=>s+m.students,0) },
  ];

  // Radial / performance data
  const performanceData = [
    { name: "Students", value: 92, fill: "#1a2e5a" },
    { name: "Courses",  value: 78, fill: "#4caf50" },
    { name: "Revenue",  value: 85, fill: "#c8a84b" },
    { name: "Events",   value: 60, fill: "#8b5cf6" },
  ];

  // Top courses by students
  const topCourses = [
    { name: "Computer Science", students: 312, color: "#4caf50" },
    { name: "Business Admin",   students: 287, color: "#1a2e5a" },
    { name: "Marketing",        students: 203, color: "#c8a84b" },
    { name: "Engineering",      students: 178, color: "#8b5cf6" },
    { name: "Medicine",         students: 156, color: "#ef4444" },
  ];
  const maxStudents = Math.max(...topCourses.map((c) => c.students));

  const kpiCards = [
    {
      icon: Users,
      label: "Total Students",
      value: data.stats.totalStudents,
      change: "+12%",
      positive: true,
      color: "#1a2e5a",
      prefix: "",
    },
    {
      icon: BookOpen,
      label: "Total Courses",
      value: data.stats.totalCourses,
      change: "+8%",
      positive: true,
      color: "#4caf50",
      prefix: "",
    },
    {
      icon: GraduationCap,
      label: "Instructors",
      value: data.stats.totalInstructors,
      change: "+3%",
      positive: true,
      color: "#c8a84b",
      prefix: "",
    },
    {
      icon: DollarSign,
      label: "Annual Revenue",
      value: totalRevenue,
      change: "+18%",
      positive: true,
      color: "#8b5cf6",
      prefix: "$",
    },
    {
      icon: UserPlus,
      label: "New Students / Mo",
      value: data.stats.newStudentsThisMonth,
      change: "+5%",
      positive: true,
      color: "#06b6d4",
      prefix: "",
    },
    {
      icon: Calendar,
      label: "Active Events",
      value: data.stats.activeEvents,
      change: "-2",
      positive: false,
      color: "#f97316",
      prefix: "",
    },
  ];

  return (
    <div className="space-y-6">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a2e5a] to-[#4caf50] flex items-center justify-center shadow-md">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: "var(--text)" }}>
              Analytics
            </h1>
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>
              University performance overview · 2026
            </p>
          </div>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[#4caf50]/10 text-[#4caf50]">
          <Activity className="w-3.5 h-3.5" />
          Live Data
        </span>
      </motion.div>

      {/* ── KPI Cards ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((card, i) => (
          <KpiCard key={card.label} {...card} delay={i * 0.07} />
        ))}
      </div>

      {/* ── Revenue & Students Trend ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="admin-card rounded-2xl p-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <SectionTitle
            title="Monthly Trend"
            sub="Revenue & student enrollment over 12 months"
          />
          <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: "var(--bg-input)" }}>
            {(["revenue", "students"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize"
                style={{
                  backgroundColor: activeTab === tab ? "var(--accent)" : "transparent",
                  color: activeTab === tab ? "white" : "var(--text-muted)",
                }}
              >
                {tab === "revenue" ? "💰 Revenue" : "👥 Students"}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data.monthlyRevenue} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={activeTab === "revenue" ? "#4caf50" : "#1a2e5a"} stopOpacity={0.35} />
                <stop offset="95%" stopColor={activeTab === "revenue" ? "#4caf50" : "#1a2e5a"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-[#334155]" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                activeTab === "revenue"
                  ? `$${(v / 1000).toFixed(0)}k`
                  : `${v}`
              }
            />
            <Tooltip
              {...ChartTooltip}
              formatter={(val) =>
                activeTab === "revenue"
                  ? [`$${Number(val).toLocaleString()}`, "Revenue"]
                  : [`${val}`, "Students"]
              }
            />
            <Area
              type="monotone"
              dataKey={activeTab}
              stroke={activeTab === "revenue" ? "#4caf50" : "#1a2e5a"}
              strokeWidth={2.5}
              fill="url(#grad1)"
              dot={{ r: 3, fill: activeTab === "revenue" ? "#4caf50" : "#1a2e5a", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Row 2: Quarter Bar + Pie ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Quarterly Revenue Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="xl:col-span-2 admin-card rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <SectionTitle title="Quarterly Revenue" sub="Revenue breakdown per quarter" />
            <span className="text-xs bg-[#8b5cf6]/10 text-[#8b5cf6] px-2 py-1 rounded-full font-medium">
              2026
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={quarterData} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-[#334155]" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                {...ChartTooltip}
                formatter={(val) => [`$${Number(val).toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {quarterData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={["#1a2e5a", "#4caf50", "#c8a84b", "#8b5cf6"][i]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Course Category Donut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.4 }}
          className="admin-card rounded-2xl p-5"
        >
          <div className="mb-4">
            <SectionTitle title="Course Distribution" sub="By category share" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data.courseCategories}
                cx="50%"
                cy="45%"
                innerRadius={52}
                outerRadius={76}
                paddingAngle={3}
                dataKey="value"
              >
                {data.courseCategories.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                {...ChartTooltip}
                formatter={(val) => [`${val}%`, "Share"]}
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

      {/* ── Row 3: Enrollment Line + Performance Radial ───────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Student Enrollment Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.4 }}
          className="xl:col-span-2 admin-card rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <SectionTitle title="Student Enrollment" sub="Monthly new student registrations" />
            <span className="flex items-center gap-1 text-xs font-semibold text-[#4caf50]">
              <ArrowUpRight className="w-3.5 h-3.5" />
              {totalNewStudents.toLocaleString()} total
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-[#334155]" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                {...ChartTooltip}
                formatter={(val) => [`${val}`, "New Students"]}
              />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#1a2e5a"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#1a2e5a", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#4caf50" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Radial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.74, duration: 0.4 }}
          className="admin-card rounded-2xl p-5"
        >
          <div className="mb-2">
            <SectionTitle title="Performance Score" sub="Key metrics at a glance" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={80}
              data={performanceData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={6}
                background={{ fill: "var(--bg-input)" }}
              />
              <Tooltip
                {...ChartTooltip}
                formatter={(val) => [`${val}%`, "Score"]}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-1">
            {performanceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.fill }} />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.name}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Row 4: Top Courses ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="admin-card rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-5">
          <SectionTitle title="Top Courses by Enrollment" sub="Highest enrolled courses this semester" />
        </div>
        <div className="space-y-4">
          {topCourses.map((course, i) => {
            const pct = Math.round((course.students / maxStudents) * 100);
            return (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.82 + i * 0.07 }}
                className="flex items-center gap-4"
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: course.color }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium truncate" style={{ color: "var(--text)" }}>
                      {course.name}
                    </span>
                    <span className="text-xs font-semibold ml-2 flex-shrink-0" style={{ color: course.color }}>
                      {course.students}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-input)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.9 + i * 0.07, duration: 0.6, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: course.color }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Summary Footer ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {[
          { label: "Avg. Revenue / Month", value: `$${Math.round(totalRevenue / 12).toLocaleString()}`, color: "#4caf50" },
          { label: "Best Month",           value: (() => { const best = data.monthlyRevenue.reduce((a, b) => a.revenue > b.revenue ? a : b); return `${best.month} · $${best.revenue.toLocaleString()}`; })(), color: "#1a2e5a" },
          { label: "Peak Enrollments",     value: (() => { const peak = data.monthlyRevenue.reduce((a, b) => a.students > b.students ? a : b); return `${peak.month} · ${peak.students}`; })(), color: "#c8a84b" },
          { label: "Total Annual Students",value: totalNewStudents.toLocaleString(), color: "#8b5cf6" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.92 + i * 0.06 }}
            className="admin-card rounded-2xl p-4 text-center"
          >
            <p className="text-lg font-bold" style={{ color: item.color }}>
              {item.value}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
