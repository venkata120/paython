import { useParams } from "react-router-dom";

export default function SemesterMarks() {
  const { semester } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">
        Semester {semester} Marks
      </h1>
    </div>
  );
}
