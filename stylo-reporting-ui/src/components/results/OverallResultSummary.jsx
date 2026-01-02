import { useEffect, useState } from "react";
import { getOverallResults } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function OverallResultSummary() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getOverallResults();

      if (!res.data || res.data.length === 0) {
        setResults([]);
        setError("No result data available");
        return;
      }

      setResults(res.data);
    } catch (err) {
      console.error(err);
      setResults([]);
      setError("Failed to load overall results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="mt-10">
          <Skeleton type="table-row" count={6} />
        </div>
      )}

      {/* ===== Error ===== */}
      {!loading && error && (
        <p className="error-text">{error}</p>
      )}

      {/* ===== Results Table ===== */}
      {!loading && results.length > 0 && (
        <table className="mt-10">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Total Marks</th>
              <th>Percentage</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.studentId}>
                <td>{r.studentId}</td>
                <td>{r.totalMarks}</td>
                <td>{r.percentage.toFixed(2)}%</td>
                <td
                  className={
                    r.result === "PASS"
                      ? "status-safe"
                      : "status-shortage"
                  }
                >
                  {r.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && results.length === 0 && (
        <div className="empty-state">
          <span>📊</span>
          No overall result summary available
        </div>
      )}
    </>
  );
}

export default OverallResultSummary;
