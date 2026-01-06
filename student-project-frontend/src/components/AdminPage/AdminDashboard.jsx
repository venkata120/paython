import TimetableEditor from "./TimetableEditor";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">
        Admin – Timetable Editor
      </h1>
      <TimetableEditor />
    </div>
  );
}
