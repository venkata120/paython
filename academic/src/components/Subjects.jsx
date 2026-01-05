import { useEffect, useState } from "react";
import { 
  Library, Plus, Loader2, Trash2, Pencil, 
  X, Check, Search, Filter, BookOpen, Type 
} from "lucide-react";
import api from "../api/api";

export default function Subjects() {
  const [list, setList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);         
  const [filteredCourses, setFilteredCourses] = useState([]); 
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  // Selection States
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [subjectName, setSubjectName] = useState(""); // Changed from 'name'
  const [semNo, setSemNo] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setFetching(true);
    try {
      const [subRes, courseRes, deptRes] = await Promise.all([
        api.get("/subjects"),
        api.get("/courses"),
        api.get("/departments")
      ]);
      setList(subRes.data);
      setCourses(courseRes.data);
      setDepartments(deptRes.data);
    } catch (err) {
      console.error("Backend connection failed");
    } finally {
      setFetching(false);
    }
  };

  const handleDeptChange = (deptId) => {
    setSelectedDeptId(deptId);
    setCourseId(""); 
    if (deptId) {
      const filtered = courses.filter(c => c.department?.id === parseInt(deptId));
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!courseId || !subjectName || !semNo) return;
    setLoading(true);

    // Payload matches the Subject Entity structure
    const payload = {
      subjectName: subjectName,
      semesterNumber: Number(semNo),
      course: { id: parseInt(courseId) }
    };

    try {
      if (editingId) {
        // Changed to .put to match @PutMapping in Controller
        await api.put(`/subjects/${editingId}`, payload);
        setEditingId(null);
      } else {
        // Your controller POST maps directly to @RequestBody Subject
        await api.post(`/subjects`, payload);
      }
      resetForm();
      await fetchInitialData();
    } catch (e) {
      alert("Error processing request. Ensure all fields are valid.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditInitiate = (s) => {
    setEditingId(s.id);
    setSubjectName(s.subjectName); // Match backend field
    setSemNo(s.semesterNumber);
    
    if (s.course?.department?.id) {
      const dId = s.course.department.id.toString();
      setSelectedDeptId(dId);
      const filtered = courses.filter(c => c.department?.id === parseInt(dId));
      setFilteredCourses(filtered);
      setCourseId(s.course.id.toString());
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setSubjectName(""); 
    setSemNo(""); 
    setCourseId("");
    setSelectedDeptId("");
    setFilteredCourses([]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;
    try {
      await api.delete(`/subjects/${id}`);
      await fetchInitialData();
    } catch (e) {
      alert("Deletion failed. This subject may be linked to Faculty Workload.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Library className="text-indigo-600 w-8 h-8" />
              Subject Management
            </h1>
            <p className="text-slate-500 font-medium mt-1">Filter by Department and Course to manage subjects.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
             <span className="text-slate-600 font-bold text-sm">{list.length} Subjects Linked</span>
          </div>
        </div>

        {/* Input Form */}
        <div className={`bg-white p-6 rounded-3xl border shadow-sm mb-8 transition-all ${editingId ? 'border-amber-400 ring-4 ring-amber-50' : 'border-slate-100'}`}>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Department</label>
                <select 
                  required 
                  value={selectedDeptId} 
                  onChange={(e) => handleDeptChange(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="">Select Department</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.departmentName || d.name}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Course</label>
                <select 
                  required 
                  value={courseId} 
                  onChange={(e) => setCourseId(e.target.value)}
                  disabled={!selectedDeptId}
                  className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                >
                  <option value="">Select Course</option>
                  {filteredCourses.map(c => <option key={c.id} value={c.id}>{c.courseName}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Subject Name</label>
                <input 
                  required
                  placeholder="e.g. Data Structures"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-2">Semester</label>
                <input 
                  type="number"
                  required
                  placeholder="1-8"
                  value={semNo}
                  onChange={(e) => setSemNo(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {editingId && (
                <button type="button" onClick={resetForm} className="px-6 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-all">
                  Cancel
                </button>
              )}
              <button 
                disabled={loading}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : editingId ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {editingId ? "Update Subject" : "Add Subject"}
              </button>
            </div>
          </form>
        </div>

        {/* List View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fetching ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
              <p className="font-bold">Fetching subjects...</p>
            </div>
          ) : list.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300 text-slate-400 font-medium">
              No subjects found. Add your first subject above.
            </div>
          ) : (
            list.map((s) => (
              <div key={s.id} className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                    <BookOpen size={24} />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => handleEditInitiate(s)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{s.subjectName}</h3>
                  <p className="text-slate-500 text-sm font-semibold flex items-center gap-2">
                    {s.course?.courseName} 
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    Sem {s.semesterNumber}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Department:</span>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                    {s.course?.department?.departmentName || "General"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
