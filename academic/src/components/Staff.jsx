import React, { useState, useEffect } from 'react';
import api from "../api/api";
import { UserPlus, Edit, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const Staff = () => {
    const [staffList, setStaffList] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', designation: '' });
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const res = await api.get('/staff');
            setStaffList(res.data);
        } catch (err) {
            showMsg("error", "Could not fetch staff list");
        } finally {
            setLoading(false);
        }
    };

    const showMsg = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 4000);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        // Construct payload manually to ensure keys match your Java @Entity exactly
        const payload = {
           staffName: formData.name,          // Maps to 'private String name'
            email: formData.email,         // Maps to 'private String email'
            designation: formData.designation // Maps to 'private String designation'
        };

        try {
            if (editId) {
                // Matches backend @PutMapping("/{id}")
                await api.put(`/staff/${editId}`, payload);
                showMsg("success", "Staff updated successfully");
            } else {
                // Matches backend @PostMapping
                await api.post('/staff', payload);
                showMsg("success", "Staff added successfully");
            }
            resetForm();
            fetchStaff();
        } catch (err) {
            // Logs specific error details to your browser console for 2026 debugging
            console.error("Payload rejection:", err.response?.data);
            showMsg("error", "Data not accepted by server. Check console for details.");
        }
    };

    const handleEdit = (staff) => {
        setEditId(staff.id);
        setFormData({ 
            name: staff.name, 
            email: staff.email, 
            designation: staff.designation 
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this staff member?")) {
            try {
                await api.delete(`/staff/${id}`);
                showMsg("success", "Staff removed");
                fetchStaff();
            } catch (err) {
                showMsg("error", "Cannot delete staff with active workload dependencies");
            }
        }
    };

    const resetForm = () => {
        setEditId(null);
        setFormData({ name: '', email: '', designation: '' });
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <div className="p-6 max-w-6xl mx-auto font-sans">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-800">Staff Directory</h1>
                    {message.text && (
                        <div className={`flex items-center px-4 py-2 rounded-xl border animate-in fade-in slide-in-from-right-4 ${
                            message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}>
                            {message.type === 'success' ? <CheckCircle size={18} className="mr-2"/> : <AlertCircle size={18} className="mr-2"/>}
                            {message.text}
                        </div>
                    )}
                </div>

                {/* Form */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-10 transition-all">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                        {editId ? <Edit className="mr-2 text-indigo-600"/> : <UserPlus className="mr-2 text-indigo-600"/>}
                        {editId ? "Modify Staff Record" : "Add New Staff"}
                    </h2>
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                            <input 
                                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="John Doe" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                            <input 
                                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="name@college.edu" 
                                type="email" 
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Designation</label>
                            <input 
                                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                placeholder="e.g. Professor" 
                                value={formData.designation} 
                                onChange={(e) => setFormData({...formData, designation: e.target.value})} 
                            />
                        </div>
                        <div className="md:col-span-3 flex items-center gap-3 mt-2">
                            <button type="submit" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg transition-all active:scale-95">
                                {editId ? "Update Staff" : "Register Staff"}
                            </button>
                            {editId && (
                                <button type="button" onClick={resetForm} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold transition-all">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Table View */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Staff Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Designation</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan="3" className="py-20 text-center text-slate-400 font-medium">Loading records...</td></tr>
                            ) : staffList.map(s => (
                                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800">{s.name}</div>
                                        <div className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 inline-block px-1 rounded">{s.designation || 'Staff'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{s.designation}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => handleEdit(s)} className="p-2 text-slate-400 hover:text-indigo-600 transition-all"><Edit size={18}/></button>
                                            <button onClick={() => handleDelete(s.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-all"><Trash2 size={18}/></button>
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

export default Staff;
