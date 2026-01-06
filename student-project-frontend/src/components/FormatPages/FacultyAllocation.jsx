export default function FacultyAllocation({ faculty }) {

  if (!faculty) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">

      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        👩‍🏫 Faculty Allocation
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-3 text-left">Subject</th>
              <th className="border px-4 py-3 text-left">Faculty</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(faculty).map(([subject, teacher], i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-4 py-3 font-medium">
                  {subject}
                </td>
                <td className="border px-4 py-3 text-gray-700">
                  {teacher}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
