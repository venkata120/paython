import { Bell, User } from "lucide-react";
import "./Header.css";

function Header() {
  return (
    <header className="app-header">
      <div className="header-title">Dashboard</div>

      <div className="header-right">
        <div className="header-search">
          <input
            type="text"
            placeholder="Search students, exams, reports..."
          />
        </div>

        <div className="header-icons">
          <Bell size={18} />
          <User size={18} />
        </div>
      </div>
    </header>
  );
}

export default Header;
