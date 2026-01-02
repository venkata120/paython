import { useState } from "react";
import { getMarkSheet } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function ConsolidatedMarkSheet() {
  const [studentId, setStudentId] = useState("");
  const [sheet, setSheet] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadSheet = async () => {
    if (!studentId) {
      setError("Please enter Student ID");
      setSheet(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getMarkSheet(studentId);

      if (!res.data || !res.data.subjects || res.data.subjects.length === 0) {
        setError("No marksheet data found");
        setSheet(null);
        return;
      }

      setSheet(res.data);
    } catch (err) {
      console.error("Failed to load marksheet", err);
      setSheet(null);
      setError("Unable to load marksheet");
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

      <button onClick={loadSheet} disabled={loading || !studentId}>
        Load Mark Sheet
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

      {/* ===== Mark Sheet Table ===== */}
      {!loading && sheet && (
        <>
          <table className="mt-15">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Max</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {sheet.subjects.map((s, index) => (
                <tr key={`${s.subjectId}-${index}`}>
                  <td>{s.subjectId}</td>
                  <td>{s.marksObtained}</td>
                  <td>{s.maxMarks}</td>
                  <td
                    className={
                      s.result === "PASS"
                        ? "status-safe"
                        : "status-shortage"
                    }
                  >
                    {s.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-15">
            <p>
              <strong>Total Marks:</strong> {sheet.totalMarks}
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              {sheet.percentage.toFixed(2)}%
            </p>
            <p>
              <strong>Final Result:</strong>{" "}
              <span
                className={
                  sheet.result === "PASS"
                    ? "status-safe"
                    : "status-shortage"
                }
              >
                {sheet.result}
              </span>
            </p>
          </div>
        </>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && !sheet && studentId && (
        <div className="empty-state">
          <span>📄</span>
          No consolidated mark sheet available
        </div>
      )}
    </>
  );
}

export default ConsolidatedMarkSheet;
