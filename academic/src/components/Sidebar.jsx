import React from "react";
import { 
  ChevronLeft, LayoutDashboard, BookOpen, Users, Library,
  Settings, LogOut, Building2, Calendar,Workflow
} from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom"; // Use NavLink

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();

  // 1. Added 'path' to each menu item
  const menuItems = [
    { 
  icon: <LayoutDashboard size={22} strokeWidth={2} />, 
  label: "Dashboard", 
  path: "/dashboard",
  color: "text-indigo-600" // Optional: assign a semantic color for the active state
},
{ 
  icon: <Building2 size={22} strokeWidth={1.5} />, 
  label: "Departments", 
  path: "/departments" 
} ,   { icon: <BookOpen size={22} />, label: "Courses", path: "/courses" },
    { icon: <BookOpen size={22} />, label: "Subjects", path: "/subjects" },
    { icon: <Users size={22} />, label: "Staff", path: "/staff" },
   { icon: <Workflow size={22} />, label: "Assign Subjects", path: "/assignsubjects" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out z-40 flex flex-col
      ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-white border border-slate-200 rounded-full p-1 text-slate-500 hover:text-indigo-600 shadow-sm transition-transform duration-300 z-50"
        style={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        <ChevronLeft size={16} />
      </button>

      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item, idx) => (
          /* 2. Changed from button to NavLink */
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) => `
              w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all group
              ${isActive 
                ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100/50" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
            `}
          >
            <div className="transition-colors">
              {item.icon}
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-sm whitespace-nowrap transition-opacity duration-300">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-100">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors group"
        >
          <LogOut size={22} className="min-w-[22px]" />
          {!isCollapsed && <span className="font-semibold text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
