import { useState } from "react";
import { getRankList } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function RankList() {
  const [subjectId, setSubjectId] = useState("");
  const [ranks, setRanks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadRanks = async () => {
    if (!subjectId) {
      setError("Please enter Subject ID");
      setRanks([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getRankList(subjectId);

      if (!res.data || res.data.length === 0) {
        setRanks([]);
        setError("No rank data found for this subject");
        return;
      }

      setRanks(res.data);
    } catch (err) {
      console.error(err);
      setRanks([]);
      setError("No rank data found for this subject");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="number"
        placeholder="Subject ID"
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
      />

      <button onClick={loadRanks} disabled={loading || !subjectId}>
        Load Rank List
      </button>

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

      {/* ===== Rank Table ===== */}
      {!loading && ranks.length > 0 && (
        <table className="mt-10">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student ID</th>
              <th>Marks</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {ranks.map((r, index) => (
              <tr
                key={`${r.studentId}-${index}`}
                className={
                  r.performance === "WEAK"
                    ? "status-shortage"
                    : ""
                }
              >
                <td>{r.rank}</td>
                <td>{r.studentId}</td>
                <td>{r.marksObtained}</td>
                <td>{r.performance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && ranks.length === 0 && subjectId && (
        <div className="empty-state">
          <span>📊</span>
          No rank list available for this subject
        </div>
      )}
    </>
  );
}

export default RankList;
