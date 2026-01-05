import React, { useState, useEffect } from 'react';
import api from "../api/api";
import { BookOpen, Edit, Trash2, CheckCircle, AlertCircle, PlusCircle, X } from 'lucide-react';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({ courseName: '', durationYears: '', totalSemesters: '', departmentId: '' });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchCourses();
        fetchDepartments();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await api.get('/courses');
            setCourses(res.data);
        } catch (err) {
            showMsg("error", "Failed to load courses");
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await api.get('/departments');
            setDepartments(res.data);
        } catch (err) {
            showMsg("error", "Failed to load departments");
        }
    };

    const showMsg = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 4000);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        // Construct payload to match backend @JsonProperty("total_semesters")
        const payload = {
            courseName: formData.courseName,
            durationYears: formData.durationYears,
            total_semesters: formData.totalSemesters // Fixed key name
        };

        try {
            if (editId) {
                await api.put(`/courses/${editId}`, payload);
                showMsg("success", "Course updated successfully");
            } else {
                // Post with departmentId as query parameter
                await api.post(`/courses?departmentId=${formData.departmentId}`, payload);
                showMsg("success", "Course created successfully");
            }
            resetForm();
            fetchCourses();
        } catch (err) {
            showMsg("error", "Error saving course data.");
        }
    };

    const handleEdit = (course) => {
        setEditId(course.id);
        setFormData({
            courseName: course.courseName,
            durationYears: course.durationYears,
            totalSemesters: course.total_semesters, // Read from snake_case key
            departmentId: course.department?.id || ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await api.delete(`/courses/${id}`);
                showMsg("success", "Course deleted");
                fetchCourses();
            } catch (err) {
                showMsg("error", "Cannot delete course with active subjects");
            }
        }
    };

    const resetForm = () => {
        setEditId(null);
        setFormData({ courseName: '', durationYears: '', totalSemesters: '', departmentId: '' });
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <div className="p-6 max-w-6xl mx-auto font-sans">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Course Catalog</h1>
                    {message.text && (
                        <div className={`flex items-center px-4 py-2 rounded-lg border animate-in fade-in slide-in-from-right-4 ${
                            message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}>
                            {message.type === 'success' ? <CheckCircle size={18} className="mr-2"/> : <AlertCircle size={18} className="mr-2"/>}
                            {message.text}
                        </div>
                    )}
                </div>

                {/* Form Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-10 transition-all">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center">
                            {editId ? <Edit className="mr-2 text-indigo-600"/> : <PlusCircle className="mr-2 text-indigo-600"/>}
                            {editId ? "Edit Course Details" : "Add New Course"}
                        </h2>
                        {editId && (
                            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                                <X size={20}/>
                            </button>
                        )}
                    </div>
                    
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Department</label>
                            <select 
                                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
                                value={formData.departmentId}
                                onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
                                required
                                disabled={!!editId}
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>{dept.departmentName || dept.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Course Name</label>
                            <input 
                                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="e.g. Computer Science"
                                value={formData.courseName}
                                onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Duration (Years)</label>
                            <input 
                                type="number"
                                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.durationYears}
                                onChange={(e) => setFormData({...formData, durationYears: e.target.value})}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Total Semesters</label>
                            <input 
                                type="number"
                                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.totalSemesters}
                                onChange={(e) => setFormData({...formData, totalSemesters: e.target.value})}
                                required
                            />
                        </div>

                        <div className="lg:col-span-4 flex justify-end mt-2">
                            <button 
                                type="submit"
                                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                            >
                                {editId ? "Update Course" : "Save Course"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Table View */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Course Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dept</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Duration</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {courses.map((course) => (
                                <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                                <BookOpen size={18}/>
                                            </div>
                                            <span className="font-semibold text-slate-700">{course.courseName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {course.department?.departmentName || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            {/* Fix: Must use total_semesters here */}
                                            {course.durationYears} Years / {course.total_semesters} Sems
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => handleEdit(course)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                                <Edit size={18}/>
                                            </button>
                                            <button onClick={() => handleDelete(course.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                                                <Trash2 size={18}/>
                                            </button>
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

export default Course;
