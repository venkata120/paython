import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom';

import App from './App.jsx';
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Departments from "./components/Departments.jsx";
import Course from "./components/Course.jsx";
import Subjects from "./components/Subjects.jsx";
import Staff from "./components/Staff.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AssignSubjectsToStaff from "./components/AssignSubjectsToStaff.jsx";


import './index.css';

// Define your routes properly
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/home" element={<Home />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/assignsubjects" element={<AssignSubjectsToStaff />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
