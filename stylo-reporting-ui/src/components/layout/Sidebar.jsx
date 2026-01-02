import { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarCheck,
  BarChart3,
  Trophy,
  FileText,
  Menu
} from "lucide-react";
import "./Sidebar.css";

const sections = [
  { id: "exams", label: "Exams", icon: BookOpen },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
  { id: "performance", label: "Performance", icon: BarChart3 },
  { id: "rankings", label: "Rankings", icon: Trophy },
  { id: "results", label: "Results", icon: FileText },
  { id: "marksheet", label: "Mark Sheet", icon: FileText }
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("exams");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      for (let sec of sections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>College Admin</h2>}
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          <Menu size={22} />
        </button>
      </div>

      <ul className="sidebar-menu">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <li
              key={s.id}
              className={`menu-item ${active === s.id ? "active" : ""}`}
              onClick={() => scrollTo(s.id)}
            >
              <Icon size={18} />
              {!collapsed && <span className="text">{s.label}</span>}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
