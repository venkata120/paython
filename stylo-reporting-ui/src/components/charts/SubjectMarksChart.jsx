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
import { getSubjectReport } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function SubjectMarksChart() {
  const [subjectId, setSubjectId] = useState("");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadChart = async () => {
    if (!subjectId) {
      setError("Please enter Subject ID");
      setChartData(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getSubjectReport(subjectId);
      const avg = res.data?.averageMarks ?? 0;

      setChartData({
        labels: ["Average Marks"],
        datasets: [
          {
            label: "Marks",
            data: [avg],
            backgroundColor: "#3b82f6"
          }
        ]
      });
    } catch (err) {
      console.error(err);
      setChartData(null);
      setError("Unable to load subject marks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="number"
        placeholder="Enter Subject ID"
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
      />

      <button onClick={loadChart} disabled={loading}>
        Load Chart
      </button>

      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="chart-container mt-15">
          <Skeleton type="line" count={4} />
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
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }}
          />
        </div>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && !chartData && subjectId && (
        <div className="empty-state">
          <span>📘</span>
          No subject marks data available
        </div>
      )}
    </>
  );
}

export default SubjectMarksChart;
