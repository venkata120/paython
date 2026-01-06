import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Student() {

  const navigate = useNavigate();

  const profile = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    emailId: "",
    mobileNumber: "",

    // ✅ NEW
    course: "",
    branch: "",

    sscSchoolName: "",
    sscPercentage: "",
    sscPassOutYear: "",
    sscHallTicketNumber: "",
    intermediateCollegeName: "",
    intermediatePercentage: "",
    intermediatePassOutYear: "",
    intermediateHallTicketNumber: ""
  });

  // 🔹 Course → Branch mapping (must match backend enums)
  const BRANCHES = {
    BTECH: ["CSE", "ECE", "EEE", "MECH", "CIVIL"],
    DEGREE: ["BSC_MPCs", "BSC_MSCs","BSC_MECs","BCOM",,"BBA","BA"]
  };

  useEffect(() => {
    if (!profile) {
      navigate("/");
      return;
    }

    setForm(prev => ({
      ...prev,
      firstName: profile.firstName,
      lastName: profile.lastName,
      emailId: profile.emailId,
      mobileNumber: profile.mobileNumber
    }));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;

    // 🔹 Reset branch when course changes
    if (name === "course") {
      setForm(prev => ({
        ...prev,
        course: value,
        branch: ""
      }));
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {

    const res = await fetch(
      "http://localhost:8080/students/created",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }
    );

    if (!res.ok) {
      const errorData = await res.json();

      if (typeof errorData === "object" && !errorData.message) {
        Object.values(errorData).forEach(msg => toast.error(msg));
        return;
      }

      if (errorData.message) {
        toast.error(errorData.message);
        return;
      }

      toast.error("Something went wrong");
      return;
    }

    const data = await res.json();

    localStorage.setItem(
      "studentSummary",
      JSON.stringify({
        registerNumber: data.registerNumber,
        firstName: data.firstName,
        lastName: data.lastName
      })
    );

    toast.success("Student created successfully!");

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 px-4 py-8">

      <div className="bg-white max-w-6xl mx-auto rounded-2xl shadow-2xl p-10">

        <h2 className="text-2xl font-semibold mb-8 border-b pb-3">
          Student Onboarding Form
        </h2>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Grid>
            <ReadOnly label="First Name" value={form.firstName} />
            <ReadOnly label="Last Name" value={form.lastName} />
            <ReadOnly label="Mobile Number" value={form.mobileNumber} />
            <ReadOnly label="Email" value={form.emailId} />
          </Grid>
        </Section>

        {/* COURSE & BRANCH */}
        <Section title="Course Details">
          <Grid>
            <Select
              label="Course"
              name="course"
              value={form.course}
              onChange={handleChange}
              options={["BTECH", "DEGREE"]}
            />

            <Select
              label="Branch"
              name="branch"
              value={form.branch}
              onChange={handleChange}
              disabled={!form.course}
              options={form.course ? BRANCHES[form.course] : []}
            />
          </Grid>
        </Section>

        {/* ACADEMIC DETAILS */}
        <Section title="Academic Details">
          <Grid>
            <Input label="Father Name" name="fatherName" onChange={handleChange} />
            <Input label="Mother Name" name="motherName" onChange={handleChange} />
            <Input label="SSC School Name" name="sscSchoolName" onChange={handleChange} />
            <Input label="SSC Percentage" name="sscPercentage" onChange={handleChange} />
            <Input label="SSC Pass Out Year" name="sscPassOutYear" onChange={handleChange} />
            <Input label="SSC Hall Ticket Number" name="sscHallTicketNumber" onChange={handleChange} />
            <Input label="Intermediate College Name" name="intermediateCollegeName" onChange={handleChange} />
            <Input label="Intermediate Percentage" name="intermediatePercentage" onChange={handleChange} />
            <Input label="Intermediate Pass Out Year" name="intermediatePassOutYear" onChange={handleChange} />
            <Input label="Intermediate Hall Ticket Number" name="intermediateHallTicketNumber" onChange={handleChange} />
          </Grid>
        </Section>

        <div className="mt-10 text-center">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-10 py-3 rounded-xl font-semibold
                       hover:bg-green-700 transition-all"
          >
            Submit Details
          </button>
        </div>

      </div>
    </div>
  );
}

/* ---------- UI HELPERS ---------- */

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {children}
  </div>
);

const Input = ({ label, name, onChange }) => (
  <div>
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <input
      name={name}
      onChange={onChange}
      className="w-full px-4 py-3 border rounded-lg"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options, disabled }) => (
  <div>
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-4 py-3 border rounded-lg bg-white"
    >
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const ReadOnly = ({ label, value }) => (
  <div>
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <input
      value={value}
      readOnly
      className="w-full px-4 py-3 border rounded-lg bg-gray-100"
    />
  </div>
);
