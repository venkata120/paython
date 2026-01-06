import { useNavigate } from "react-router-dom";

export default function StudentSuccess() {

  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("studentSummary"));

  if (!student) {
    navigate("/");
    return null;
  }

  const fullName = `${student.firstName} ${student.lastName}`;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔹 NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">
          Student Portal
        </h1>

        <div className="text-right">
          <p className="text-sm text-gray-500">Register Number</p>
          <p className="font-semibold text-gray-800">
            {student.registerNumber}
          </p>
          <p className="text-sm text-gray-600">
            {fullName}
          </p>
        </div>
      </nav>

      {/* 🔹 SUCCESS MESSAGE */}
      <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-2">
          🎉 Submission Successful
        </h2>
        <p className="text-gray-600">
          Choose your course category to proceed
        </p>
      </div>

      {/* 🔹 COURSE CARDS */}
      <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* B.TECH CARD */}
        <div
          onClick={() => navigate("/student/btech")}
          className="bg-white p-8 rounded-xl shadow-lg cursor-pointer
                     hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          <h3 className="text-2xl font-bold text-indigo-700 mb-2">
            🎓 B.Tech
          </h3>
          <p className="text-gray-600">
            Engineering & Technology programs
          </p>
        </div>

        {/* DEGREE CARD */}
        <div
          onClick={() => navigate("/student/degree")}
          className="bg-white p-8 rounded-xl shadow-lg cursor-pointer
                     hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          <h3 className="text-2xl font-bold text-emerald-700 mb-2">
            📘 Degree
          </h3>
          <p className="text-gray-600">
            Undergraduate degree programs
          </p>
        </div>

      </div>
    </div>
  );
}
