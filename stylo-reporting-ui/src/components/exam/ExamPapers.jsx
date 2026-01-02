import { useState } from "react";
import { getExamPapers } from "../../api/examApi";
import Skeleton from "../ui/Skeleton";
import "../../styles/common.css";

function ExamPapers() {
  const [examId, setExamId] = useState("");
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPapers = async () => {
    if (!examId) {
      setError("Please enter Exam ID");
      setPapers([]);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await getExamPapers(examId);
      setPapers(res.data || []);
    } catch (err) {
      console.error("Error loading exam papers:", err);
      setError("Failed to load exam papers");
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="number"
        placeholder="Enter Exam ID"
        value={examId}
        onChange={(e) => setExamId(e.target.value)}
      />

      <button onClick={loadPapers} disabled={loading}>
        Load Papers
      </button>

      {/* ===== Loading Skeleton ===== */}
      {loading && (
        <div className="mt-15">
          <Skeleton type="line" count={4} />
        </div>
      )}

      {/* ===== Error ===== */}
      {!loading && error && (
        <p className="error-text">{error}</p>
      )}

      {/* ===== Papers List ===== */}
      {!loading && papers.length > 0 && (
        <ul className="mt-15">
          {papers.map((paper) => (
            <li key={paper.id} className="mt-10">
              <strong>Question Paper</strong>{" "}
              <span style={{ color: "#64748b" }}>
                — Uploaded on {paper.uploadedDate}
              </span>

              {paper.fileUrl ? (
                <a
                  href={paper.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "10px" }}
                >
                  View / Download
                </a>
              ) : (
                <span style={{ marginLeft: "10px", color: "#9ca3af" }}>
                  (File not available)
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* ===== Empty State ===== */}
      {!loading && !error && examId && papers.length === 0 && (
        <div className="empty-state">
          <span>📂</span>
          No exam papers found for this exam
        </div>
      )}
    </>
  );
}

export default ExamPapers;
