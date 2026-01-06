export default function EditableTimetable({ timetable, timings, onChange }) {

  const periods = ["P1","P2","P3","P4","P5","P6","P7"];

  const updateCell = (rowIndex, period, value) => {
    const updated = timetable.map((row, i) =>
      i === rowIndex ? { ...row, [period]: value } : row
    );
    onChange(updated);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[1100] w-full border border-gray-300 rounded-lg overflow-hidden">

        {/* ===== TABLE HEADER ===== */}
        <thead className="bg-indigo-700 text-white">
          <tr>
            <th className="w-40 px-4 py-4 text-left text-sm font-semibold">
              Day
            </th>

            {periods.map(p => (
              <th
                key={p}
                className="px-3 py-4 text-center text-sm font-semibold"
              >
                <div>{p}</div>
                <div className="text-xs opacity-80 mt-1">
                  {timings[p]}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* ===== TABLE BODY ===== */}
        <tbody className="bg-white">
          {timetable.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t hover:bg-gray-50 transition"
            >
              {/* Day */}
              <td className="px-4 py-4 font-semibold text-gray-700 bg-gray-100">
                {row.day}
              </td>

              {/* Period Inputs */}
              {periods.map(p => (
                <td key={p} className="px-2 py-3">
                  <input
                    type="text"
                    value={row[p] || ""}
                    onChange={e =>
                      updateCell(rowIndex, p, e.target.value)
                    }
                    placeholder="Subject"
                    className="
                      w-full
                      h-10
                      rounded-md
                      border
                      border-gray-300
                      px-3
                      text-sm
                      text-gray-700
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500
                    "
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
