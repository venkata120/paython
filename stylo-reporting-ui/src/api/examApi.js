import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/exams"
});

export const getExamsBySemester = (semester) =>
  API.get(`/semester/${semester}`);

export const getExamPapers = (examId) =>
  API.get(`/${examId}/papers`);

export const getSyllabusCompletion = (subjectId, semester) =>
  API.get(
    `/syllabus/completion?subjectId=${subjectId}&semester=${semester}`
  );
