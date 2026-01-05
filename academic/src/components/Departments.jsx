import { useEffect, useState } from "react";
import { 
  Building2, Plus, Loader2, Trash2, 
  Pencil, X, Check, Search, Filter, Hash, Layers
} from "lucide-react";
import api from "../api/api";

export default function Departments() {
  const [departmentName, setDepartmentName] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => { fetchDepartments(); }, []);

  const fetchDepartments = async () => {
    setFetching(true);
    try {
      const res = await api.get("/departments");
      setList(res.data);
    } catch (err) { console.error("Backend offline"); } 
    finally { setFetching(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!departmentName.trim()) return;
    try {
      setLoading(true);
      await api.post("/departments", { departmentName });
      setDepartmentName("");
      fetchDepartments();
    } catch (e) { alert("Error saving department."); } 
    finally { setLoading(false); }
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    try {
      setLoading(true);
      await api.put(`/departments/${id}`, { departmentName: editName });
      setEditingId(null);
      fetchDepartments();
    } catch (e) { alert("Update failed."); } 
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    try {
      await api.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (e) { alert("Action restricted: Active dependencies found."); }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 pb-20">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        
        {/* TOP SECTION: Header & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest">
              <Layers size={16} />
              <span>Academic Architecture</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Departments
            </h1>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-48 bg-white p-4 rounded-3xl shadow-sm border border-slate-200/60">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-tighter">Total Units</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">{list.length}</span>
                <span className="text-emerald-500 text-xs font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* INPUT SECTION: Soft Glass Form */}
        <div className="mb-10 group">
          <form onSubmit={handleSave} className="relative flex flex-col sm:flex-row gap-3 bg-white/50 backdrop-blur-md p-2 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50 transition-all focus-within:shadow-indigo-100">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Enter department name (e.g. Computer Science)"
                value={departmentName}
                required
                onChange={(e) => setDepartmentName(e.target.value)}
                className="w-full pl-14 pr-4 py-5 bg-transparent border-none rounded-2xl outline-none text-slate-800 font-semibold placeholder:text-slate-400 placeholder:font-medium"
              />
            </div>
            <button
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 sm:py-2 rounded-[1.5rem] font-bold transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus size={20} /> Add Unit</>}
            </button>
          </form>
        </div>

        {/* LIST SECTION: Clean Modern Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Hash className="text-slate-400" size={18} />
              <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest">Active Directory</h3>
            </div>
            <div className="flex gap-2">
               <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Search size={18} /></button>
               <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Filter size={18} /></button>
            </div>
          </div>

          <div className="divide-y divide-slate-50">
            {fetching ? (
              <div className="py-24 flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                   <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
                   <div className="absolute inset-0 scale-150 blur-2xl bg-indigo-500/10 rounded-full"></div>
                </div>
                <p className="text-slate-400 font-bold animate-pulse italic">Syncing with database...</p>
              </div>
            ) : list.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-slate-400 font-medium">No departmental records found.</p>
              </div>
            ) : (
              list.map((d, index) => (
                <div 
                  key={d.id} 
                  className={`flex items-center justify-between px-8 py-6 transition-all hover:bg-indigo-50/30 group ${editingId === d.id ? 'bg-indigo-50' : ''}`}
                >
                  <div className="flex items-center gap-8 flex-1">
                    <span className="text-xs font-bold text-slate-300 tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    {editingId === d.id ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          autoFocus
                          className="flex-1 bg-white border-2 border-indigo-500 rounded-2xl px-5 py-3 outline-none font-bold text-slate-800 shadow-inner"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                        <button onClick={() => handleUpdate(d.id)} className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 shadow-md transition-all active:scale-90"><Check size={20}/></button>
                        <button onClick={() => setEditingId(null)} className="p-3 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all"><X size={20}/></button>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                          {d.departmentName}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Academic Unit</span>
                      </div>
                    )}
                  </div>

                  {!editingId && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <button 
                        onClick={() => { setEditingId(d.id); setEditName(d.departmentName); }} 
                        className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-2xl transition-all shadow-none hover:shadow-sm border border-transparent hover:border-slate-100"
                        title="Edit Department"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(d.id)} 
                        className="p-3 text-slate-400 hover:text-rose-600 hover:bg-white rounded-2xl transition-all shadow-none hover:shadow-sm border border-transparent hover:border-slate-100"
                        title="Delete Department"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          <div className="px-8 py-5 bg-slate-50/80 border-t border-slate-100 flex justify-between items-center">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AU Academic Systems v2.0</span>
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
