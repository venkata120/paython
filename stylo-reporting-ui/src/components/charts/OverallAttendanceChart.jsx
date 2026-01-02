import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { getOverallAttendance } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function OverallAttendanceChart() {
  const [courseId, setCourseId] = useState("");
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadChart = async () => {
    if (!courseId) {
      setError("Please enter Course ID");
      setChartData(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getOverallAttendance(courseId);
      const list = res.data || [];

      if (list.length === 0) {
        setChartData(null);
        setError("No attendance data available");
        return;
      }

      const labels = list.map(
        (d) => `Student ${d.studentId}`
      );
      const present = list.map((d) => d.presentCount);
      const absent = list.map(
        (d) => Math.max(d.totalClasses - d.presentCount, 0)
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Present",
            data: present,
            backgroundColor: "#22c55e"
          },
          {
            label: "Absent",
            data: absent,
            backgroundColor: "#ef4444"
          }
        ]
      });
    } catch (err) {
      setChartData(null);
      setError("Unable to load overall attendance chart");
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

      <button onClick={loadChart} disabled={loading}>
        Load Chart
      </button>

      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="chart-container mt-15">
          <Skeleton type="line" count={6} />
        </div>
      )}

      {/* ===== Error ===== */}
      {!loading && error && (
        <p className="error-text">{error}</p>
      )}

      {/* ===== Chart ===== */}
      {!loading && chartData && (
        <div className="chart-container mt-15">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" }
              }
            }}
          />
        </div>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && !chartData && courseId && (
        <div className="empty-state">
          <span>📈</span>
          No overall attendance chart data available
        </div>
      )}
    </>
  );
}

export default OverallAttendanceChart;
