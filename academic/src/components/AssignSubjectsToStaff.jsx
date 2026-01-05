import React, { useState, useEffect } from 'react';
import api from "../api/api";
import { 
    User, Building2, BookText, Workflow, 
    Loader2, Trash2, Edit, X, CheckCircle, AlertCircle,CheckCircle2
} from 'lucide-react';

const AssignSubjectsToStaff = () => {
    // Data Lists
    const [staffList, setStaffList] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [allCourses, setAllCourses] = useState([]); 
    const [filteredCourses, setFilteredCourses] = useState([]); 
    const [workloads, setWorkloads] = useState([]);
    const [selectedSemData, setSelectedSemData] = useState(null); 

    // UI States
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [editId, setEditId] = useState(null);

    // Selection States
    const [selectedStaffId, setSelectedStaffId] = useState('');
    const [selectedDeptId, setSelectedDeptId] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSemNumber, setSelectedSemNumber] = useState('');
    const [selectedSubjectId, setSelectedSubjectId] = useState('');

    useEffect(() => {
        initLoad();
    }, []);

    const showMsg = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 4000);
    };

    const initLoad = async () => {
        try {
            const [staffRes, deptRes, courseRes, workloadRes] = await Promise.all([
                api.get('/staff'),
                api.get('/departments'),
                api.get('/courses'),
                api.get('/workloads')
            ]);
            setStaffList(staffRes.data);
            setDepartments(deptRes.data);
            setAllCourses(courseRes.data);
            setWorkloads(workloadRes.data);
        } catch (err) {
            showMsg("error", "Could not fetch data from server");
        }
    };

    const handleDeptChange = (deptId, keepExisting = false) => {
        setSelectedDeptId(deptId);
        if (!keepExisting) {
            setSelectedCourse(null);
            setSelectedSemData(null);
            setSelectedSubjectId('');
            setSelectedSemNumber('');
        }
        if (deptId) {
            const filtered = allCourses.filter(c => c.department?.id === parseInt(deptId));
            setFilteredCourses(filtered);
        } else {
            setFilteredCourses([]);
        }
    };

    const handleCourseChange = (courseId) => {
        const course = filteredCourses.find(c => c.id === parseInt(courseId));
        setSelectedCourse(course);
        setSelectedSemNumber('');
        setSelectedSemData(null);
        setSelectedSubjectId('');
    };

    const handleSemesterChange = async (semNum, courseIdArg, keepSubject = false) => {
        const sem = parseInt(semNum);
        setSelectedSemNumber(sem);
        const targetCourseId = courseIdArg || selectedCourse?.id;

        if (!sem || !targetCourseId) {
            setSelectedSemData(null);
            if (!keepSubject) setSelectedSubjectId('');
            return;
        }

        try {
            // Path Variable Endpoint: /api/subjects/course/{courseId}/semester/{semesterNumber}
            const res = await api.get(`/subjects/course/${targetCourseId}/semester/${sem}`);
            setSelectedSemData(res.data);
            if (!keepSubject) setSelectedSubjectId('');
        } catch (err) {
            setSelectedSemData([]);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        // 2026 Validation: Ensure staffId is selected before proceeding
        if (!selectedStaffId) {
            showMsg("error", "Please select a Faculty Member");
            return;
        }

        setLoading(true);
        try {
            // FIX: Pass IDs as Request Parameters (?staffId=...) to match backend @RequestParam
            // const config = {
            //     params: { 
            //         staffId: selectedStaffId,
            //         departmentId: selectedDeptId,
            //         courseId: selectedCourse?.id,
            //         subjectId: selectedSubjectId
            //     }
            // };
            
            // This is the JSON Body for the @RequestBody FacultyWorkload object
            const body = {
            semesterNumber: parseInt(selectedSemNumber),
            staff: { staffId: Number(selectedStaffId) },
            department: { id: Number(selectedDeptId) },
            course: { id: Number(selectedCourse.id) },
            subject: { id: Number(selectedSubjectId) }
        }
        console.log(body);

            if (editId) {
                // Axios PUT: (url, body, config)
                await api.put(`/workloads/${editId}`, body);
                showMsg("success", "Workload updated successfully");
            } else {
                // Axios POST: (url, body, config)
                await api.post(`/workloads`, body);
                showMsg("success", "Workload assigned successfully");
            }
            resetForm();
            initLoad();
        } catch (err) {
            // Log backend details for easier debugging
            console.error("Save Error:", err.response?.data);
            showMsg("error", err.response?.data?.message || "Operation failed. Check Staff selection.");
        } finally { 
            setLoading(false); 
        }
    };

    const handleEdit = async (w) => {
        const id = w.workloadId || w.id;
        setEditId(id);
        setSelectedStaffId(w.staff?.staffId || '');
        handleDeptChange(w.department?.id, true);
        setSelectedCourse(w.course);
        setSelectedSemNumber(w.semesterNumber);
        await handleSemesterChange(w.semesterNumber, w.course?.id, true);
        setSelectedSubjectId(w.subject?.id || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (w) => {
        const id = w.workloadId || w.id;
        if (window.confirm("Remove this assignment?")) {
            try {
                await api.delete(`/workloads/${id}`);
                showMsg("success", "Assignment removed");
                initLoad();
            } catch (err) {
                showMsg("error", "Failed to delete assignment");
            }
        }
    };

    const resetForm = () => {
        setEditId(null);
        setSelectedStaffId('');
        setSelectedDeptId('');
        setSelectedCourse(null);
        setFilteredCourses([]);
        setSelectedSemNumber('');
        setSelectedSemData(null);
        setSelectedSubjectId('');
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
           
            <div className="p-6 max-w-6xl mx-auto font-sans">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-800">Academic Workloads</h1>
                    {message.text && (
                        <div className={`flex items-center px-4 py-2 rounded-md border shadow-sm ${
                            message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}>
                            {message.type === 'success' ? <CheckCircle size={18} className="mr-2"/> : <AlertCircle size={18} className="mr-2"/>}
                            <span className="font-semibold">{message.text}</span>
                        </div>
                    )}
                </div>

                {/* Assignment Form */}
                <div className={`bg-white rounded-2xl shadow-md border p-8 mb-10 transition-all ${editId ? 'border-amber-400 ring-4 ring-amber-50' : 'border-slate-100'}`}>
                    <h2 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                        {editId ? <Edit className="text-amber-500" size={20}/> : <Workflow className="text-blue-600" size={20}/>}
                        {editId ? "Modify Faculty Assignment" : "Assign New Workload"}
                    </h2>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Select Faculty Member</label>
                            <select 
                                className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold transition-all"
                                value={selectedStaffId} onChange={(e) => setSelectedStaffId(e.target.value)} required
                            >
                                <option value="">Choose Staff...</option>
                                {staffList.map(s => <option key={s.staffId} value={s.staffId}>{s.staffName || s.name} — {s.designation}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Department</label>
                                <select className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold transition-all"
                                    value={selectedDeptId} onChange={(e) => handleDeptChange(e.target.value)} required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(d => <option key={d.id} value={d.id}>{d.name || d.departmentName}</option>)}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Course</label>
                                <select className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold transition-all disabled:opacity-50"
                                    value={selectedCourse?.id || ''} onChange={(e) => handleCourseChange(e.target.value)} required disabled={!selectedDeptId}
                                >
                                    <option value="">Select Course</option>
                                    {filteredCourses.map(c => <option key={c.id} value={c.id}>{c.courseName}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Semester Number</label>
                                <select className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold transition-all disabled:opacity-50"
                                    value={selectedSemNumber} onChange={(e) => handleSemesterChange(e.target.value)} required disabled={!selectedCourse}
                                >
                                    <option value="">Select Semester</option>
                                    {selectedCourse && Array.from({ length: selectedCourse.total_semesters || selectedCourse.totalSemesters || 0 }, (_, i) => i + 1).map(num => (
                                        <option key={num} value={num}>Semester {num}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Subject</label>
                                <select className="w-full p-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none font-semibold transition-all disabled:opacity-50"
                                    value={selectedSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)} required disabled={!selectedSemData}
                                >
                                    <option value="">Choose Subject...</option>
                                    {selectedSemData?.map(sub => <option key={sub.id} value={sub.id}>{sub.subjectName || sub.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            {editId && (
                                <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
                            )}
                            <button type="submit" disabled={loading} className="px-10 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2">
                                {loading ? <Loader2 className="animate-spin" size={20}/> : <CheckCircle2 size={20}/>}
                                {editId ? "Update Assignment" : "Confirm Assignment"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Staff</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Assignment</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {workloads.map((w) => (
                                <tr key={w.workloadId || w.id} className="hover:bg-slate-50/50 transition-all">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800">{w.staff?.staffName || w.staff?.name}</div>
                                        <div className="text-xs text-blue-600 font-bold">{w.staff?.designation}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-700">{w.subject?.subjectName || w.subject?.name}</div>
                                        <div className="text-xs text-slate-400">{w.course?.courseName} • Semester {w.semesterNumber}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => handleEdit(w)} className="p-2 text-slate-300 hover:text-amber-500 transition-colors"><Edit size={18}/></button>
                                            <button onClick={() => handleDelete(w)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={18}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AssignSubjectsToStaff;
