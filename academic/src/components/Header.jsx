import React from "react";
import { Search, Bell, User, LogOut, GraduationCap } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("username") || "Admin User";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 sticky top-0 z-50">
      
      {/* LEFT: BRAND LOGO & SEARCH */}
      <div className="flex items-center gap-8">
        {/* BRAND LOGO */}
        <Link to="/home" className="flex items-center gap-2.5 group">
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-6 transition-transform duration-300">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 leading-none tracking-tight">
              Annamacharya
            </span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
              University
            </span>
          </div>
        </Link>

        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center relative group">
          <Search className="absolute left-3 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search dashboard..." 
            className="w-64 pl-10 pr-4 py-1.5 bg-slate-100/50 border border-transparent rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all"
          />
        </div>
      </div>

      {/* RIGHT: Actions & User */}
      <div className="flex items-center gap-3">

        {/* User Profile Info */}
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-900 leading-tight capitalize">
              {loggedInUser}
            </span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-tight">
              Administrator
            </span>
          </div>
          
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
              <User size={18} />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        {/* <button 
          onClick={handleLogout}
          className="ml-2 flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-95 group"
          title="Sign out"
        >
          <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Exit</span>
        </button> */}
      </div>
    </header>
  );
}
