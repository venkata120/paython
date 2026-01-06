import { PieChart, Pie, Cell } from "recharts";

export default function PerformanceSummary() {

  // Dummy structure values (UI only)
  const marksData = [
    { name: "Obtained", value: 0 },
    { name: "Remaining", value: 100 }
  ];

  const attendanceData = [
    { name: "Present", value: 0 },
    { name: "Absent", value: 100 }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">

      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        📊 Overall Performance Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* MARKS PIE */}
        <div className="flex flex-col items-center">
          <h3 className="font-medium mb-3">Marks %</h3>

          <PieChart width={200} height={200}>
            <Pie
              data={marksData}
              dataKey="value"
              outerRadius={80}
            >
              <Cell fill="#22c55e" />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>

          <p className="text-sm text-gray-500 mt-2">
            Awaiting marks
          </p>
        </div>

        {/* ATTENDANCE PIE */}
        <div className="flex flex-col items-center">
          <h3 className="font-medium mb-3">Attendance %</h3>

          <PieChart width={200} height={200}>
            <Pie
              data={attendanceData}
              dataKey="value"
              outerRadius={80}
            >
              <Cell fill="#3b82f6" />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>

          <p className="text-sm text-gray-500 mt-2">
            Attendance not updated
          </p>
        </div>

      </div>
    </div>
  );
}
