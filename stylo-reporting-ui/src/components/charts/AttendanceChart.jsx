import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { getAttendanceReport } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function AttendanceChart() {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadChart = async () => {
    if (!studentId || !courseId) {
      setError("Please enter Student ID and Course ID");
      setChartData(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getAttendanceReport(studentId, courseId);
      const d = res.data || {};

      const total = d.totalClasses ?? 0;
      const present = d.presentCount ?? 0;
      const absent = Math.max(total - present, 0);

      if (total === 0) {
        setChartData(null);
        setError("No attendance data available");
        return;
      }

      setChartData({
        labels: ["Present", "Absent"],
        datasets: [
          {
            data: [present, absent],
            backgroundColor: ["#22c55e", "#ef4444"],
            borderWidth: 1
          }
        ]
      });
    } catch (err) {
      setChartData(null);
      setError("Unable to load attendance chart");
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

      <button onClick={loadChart} disabled={loading}>
        Load Chart
      </button>

      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="chart-container mt-15">
          <Skeleton type="line" count={5} />
        </div>
      )}

      {/* ===== Error ===== */}
      {!loading && error && (
        <p className="error-text">{error}</p>
      )}

      {/* ===== Chart ===== */}
      {!loading && chartData && (
        <div className="chart-container mt-15">
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top"
                }
              }
            }}
          />
        </div>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && !chartData && studentId && courseId && (
        <div className="empty-state">
          <span>📊</span>
          No attendance chart data available
        </div>
      )}
    </>
  );
}

export default AttendanceChart;
