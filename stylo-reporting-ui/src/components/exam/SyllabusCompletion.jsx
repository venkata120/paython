import { useState } from "react";
import { getSyllabusCompletion } from "../../api/examApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function SyllabusCompletion() {
  const [subjectId, setSubjectId] = useState("");
  const [semester, setSemester] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCompletion = async () => {
    if (!subjectId || !semester) {
      setError("Please enter both Subject ID and Semester");
      setPercentage(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await getSyllabusCompletion(subjectId, semester);
      setPercentage(res.data);
    } catch (err) {
      console.error("Failed to load syllabus completion", err);
      setError("Syllabus data not found");
      setPercentage(null);
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

      <input
        type="number"
        placeholder="Semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      />

      <button onClick={loadCompletion} disabled={loading}>
        Check Completion
      </button>

      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="mt-15">
          <Skeleton type="line" count={2} />
        </div>
      )}

      {/* ===== Error ===== */}
      {!loading && error && (
        <p className="error-text">{error}</p>
      )}

      {/* ===== Result ===== */}
      {!loading && percentage !== null && !error && (
        <div className="mt-15">
          <p>
            Completion: <strong>{percentage.toFixed(2)}%</strong>
          </p>

          {percentage >= 80 ? (
            <p className="status-safe">
              ✅ Eligible for Exam
            </p>
          ) : (
            <p className="status-shortage">
              ❌ Not Eligible for Exam
            </p>
          )}
        </div>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && !percentage && subjectId && semester && (
        <div className="empty-state">
          <span>📘</span>
          No syllabus completion data available
        </div>
      )}
    </>
  );
}

export default SyllabusCompletion;
