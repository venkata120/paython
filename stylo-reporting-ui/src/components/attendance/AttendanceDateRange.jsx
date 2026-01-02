import { useState } from "react";
import { getAttendanceByDateRange } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function AttendanceDateRange() {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadReport = async () => {
    if (!studentId || !courseId || !fromDate || !toDate) {
      setError("Please fill all fields");
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await getAttendanceByDateRange(
        studentId,
        courseId,
        fromDate,
        toDate
      );
      setData(res.data);
    } catch (err) {
      setData(null);
      setError("No attendance found for selected date range");
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

      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />

      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />

      <button onClick={loadReport} disabled={loading}>
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
          <p>Total Classes: <strong>{data.totalClasses}</strong></p>
          <p>Present: <strong>{data.presentCount}</strong></p>
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
      {!loading && !error && !data && studentId && courseId && fromDate && toDate && (
        <div className="empty-state">
          <span>📅</span>
          No attendance data available for this range
        </div>
      )}
    </>
  );
}

export default AttendanceDateRange;
