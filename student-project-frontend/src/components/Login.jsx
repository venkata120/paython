import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!mobileNumber || !password) {
        toast.error("Mobile number and password are required");
        return;
      }

      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber, password })
      });

      if (!res.ok) {
        const msg = await res.text();
        toast.error(msg);
        return;
      }

      const data = await res.json();
      console.log("Login response:", data);

      // ✅ clear old data
      localStorage.clear();

      // ✅ store fresh session
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("role", data.role);

      // ✅ safe role resolve
      const role = typeof data.role === "string"
        ? data.role
        : data.role?.name;

      // 🔥 ROLE BASED NAVIGATION
      switch (role) {
        case "ADMIN":
          navigate("/admin");
          return;
        case "STUDENT":
          navigate("/studentDashboard");
          return;
        case "STAFF":
          navigate("/staff/dashboard");
          return;
        default:
          toast.error("Unknown role");
          return;
      }

    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 via-gray-200 to-gray-300
                    flex items-center justify-center">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full mb-4 px-4 py-3 border rounded-lg"
          value={mobileNumber}
          onChange={e => setMobileNumber(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 border rounded-lg"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg
                     font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}
