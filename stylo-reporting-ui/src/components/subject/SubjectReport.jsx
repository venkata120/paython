import { useState } from "react";
import { getSubjectReport } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function SubjectReport() {
  const [subjectId, setSubjectId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadReport = async () => {
    if (!subjectId) {
      setError("Please enter Subject ID");
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getSubjectReport(subjectId);

      if (!res.data) {
        setData(null);
        setError("No data found for this subject");
        return;
      }

      setData(res.data);
    } catch (err) {
      console.error(err);
      setData(null);
      setError("No data found for this subject");
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

      <button onClick={loadReport} disabled={loading || !subjectId}>
        Load Report
      </button>

      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="mt-10">
          <Skeleton type="stats" count={4} />
        </div>
      )}

      {/* ===== Error ===== */}
      {!loading && error && (
        <p className="error-text">{error}</p>
      )}

      {/* ===== Subject Stats ===== */}
      {!loading && data && (
        <div className="mt-10">
          <p>
            <strong>Total Students:</strong> {data.totalStudents}
          </p>
          <p>
            <strong>Average Marks:</strong>{" "}
            {(data.averageMarks ?? 0).toFixed(2)}
          </p>
          <p>
            <strong>Pass Count:</strong> {data.passCount}
          </p>
          <p>
            <strong>Fail Count:</strong> {data.failCount}
          </p>
        </div>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && !data && subjectId && (
        <div className="empty-state">
          <span>📘</span>
          No subject report available
        </div>
      )}
    </>
  );
}

export default SubjectReport;
