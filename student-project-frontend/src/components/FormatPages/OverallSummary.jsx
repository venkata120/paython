import { PieChart, Pie, Cell } from "recharts";

export default function OverallSummary({ subjects }) {

  // ===== CALCULATIONS =====
  const avgMarks =
    subjects.reduce((sum, s) => sum + s.final, 0) / subjects.length;

  const avgAttendance =
    subjects.reduce((sum, s) => sum + s.attendance, 0) / subjects.length;

  // ===== PIE DATA =====
  const marksData = [
    { name: "Scored", value: avgMarks },
    { name: "Remaining", value: 100 - avgMarks }
  ];

  const attendanceData = [
    { name: "Present", value: avgAttendance },
    { name: "Absent", value: 100 - avgAttendance }
  ];

  // ===== COLORS =====
  const MARKS_COLORS = ["#22c55e", "#e74848"];       // green / red
  const ATTEND_COLORS = ["#3b82f6", "#e74848"];     // blue / red

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">

      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        📊 Overall Performance Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">

        {/* ===== TOTAL MARKS ===== */}
        <div className="text-center">
          <h3 className="font-semibold text-gray-700 mb-3">
            Total Marks
          </h3>

          <PieChart width={220} height={220}>
            <Pie
              data={marksData}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
              startAngle={90}
              endAngle={-270}
            >
              {marksData.map((_, i) => (
                <Cell key={i} fill={MARKS_COLORS[i]} />
              ))}
            </Pie>
          </PieChart>

          <p className="mt-2 text-lg font-bold text-green-600">
            {avgMarks.toFixed(1)}%
          </p>
        </div>

        {/* ===== ATTENDANCE ===== */}
        <div className="text-center">
          <h3 className="font-semibold text-gray-700 mb-3">
            Attendance
          </h3>

          <PieChart width={220} height={220}>
            <Pie
              data={attendanceData}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
              startAngle={90}
              endAngle={-270}
            >
              {attendanceData.map((_, i) => (
                <Cell key={i} fill={ATTEND_COLORS[i]} />
              ))}
            </Pie>
          </PieChart>

          <p className="mt-2 text-lg font-bold text-blue-600">
            {avgAttendance.toFixed(1)}%
          </p>
        </div>

      </div>

      {/* ===== FOOTER INFO ===== */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Green = Marks Scored &nbsp;|&nbsp; Blue = Attendance
      </div>
    </div>
  );
}
