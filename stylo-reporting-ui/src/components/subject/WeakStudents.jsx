import { useState } from "react";
import { getWeakStudents } from "../../api/reportApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function WeakStudents() {
  const [subjectId, setSubjectId] = useState("");
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadWeakStudents = async () => {
    if (!subjectId) {
      setError("Please enter Subject ID");
      setStudents([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getWeakStudents(subjectId);

      if (!res.data || res.data.length === 0) {
        setStudents([]);
        setError("No weak students found for this subject");
        return;
      }

      setStudents(res.data);
    } catch (err) {
      console.error(err);
      setStudents([]);
      setError("No weak students found for this subject");
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

      <button
        onClick={loadWeakStudents}
        disabled={loading || !subjectId}
      >
        Load Weak Students
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

      {/* ===== Weak Students Table ===== */}
      {!loading && students.length > 0 && (
        <table className="mt-10">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Marks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr
                key={`${s.studentId}-${index}`}
                className="status-shortage"
              >
                <td>{s.studentId}</td>
                <td>{s.marksObtained}</td>
                <td>{s.performance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && students.length === 0 && subjectId && (
        <div className="empty-state">
          <span>⚠️</span>
          No weak students identified
        </div>
      )}
    </>
  );
}

export default WeakStudents;
