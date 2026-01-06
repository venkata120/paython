import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditStudent() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    course: "",
    branch: ""
  });

  const [registerNumber, setRegisterNumber] = useState("");

  /* ================= LOAD STUDENT ================= */
  useEffect(() => {
    if (!user?.mobileNumber) {
      toast.error("Session expired");
      navigate("/");
      return;
    }

    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/students/mobile/${user.mobileNumber}`
      );

      if (!res.ok) {
        toast.error("Unable to fetch student details");
        return;
      }

      const data = await res.json();

      setRegisterNumber(data.registerNumber);

      setForm({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        fatherName: data.fatherName || "",
        motherName: data.motherName || "",
        course: data.course || "",
        branch: data.branch || ""
      });

    } catch {
      toast.error("Server error");
    }
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const BRANCHES = {
        BTECH: [
            { value: "CSE", label: "CSE" },
            { value: "ECE", label: "ECE" },
            { value: "EEE", label: "EEE" },
            { value: "MECH", label: "MECH" },
            { value: "CIVIL", label: "CIVIL" }
        ],
        DEGREE: [
            { value: "BA", label: "BA" },
            { value: "BCOM", label: "B.Com" },
            { value: "BBA", label: "BBA" },
            { value: "MPCs", label: "MPCs" },
            { value: "MSCs", label: "MSCs" },
            { value: "MEC", label: "MEC" }
        ]
    };

  const handleChan = (e) => {
  const { name, value } = e.target;

    setForm(prev => ({
        ...prev,
        [name]: value,
        ...(name === "course" && { branch: "" }) // reset branch
    }));
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(
      `http://localhost:8080/students/update/${registerNumber}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Update error:", errorText);
      toast.error(errorText || "Update failed");
      return;
    }

    toast.success("Student updated successfully");

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        firstName: form.firstName,
        lastName: form.lastName
      })
    );

    navigate("/studentDashboard");

        } catch (err) {
            console.error(err);
            toast.error("Server error");
        }
    };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-indigo-600 text-center">
          Edit Student Details
        </h2>

        <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
        <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
        <Input label="Father Name" name="fatherName" value={form.fatherName} onChange={handleChange} />
        <Input label="Mother Name" name="motherName" value={form.motherName} onChange={handleChange} />

        <select
          name="course"
          value={form.course}
          onChange={handleChan}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Select Course</option>
          <option value="BTECH">B.Tech</option>
          <option value="DEGREE">Degree</option>
        </select>

        <select
            name="branch"
            value={form.branch}
            onChange={handleChan}
            className="w-full border rounded-lg p-2"
            disabled={!form.course}
            >
            <option value="">Select Branch</option>

            {form.course &&
                BRANCHES[form.course]?.map(branch => (
                <option key={branch.value} value={branch.value}>
                    {branch.label}
                </option>
                ))
            }
        </select>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate("/studentDashboard")}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================= INPUT ================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 mt-1"
      />
    </div>
  );
}
