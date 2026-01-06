import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Frontend validation
  const validateForm = () => {

    if (!form.firstName.trim()) {
      toast.error("First Name is required");
      return false;
    }
    if (!form.lastName.trim()) {
      toast.error("Last Name is required");
      return false;
    }
    if (!form.mobileNumber.trim()) {
      toast.error("Mobile Number is required");
      return false;
    }
    if (!/^[0-9]{10}$/.test(form.mobileNumber)) {
      toast.error("Mobile Number must be 10 digits");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
    toast.error("Email is required");
    return false;
    }

    if (!emailRegex.test(form.email)) {
    toast.error("Please enter a valid email address");
    return false;
    }
    if (!form.password) {
      toast.error("Password is required");
      return false;
    }
    if (!form.confirmPassword) {
      toast.error("Confirm Password is required");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return false;
    }

    return true;
  };

 const handleRegister = async () => {

  // ✅ RUN FRONTEND VALIDATION FIRST
  if (!validateForm()) return;

  const res = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });

  const msg = await res.text();

  if (!res.ok) {
    toast.error(msg);
    return;
  }

  // ✅ AUTO-LOGIN DATA (only after valid submission)
  localStorage.setItem(
    "studentProfile",
    JSON.stringify({
      firstName: form.firstName,
      lastName: form.lastName,
      mobileNumber: form.mobileNumber,
      emailId: form.email
    })
  );

  toast.success("Registration successful!");
  navigate("/admin");
};

  return (
    <div className="min-h-screen flex items-center justify-center
                   bg-linear-to-br from-gray-100 via-gray-200 to-gray-300
                    px-4">

      <div
        className=" w-full max-w-2xl rounded-2xl
                   p-10 animate-[fadeIn_0.6s_ease-in-out]"
      >

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Student Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* First Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              name="firstName"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition-all"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              name="lastName"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition-all"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              name="mobileNumber"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition-all"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition-all"
            />
          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full mt-10 bg-indigo-600 text-white py-3 rounded-xl
                     font-semibold text-lg
                     hover:bg-indigo-700 hover:shadow-lg
                     transition-all active:scale-95"
        >
          Register
        </button>

        <p
          className="text-center mt-6 text-indigo-600 cursor-pointer hover:underline"
          onClick={() => navigate("/admin")}
        >
          Back to Admin Page
        </p>

      </div>
    </div>
  );
}
