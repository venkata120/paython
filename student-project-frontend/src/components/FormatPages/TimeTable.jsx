export default function TimeTable({ timetable, timings }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          🗓 Weekly Time Table
        </h2>
        <span className="text-sm text-gray-500">
          Mon – Sat
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border">

        <table className="min-w-full border-collapse text-sm">

          {/* TABLE HEAD */}
          <thead>
            <tr className="bg-indigo-50 text-indigo-700">
              <th className="sticky left-0 z-10 bg-indigo-50 border px-4 py-3 text-left">
                Day
              </th>

              {["P1","P2","P3","P4","P5","P6","P7"].map(p => (
                <th
                  key={p}
                  className="border px-4 py-3 text-center whitespace-nowrap"
                >
                  <div className="font-semibold">{p}</div>
                  <div className="text-xs text-gray-500">
                    {timings[p]}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {timetable.map((row, index) => (
              <tr
                key={index}
                className={`transition
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  hover:bg-indigo-50`}
              >
                {/* DAY COLUMN */}
                <td className="sticky left-0 bg-inherit border px-4 py-3 font-semibold text-gray-800">
                  {row.day}
                </td>

                {/* PERIODS */}
                {["P1","P2","P3","P4","P5","P6","P7"].map(p => {
                  const isLab = row[p]?.toLowerCase().includes("lab");

                  return (
                    <td
                      key={p}
                      className={`border px-3 py-3 text-center
                        ${isLab
                          ? "bg-green-50 text-green-700 font-semibold"
                          : "text-gray-700"
                        }`}
                    >
                      {row[p] || "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* FOOTER LEGEND */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
        <span>⏱ Morning: 55 mins</span>
        <span>⏱ Afternoon: 45 mins</span>
        <span>☕ Break: 10:50 – 11:10</span>
        <span>🍴 Lunch: 1:00 – 2:00</span>
        <span>☕ Break: 3:30 – 3:45</span>
        <span className="text-green-700 font-semibold">🟩 Labs</span>
      </div>

    </div>
  );
}
