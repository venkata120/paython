import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function StudentOnboard() {

  // Data saved at login
  const profile = JSON.parse(localStorage.getItem("studentProfile"));

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    emailId: "",
    mobileNumber: "",
    sscSchoolName: "",
    sscPercentage: "",
    sscPassOutYear: "",
    sscHallTicketNumber: "",
    intermediateCollegeName: "",
    intermediatePercentage: "",
    intermediatePassOutYear: "",
    intermediateHallTicketNumber: ""
  });

  useEffect(() => {
    if (profile) {
      setForm(prev => ({
        ...prev,
        firstName: profile.firstName,
        lastName: profile.lastName,
        emailId: profile.emailId,
        mobileNumber: profile.mobileNumber
      }));
    }
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    const res = await fetch(
      "http://localhost:8080/api/student/created",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }
    );

    if (!res.ok) {
      const errorData = await res.json();

      // Validation errors
      if (!errorData.message) {
        Object.values(errorData).forEach(msg =>
          toast.error(msg)
        );
        return;
      }

      // IllegalArgumentException
      toast.error(errorData.message);
      return;
    }

    toast.success("Student created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
      <div className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-xl">

        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Student Onboarding
        </h2>

        {/* READ ONLY */}
        <div className="grid grid-cols-2 gap-4">
          <input value={form.firstName} readOnly className="input bg-gray-100" />
          <input value={form.lastName} readOnly className="input bg-gray-100" />
          <input value={form.mobileNumber} readOnly className="input bg-gray-100" />
          <input value={form.emailId} readOnly className="input bg-gray-100" />
        </div>

        {/* EDITABLE */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <input name="fatherName" placeholder="Father Name"
                 className="input" onChange={handleChange} />
          <input name="motherName" placeholder="Mother Name"
                 className="input" onChange={handleChange} />
          <input name="sscSchoolName" placeholder="SSC School Name"
                 className="input" onChange={handleChange} />
          <input name="sscPercentage" placeholder="SSC Percentage"
                 className="input" onChange={handleChange} />
          <input name="sscPassOutYear" placeholder="SSC PassOut Year"
                 className="input" onChange={handleChange} />
          <input name="sscHallTicketNumber"
                 placeholder="SSC Hall Ticket Number"
                 className="input" onChange={handleChange} />
          <input name="intermediateCollegeName"
                 placeholder="Intermediate College Name"
                 className="input" onChange={handleChange} />
          <input name="intermediatePercentage"
                 placeholder="Intermediate Percentage"
                 className="input" onChange={handleChange} />
          <input name="intermediatePassOutYear"
                 placeholder="Intermediate PassOut Year"
                 className="input" onChange={handleChange} />
          <input name="intermediateHallTicketNumber"
                 placeholder="Intermediate Hall Ticket Number"
                 className="input" onChange={handleChange} />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-green-600 text-white py-3
                     rounded-lg font-semibold hover:bg-green-700">
          Submit
        </button>

      </div>
    </div>
  );
}
