import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User,
  Phone,
  Mail,
  Lock,
  ArrowLeft
} from "lucide-react";

export default function AdminCreateStaff() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= VALIDATION ================= */
  const validate = () => {
    if (!form.firstName.trim()) return "First name required";
    if (!form.lastName.trim()) return "Last name required";
    if (!/^[0-9]{10}$/.test(form.mobileNumber))
      return "Mobile number must be 10 digits";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return "Invalid email address";
    if (form.password.length < 6)
      return "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      return "Password and Confirm Password mismatch";
    return null;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/staff/created", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          mobileNumber: form.mobileNumber,
          email: form.email,
          password: form.password
        })
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      toast.success("Staff created successfully 🎉");

      setTimeout(() => navigate("/admin"), 1200);

    } catch (err) {
      toast.error(err.message || "Failed to create staff");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100
                    flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8 space-y-6"
      >

        {/* ===== HEADER ===== */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold text-indigo-700">
            👩‍🏫 Create Staff
          </h2>
          <p className="text-gray-500 text-sm">
            Add new faculty or staff member
          </p>
        </div>

        {/* ===== NAME ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            icon={<User size={18} />}
            placeholder="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          <Input
            icon={<User size={18} />}
            placeholder="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        {/* ===== CONTACT ===== */}
        <Input
          icon={<Phone size={18} />}
          placeholder="Mobile Number"
          name="mobileNumber"
          value={form.mobileNumber}
          onChange={handleChange}
        />

        <Input
          icon={<Mail size={18} />}
          placeholder="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        {/* ===== PASSWORD ===== */}
        <Input
          icon={<Lock size={18} />}
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <Input
          icon={<Lock size={18} />}
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {/* ===== ACTIONS ===== */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700
                     text-white py-3 rounded-xl font-semibold
                     transition-all duration-300"
        >
          Save Staff
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="w-full flex items-center justify-center gap-2
                     text-indigo-600 hover:underline text-sm"
        >
          <ArrowLeft size={16} /> Back to Admin
        </button>

      </form>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */
function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 border border-gray-300
                   rounded-lg focus:outline-none focus:ring-2
                   focus:ring-indigo-500"
      />
    </div>
  );
}
