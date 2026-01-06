package com.example.student.service;
import com.example.student.entity.StudentOnboard;

import java.util.List;

public interface StudentService {

    StudentOnboard createStudent(StudentOnboard student);
    StudentOnboard getStudentByMobileNumber(String mobileNumber);

    List<StudentOnboard> getAllStudents();

    StudentOnboard getStudentByRegisterNumber(String registerNumber);

    StudentOnboard updateStudent(String registerNumber, StudentOnboard student);

    void deleteStudent(String registerNumber);
}
