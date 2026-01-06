import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaBook,
  FaLock,
  FaGraduationCap
} from "react-icons/fa";

export default function StudentDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);

  /* ================= SESSION + FETCH ================= */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser?.mobileNumber) {
      toast.error("Session expired. Please login again.");
      navigate("/");
      return;
    }

    setUser(storedUser);
    fetchStudentDetails(storedUser.mobileNumber);
  }, []);

  /* ================= FETCH STUDENT ================= */
  const fetchStudentDetails = async (mobile) => {
    try {
      const res = await fetch(
        `http://localhost:8080/students/mobile/${mobile}`
      );

      if (!res.ok) {
        toast.error("Unable to fetch student details");
        return;
      }

      const data = await res.json();
      setStudent(data);

    } catch {
      toast.error("Server error");
    }
  };

  /* ================= ACTIONS ================= */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const openSemester = (sem) => {
    navigate(`/student/semester/${sem}`);
  };

  /* ================= LOADING ================= */
  if (!student || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-indigo-100 px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center animate-fadeIn">

          {/* Loader */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Loading Your Dashboard
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            Before entering your page, please complete your student details.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/student")}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold 
                      hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Enter Student Details →
          </button>

          {/* Small helper text */}
          <p className="text-sm text-gray-400 mt-4">
            It takes less than a minute
          </p>

        </div>
      </div>

    );
  }

  /* ================= SEMESTER LOGIC ================= */
  const SEMESTER_MAP = {
    BTECH: 8,
    DEGREE: 6
  };

  const totalSemesters = SEMESTER_MAP[student.course] || 0;
  const currentSemester = student.currentSemester || totalSemesters;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-linear-to-r from-indigo-600 to-indigo-500
                text-white px-4 py-3 shadow-md">

        {/* MOBILE + DESKTOP FLEX */}
        <div className="flex flex-col gap-3
                        sm:flex-row sm:items-center sm:justify-between">

            {/* LEFT: TITLE */}
            <h1 className="text-lg font-bold tracking-wide">
            Student Dashboard
            </h1>

            {/* RIGHT: USER INFO + LOGOUT */}
            <div className="flex items-center justify-between
                            sm:justify-end gap-4">

            {/* USER INFO */}
            <div className="text-left leading-tight">
                <p className="font-semibold text-sm sm:text-base">
                {student.firstName} {student.lastName}
                </p>
                <p className="text-xs opacity-90">
                Reg No: {student.registerNumber}
                </p>
            </div>

            {/* LOGOUT BUTTON */}
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600
                        text-white text-sm px-4 py-2 rounded-lg
                        transition-all active:scale-95 shadow"
            >
                Logout
            </button>

            </div>
        </div>
        </nav>

      {/* ================= BODY ================= */}
      <div className="p-6 space-y-6">

        {/* ===== STUDENT DETAILS CARD ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-indigo-600 font-semibold mb-4">
            Student Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

            <Detail label="Full Name"
                    value={`${student.firstName} ${student.lastName}`} />
            <Detail label="Register Number"
                    value={student.registerNumber} />
            <Detail label="Mobile Number"
                    value={student.mobileNumber} />
            <Detail label="Email"
                    value={student.email || student.emailId || "-"} />
            <Detail label="Course"
                    value={student.course || "-"} />
            <Detail label="Branch"
                    value={student.branch || "-"} />
            <Detail label="Admission Year"
                    value={new Date().getFullYear()} />
          </div>

          <div className="flex items-center justify-between mb-3">

            {/* ✏️ EDIT BUTTON (NO BACKGROUND) */}
            <button
              onClick={() => navigate("/student/edit")}
              className="text-indigo-600 text-sm mt-4 font-medium hover:bg-[#e0e7ff] px-3 py-1 rounded-lg transition"
            >
              Edit Your Details
            </button>
          </div>
        </div>

        {/* ===== SEMESTER CARDS ===== */}
         <div className="mt-10">

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FaGraduationCap className="text-green-600" />
                Semester Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {Array.from({ length: totalSemesters }, (_, i) => i + 1).map(sem => (
                <SemesterCard
                    key={sem}
                    semester={sem}
                    enabled={sem <= currentSemester}
                    onClick={() => openSemester(sem)}
                />
                ))}

            </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

/* ================= SEMESTER CARD ================= */

function SemesterCard({ semester, enabled, onClick }) {
  return (
    <div
      onClick={enabled ? onClick : undefined}
      className={`rounded-2xl p-6 text-center border
                  transition-all duration-300
                  ${enabled
                    ? "bg-white shadow-sm hover:shadow-lg cursor-pointer hover:-translate-y-1"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
    >
      <div className="flex justify-center mb-3 text-3xl">
        {enabled ? <FaBook /> : <FaLock />}
      </div>

      <h3 className="font-semibold">
        Semester {semester}
      </h3>

      {!enabled && (
        <p className="text-xs mt-2">
          Locked
        </p>
      )}
    </div>
  );
}
