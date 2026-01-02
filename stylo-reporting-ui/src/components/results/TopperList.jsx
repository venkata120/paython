import { useEffect, useState } from "react";
import { getToppers } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function TopperList() {
  const [toppers, setToppers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadToppers();
  }, []);

  const loadToppers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getToppers(5); // Top 5 students

      if (!res.data || res.data.length === 0) {
        setToppers([]);
        setError("No toppers found");
        return;
      }

      setToppers(res.data);
    } catch (err) {
      console.error(err);
      setToppers([]);
      setError("Failed to load topper list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="mt-10">
          <Skeleton type="table-row" count={5} />
        </div>
      )}

      {/* ===== Error ===== */}
      {!loading && error && (
        <p className="error-text">{error}</p>
      )}

      {/* ===== Topper Table ===== */}
      {!loading && toppers.length > 0 && (
        <table className="mt-10">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student ID</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {toppers.map((t, index) => (
              <tr key={t.studentId}>
                <td>{index + 1}</td>
                <td>{t.studentId}</td>
                <td>{t.percentage.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && toppers.length === 0 && (
        <div className="empty-state">
          <span>🏆</span>
          No topper data available
        </div>
      )}
    </>
  );
}

export default TopperList;
