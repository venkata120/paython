import { useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaCalendarAlt,
  FaUserGraduate,
  FaUsers,
  FaBook,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

export default function Admin() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth data if any
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold">
            ATS
          </div>
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Panel
          </h1>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2
            bg-red-500 text-white
            px-4 py-2 rounded-lg
            hover:bg-red-600 transition
          "
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* ================= BODY ================= */}
      <div className="p-8">

        <h2 className="text-2xl font-bold text-indigo-700 mb-8">
          Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ADD FACULTY */}
          <DashboardCard
            icon={<FaUserTie />}
            title="Add Faculty"
            desc="Manage faculty details"
            color="indigo"
            onClick={() => navigate("/admin/staff/create")}
          />

          {/* EDIT TIMETABLE */}
          <DashboardCard
            icon={<FaCalendarAlt />}
            title="Edit Timetable"
            desc="Update semester timetable"
            color="green"
            onClick={() => navigate("/admin/dashboard")}
          />

          {/* ADD STUDENT */}
          <DashboardCard
            icon={<FaUserGraduate />}
            title="Add Student"
            desc="Register new students"
            color="blue"
            onClick={() => navigate("/register")}
          />

          {/* VIEW STUDENTS */}
          <DashboardCard
            icon={<FaUsers />}
            title="View Students"
            desc="View & manage students"
            color="purple"
            onClick={() => navigate("/admin/students")}
          />

          {/* MANAGE COURSES */}
          <DashboardCard
            icon={<FaBook />}
            title="Manage Courses"
            desc="Add / update courses"
            color="orange"
            onClick={() => navigate("/admin/courses")}
          />

          {/* REPORTS */}
          <DashboardCard
            icon={<FaChartBar />}
            title="Reports"
            desc="View analytics & reports"
            color="pink"
            onClick={() => navigate("/admin/reports")}
          />

        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE CARD ================= */
function DashboardCard({ icon, title, desc, color, onClick }) {

  const colors = {
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    pink: "bg-pink-100 text-pink-600",
  };

  return (
    <div
      onClick={onClick}
      className="
        bg-white
        p-6
        rounded-2xl
        shadow
        cursor-pointer
        hover:shadow-lg
        hover:-translate-y-1
        transition
      "
    >
      <div className="flex items-center gap-4">
        <div className={`p-4 rounded-full ${colors[color]}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}
