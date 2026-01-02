import { useState } from "react";
import { getOverallAttendance } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function OverallAttendanceReport() {
  const [courseId, setCourseId] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadReport = async () => {
    if (!courseId) {
      setError("Please enter Course ID");
      setData([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await getOverallAttendance(courseId);
      setData(res.data || []);
    } catch (err) {
      setData([]);
      setError("No attendance data found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="number"
        placeholder="Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />

      <button onClick={loadReport} disabled={loading}>
        Load Report
      </button>

      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="mt-15">
          <Skeleton type="table-row" count={6} />
        </div>
      )}

      {/* ===== Error ===== */}
      {!loading && error && (
        <p className="error-text">{error}</p>
      )}

      {/* ===== Table ===== */}
      {!loading && data.length > 0 && (
        <table className="mt-15">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Total Classes</th>
              <th>Present</th>
              <th>Percentage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.studentId}>
                <td>{d.studentId}</td>
                <td>{d.totalClasses}</td>
                <td>{d.presentCount}</td>
                <td>{d.attendancePercentage.toFixed(2)}%</td>
                <td
                  className={
                    d.status === "SAFE"
                      ? "status-safe"
                      : "status-shortage"
                  }
                >
                  {d.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && courseId && data.length === 0 && (
        <div className="empty-state">
          <span>👥</span>
          No attendance data available for this course
        </div>
      )}
    </>
  );
}

export default OverallAttendanceReport;
