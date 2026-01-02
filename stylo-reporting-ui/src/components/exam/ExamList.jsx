import { useState } from "react";
import { getExamsBySemester } from "../../api/examApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function ExamList() {
  const [semester, setSemester] = useState("");
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadExams = async () => {
    if (!semester) {
      setError("Please enter semester");
      setExams([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await getExamsBySemester(semester);
      setExams(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load exams");
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="number"
        placeholder="Enter Semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      />

      <button onClick={loadExams} disabled={loading}>
        Load Exams
      </button>

      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="mt-15">
          <Skeleton type="table-row" count={5} />
        </div>
      )}

      {/* ===== Error ===== */}
      {!loading && error && (
        <p className="error-text">{error}</p>
      )}

      {/* ===== Table ===== */}
      {!loading && exams.length > 0 && (
        <table className="mt-15">
          <thead>
            <tr>
              <th>Exam ID</th>
              <th>Subject ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.subjectId}</td>
                <td>{exam.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && semester && exams.length === 0 && (
        <div className="empty-state">
          <span>📭</span>
          No exams found for this semester
        </div>
      )}
    </>
  );
}

export default ExamList;
