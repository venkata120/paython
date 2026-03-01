import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Building2, BookOpen, Library, 
  Users, RefreshCw, Loader2, ChevronRight, Activity
} from "lucide-react"; 
import api from "../api/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ depts: 0, courses: 0, subjects: 0, staff: 0 });
  const [departmentDetails, setDepartmentDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [deptRes, courseRes, subjectRes, staffRes] = await Promise.all([
        api.get("/departments"), api.get("/courses"),
        api.get("/subjects"), api.get("/staff")
      ]);

      setCounts({
        depts: deptRes.data?.length || 0,
        courses: courseRes.data?.length || 0,
        subjects: subjectRes.data?.length || 0,
        staff: staffRes.data?.length || 0
      });

      const detailedData = deptRes.data?.map(dept => ({
        ...dept,
        courseCount: courseRes.data?.filter(c => c.department?.id === dept.id).length || 0,
        coursesDetails: courseRes.data?.filter(c => c.department?.id === dept.id).map(course => ({
          ...course,
          subjects: subjectRes.data?.filter(s => s.course?.id === course.id) || []
        }))
      })) || [];

      setDepartmentDetails(detailedData);
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
      <p className="text-slate-500 font-medium animate-pulse">Syncing Academic Data...</p>
    </div>
  );

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">University Oversight</h1>
          <p className="text-slate-500 flex items-center gap-2 mt-1">
            <Activity size={16} className="text-emerald-500" /> Academic Ops Status: Operational
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={loadData} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-slate-700 shadow-sm">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Refresh Data
          </button>
        </div>
      </header>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={<Building2 />} label="Departments" value={counts.depts} color="indigo" onClick={() => navigate('/departments')} />
        <MetricCard icon={<BookOpen />} label="Total Courses" value={counts.courses} color="emerald" onClick={() => navigate('/courses')} />
        <MetricCard icon={<Library />} label="Registered Subjects" value={counts.subjects} color="violet" onClick={() => navigate('/subjects')} />
        <MetricCard icon={<Users />} label="Faculty Members" value={counts.staff} color="blue" onClick={() => navigate('/staffmanagement')} />
      </div>

      {/* Dept Breakdown Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Departmental Intelligence</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {departmentDetails.map((dept) => (
            <div key={dept.id} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{dept.name}</h3>
                  <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">{dept.courseCount} Courses Enrolled</p>
                </div>
                <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 uppercase tracking-widest">Dept ID: {dept.id}</div>
              </div>
              
              <div className="space-y-3">
                {dept.coursesDetails?.slice(0, 3).map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-indigo-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-150 transition-transform" />
                      <span className="font-semibold text-slate-700">{course.name}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-200">
                      {course.subjects?.length || 0} Subjects
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, color, onClick }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 hover:border-indigo-300",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 hover:border-emerald-300",
    violet: "bg-violet-50 text-violet-600 border-violet-100 hover:border-violet-300",
    blue: "bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-300"
  };

  return (
    <div onClick={onClick} className={`cursor-pointer p-8 rounded-[2.5rem] border bg-white transition-all transform hover:-translate-y-1 ${colors[color]}`}>
      <div className="mb-4">{icon}</div>
      <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-4xl font-black text-slate-900">{value}</h4>
        <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
