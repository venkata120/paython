export default function SubjectPerformanceTable({ subjects }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">

      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        📘 Subject Performance 
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">

          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-3 text-left">Subject</th>
              <th className="border px-4 py-3 text-center">Mid-1</th>
              <th className="border px-4 py-3 text-center">Mid-2</th>
              <th className="border px-4 py-3 text-center">Final</th>
              <th className="border px-4 py-3 text-center">Lab</th>
              <th className="border px-4 py-3 text-center">Attendance %</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-4 py-3 font-medium text-gray-800">
                  {subject}
                </td>

                {/* PLACEHOLDERS */}
                <td className="border px-4 py-3 text-center text-gray-400">—</td>
                <td className="border px-4 py-3 text-center text-gray-400">—</td>
                <td className="border px-4 py-3 text-center text-gray-400">—</td>
                <td className="border px-4 py-3 text-center text-gray-400">—</td>
                <td className="border px-4 py-3 text-center text-gray-400">—</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        * Marks and attendance will be updated by admin.
      </p>
    </div>
  );
}