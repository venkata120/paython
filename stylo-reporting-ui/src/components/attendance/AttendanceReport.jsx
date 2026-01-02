import { useState } from "react";
import { getAttendanceReport } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function AttendanceReport() {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    if (!studentId || !courseId) {
      setError("Please enter Student ID and Course ID");
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await getAttendanceReport(studentId, courseId);

      if (!res.data || res.data.totalClasses === 0) {
        setError("No attendance records found");
        setData(null);
        return;
      }

      setData(res.data);
    } catch (err) {
      setData(null);
      setError("No attendance found for given details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="number"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <input
        type="number"
        placeholder="Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />

      <button
        onClick={fetchReport}
        disabled={loading || !studentId || !courseId}
      >
        Load Report
      </button>

      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="mt-15">
          <Skeleton type="line" count={4} />
        </div>
      )}

      {/* ===== Error ===== */}
      {!loading && error && (
        <p className="error-text">{error}</p>
      )}

      {/* ===== Result ===== */}
      {!loading && data && (
        <div className="mt-15">
          <p>
            Total Classes: <strong>{data.totalClasses}</strong>
          </p>
          <p>
            Present: <strong>{data.presentCount}</strong>
          </p>
          <p>
            Percentage:{" "}
            <strong>
              {(data.attendancePercentage ?? 0).toFixed(2)}%
            </strong>
          </p>
          <p>
            Status:{" "}
            <span
              className={
                data.status === "SAFE"
                  ? "status-safe"
                  : "status-shortage"
              }
            >
              {data.status}
            </span>
          </p>
        </div>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && !data && studentId && courseId && (
        <div className="empty-state">
          <span>📊</span>
          No attendance data available
        </div>
      )}
    </>
  );
}

export default AttendanceReport;
