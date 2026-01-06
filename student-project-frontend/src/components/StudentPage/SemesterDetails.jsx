import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { TIMETABLE, COMMON_TIMINGS } from "../Data/timetableData";
import TimeTable from "../FormatPages/TimeTable";
import SubjectPerformanceTable from "../FormatPages/SubjectPerformanceTable";
import PerformanceSummary from "../FormatPages/PerformanceSummary";
import FacultyAllocation from "../FormatPages/FacultyAllocation";

const STORAGE_KEY = "ADMIN_TIMETABLE";

export default function SemesterDetails() {

  const { semester } = useParams();
  const navigate = useNavigate();

  // ✅ CHANGE 1: store user in state
  const [user, setUser] = useState(null);

  // ✅ CHANGE 2: student data state
  const [student, setStudent] = useState(null);

  /* ================= SESSION CHECK ================= */
  useEffect(() => {
    // ✅ CHANGE 3: read from "user" (NOT studentProfile)
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser?.mobileNumber) {
      toast.error("Session expired. Please login again.");
      navigate("/");
      return;
    }

    setUser(storedUser);
    fetchStudent(storedUser.mobileNumber);

  }, []);

  /* ================= FETCH STUDENT ================= */
  const fetchStudent = async (mobile) => {
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

  /* ================= LOADING ================= */
  if (!user || !student) {
    return <div className="p-6">Loading...</div>;
  }

  /* ================= READ TIMETABLE ================= */
  const sem = Number(semester);

  // ✅ SAME LOGIC (NO CHANGE)
  const saved =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  const adminData =
    saved?.[student.course]?.[student.branch]?.[sem];

  const fallback =
    TIMETABLE?.[student.course]?.[student.branch]?.[sem];

  const semesterData = adminData || fallback;

  if (!semesterData) {
    return (
      <div className="p-6 text-red-500">
        No timetable for {student.branch} Semester {sem}
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          {student.branch} – Semester {sem}
        </h1>

        <button
          onClick={() => navigate("/studentDashboard")}
          className="text-indigo-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* TIMETABLE */}
      <TimeTable
        timetable={semesterData.timetable}
        timings={COMMON_TIMINGS}
      />

      {/* FACULTY */}
      <FacultyAllocation faculty={semesterData.faculty} />

      {/* SUBJECT PERFORMANCE */}
      <SubjectPerformanceTable
        subjects={[
          ...new Set(
            semesterData.timetable
              .flatMap(r => [
                r.P1, r.P2, r.P3,
                r.P4, r.P5, r.P6, r.P7
              ])
              .filter(s => s && !s.toLowerCase().includes("lab"))
          )
        ]}
      />

      {/* SUMMARY */}
      <PerformanceSummary />
    </div>
  );
}
