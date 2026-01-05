import React from "react";
import { GraduationCap, ArrowRight, BookOpen, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Welcome Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 lg:p-12 text-white shadow-xl shadow-indigo-200">
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">
            Welcome to Annamacharya University Portal
          </h1>
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
            Manage your academic operations, faculty assignments, and department workflows with our centralized enterprise system.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-colors">
              View Stats <ArrowRight size={18} />
            </button>
            <button className="bg-indigo-500/30 backdrop-blur-md border border-indigo-400/30 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-500/50 transition-colors">
              Quick Guide
            </button>
          </div>
        </div>
      </section>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<Users className="text-blue-600" />} 
          label="Total Students" 
          value="4,250" 
          color="bg-blue-50" 
        />
        <StatCard 
          icon={<GraduationCap className="text-purple-600" />} 
          label="Active Faculty" 
          value="184" 
          color="bg-purple-50" 
        />
        <StatCard 
          icon={<BookOpen className="text-emerald-600" />} 
          label="Live Courses" 
          value="52" 
          color="bg-emerald-50" 
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:border-indigo-200 transition-colors">
      <div className={`p-4 rounded-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
