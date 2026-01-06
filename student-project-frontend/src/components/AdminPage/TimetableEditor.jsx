import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { TIMETABLE, COMMON_TIMINGS } from "../Data/timetableData";
import EditableTimetable from "./EditableTimetable";
import FacultyEditor from "./FacultyEditor";

const STORAGE_KEY = "ADMIN_TIMETABLE";

export default function TimetableEditor() {

  const [course, setCourse] = useState("BTECH");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState(1);

  const [data, setData] = useState(null);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    const adminData =
      saved?.[course]?.[branch]?.[semester];

    const defaultData =
      TIMETABLE?.[course]?.[branch]?.[semester];

    const finalData = adminData || defaultData;

    // 🔥 deep clone prevents reference bugs
    setData(
      finalData ? JSON.parse(JSON.stringify(finalData)) : null
    );

  }, [course, branch, semester]);

  /* ================= SAVE ================= */
  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    if (!saved[course]) saved[course] = {};
    if (!saved[course][branch]) saved[course][branch] = {};

    saved[course][branch][semester] = data;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    toast.success("Timetable saved successfully");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-6">

      {/* SELECTORS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Select label="Course" value={course} onChange={setCourse}
          options={["BTECH"]}
        />

        <Select label="Branch" value={branch} onChange={setBranch}
          options={["CSE","ECE","EEE","MECH","CIVIL"]}
        />

        <Select label="Semester" value={semester}
          onChange={val => setSemester(Number(val))}
          options={[1,2,3,4,5,6,7,8]}
        />
      </div>

      {!data ? (
        <p className="text-red-500">No data found</p>
      ) : (
        <>
          <EditableTimetable
            key={`${course}-${branch}-${semester}`}
            timetable={data.timetable}
            timings={COMMON_TIMINGS}
            onChange={tt => setData({ ...data, timetable: tt })}
          />

          <FacultyEditor
            faculty={data.faculty}
            onChange={f => setData({ ...data, faculty: f })}
          />

          <div className="text-right">
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ===== SELECT ===== */
function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border rounded p-2"
      >
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
