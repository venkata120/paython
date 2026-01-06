export default function FacultyEditor({ faculty, onChange }) {

  if (!faculty || Object.keys(faculty).length === 0) {
    return (
      <p className="text-gray-500 italic">
        Faculty data not available
      </p>
    );
  }

  const updateFaculty = (subject, value) => {
    onChange({
      ...faculty,
      [subject]: value
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl border">
      <h2 className="text-lg font-semibold mb-4">
        👩‍🏫 Faculty Allocation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(faculty).map(([subject, teacher]) => (
          <div key={subject}>
            <label className="text-sm font-medium text-gray-700">
              {subject}
            </label>
            <input
              value={teacher}
              onChange={e => updateFaculty(subject, e.target.value)}
              className="
                w-full
                mt-1
                border
                rounded-lg
                px-3
                py-2
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
              placeholder="Faculty name"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
