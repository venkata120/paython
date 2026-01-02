import axios from "axios";

const BASE_URL = "http://localhost:8080/api/reports";

// ================= Attendance =================
export const getAttendanceReport = (studentId, courseId) =>
  axios.get(`${BASE_URL}/attendance`, {
    params: { studentId, courseId }
  });

export const getAttendanceByDateRange = (
  studentId,
  courseId,
  fromDate,
  toDate
) =>
  axios.get(`${BASE_URL}/attendance/date-range`, {
    params: { studentId, courseId, fromDate, toDate }
  });

// 🔴 THIS WAS MISSING (ADD THIS)
export const getOverallAttendance = (courseId) =>
  axios.get(`${BASE_URL}/attendance/overall`, {
    params: { courseId }
  });

// ================= Subject =================
export const getSubjectReport = (subjectId) =>
  axios.get(`${BASE_URL}/subject`, {
    params: { subjectId }
  });

export const getRankList = (subjectId) =>
  axios.get(`${BASE_URL}/subject/rank`, {
    params: { subjectId }
  });

export const getWeakStudents = (subjectId) =>
  axios.get(`${BASE_URL}/subject/weak-students`, {
    params: { subjectId }
  });

// ================= Marksheet =================
export const getMarkSheet = (studentId) =>
  axios.get(`${BASE_URL}/marksheet`, {
    params: { studentId }
  });

// ================= Results =================
export const getOverallResults = () =>
  axios.get(`${BASE_URL}/results/overall`);

export const getToppers = (limit = 5) =>
  axios.get(`${BASE_URL}/results/toppers`, {
    params: { limit }
  });
