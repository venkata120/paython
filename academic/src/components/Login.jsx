import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, GraduationCap, Loader2, ShieldCheck } from "lucide-react"; // npm install lucide-react
import api from "../api/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });
      if (res.data === "Login Successful") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username); // <-- Save username here
        navigate("/home");
      } else {
        alert("Invalid Credentials");
      }
    } catch (e) {
      alert("Server Connection Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT SIDE: Visual/Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 items-center justify-center p-12 overflow-hidden">
        {/* Background Image with Overlay */}
       
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-indigo-900/40 to-transparent" />
        
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Annamacharya <span className="text-indigo-400">University</span></h1>
          </div>
          <h2 className="text-3xl font-bold text-white/90 leading-tight mb-4">
            Managing academic excellence with intelligent automation.
          </h2>
          <p className="text-indigo-100 text-lg">
            Access the centralized portal for department management, course scheduling, and academic oversight.
          </p>
          
          <div className="mt-12 flex gap-6">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">2025</span>
              <span className="text-indigo-300 text-xs uppercase tracking-widest">Edition</span>
            </div>
            <div className="w-px h-10 bg-indigo-500/50" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">Enterprise</span>
              <span className="text-indigo-300 text-xs uppercase tracking-widest">Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 lg:bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden flex items-center gap-2">
             <GraduationCap className="w-8 h-8 text-indigo-600" />
             <span className="font-bold text-xl text-slate-900">Annamacharya University</span>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Employee Sign In</h1>
            <p className="text-slate-500 font-medium">Please enter your authorized credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="User_id"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium text-slate-800"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium text-slate-800"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ShieldCheck className="w-5 h-5 opacity-50" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">
              Authorized Personnel Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
