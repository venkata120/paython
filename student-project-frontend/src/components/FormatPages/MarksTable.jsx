export default function MarksTable({ subjects }) {

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">

      {/* TITLE */}
      <h2 className="text-lg font-semibold text-gray-800 mb-5">
        📘 Subject-wise Marks & Attendance
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">

          {/* HEADER */}
          <thead>
            <tr className="bg-indigo-50 text-indigo-700">
              <th className="border px-4 py-3 text-left">Subject</th>
              <th className="border px-4 py-3 text-center">Mid-1</th>
              <th className="border px-4 py-3 text-center">Mid-2</th>
              <th className="border px-4 py-3 text-center">Final</th>
              <th className="border px-4 py-3 text-center">Lab</th>
              <th className="border px-4 py-3 text-center">Attendance</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {subjects.map((s, i) => (
              <tr
                key={i}
                className={`
                  transition
                  ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  hover:bg-indigo-50
                `}
              >
                {/* SUBJECT */}
                <td className="border px-4 py-3 font-medium text-gray-800">
                  {s.name}
                </td>

                {/* MARKS */}
                <td className="border px-4 py-3 text-center">{s.mid1}</td>
                <td className="border px-4 py-3 text-center">{s.mid2}</td>
                <td className="border px-4 py-3 text-center font-semibold">
                  {s.final}
                </td>
                <td className="border px-4 py-3 text-center">
                  {s.lab === "-" ? "—" : s.lab}
                </td>

                {/* ATTENDANCE */}
                <td className="border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full
                          ${s.attendance >= 75 ? "bg-green-500" : "bg-red-500"}
                        `}
                        style={{ width: `${s.attendance}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold">
                      {s.attendance}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
