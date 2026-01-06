import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/AdminPage/Admin";
import Student from "./components/StudentPage/Student";
import StudentDashboard from "./components/StudentPage/StudentDashboard";
import SemesterDetails from "./components/StudentPage/SemesterDetails";
import AdminDashboard from "./components/AdminPage/AdminDashboard";
import AdminCreateStaff from "./components/AdminPage/AdminCreateStaff";
import StaffDashboard from "./components/StaffPage/StaffDashboard";
import EditStudent from "./components/StudentPage/EditStudent";


function App() {
  return (
      <>
      {/* ✅ Toast is fixed overlay – does NOT disturb UI */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            zIndex: 9999,
          },
        }}
      />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<Student />} />
        <Route path="/studentDashboard" element={<StudentDashboard />} />
        <Route path="/student/semester/:semester" element={<SemesterDetails />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/admin/staff/create" element={<AdminCreateStaff />} />
        <Route path="/student/edit" element={<EditStudent />} />

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
