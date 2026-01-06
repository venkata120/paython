package com.example.student.controller;

import com.example.student.entity.StudentOnboard;
import com.example.student.exception.MobileNumberAlreadyExistsException;
import com.example.student.exception.StudentNotFoundException;
import com.example.student.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
@CrossOrigin
public class StudentController {

    private final StudentService studentService;

    // 🔹 Create Student
    @PostMapping("/created")
    public ResponseEntity<?> createStudent(@Valid @RequestBody StudentOnboard student) {
        try {
            StudentOnboard savedStudent = studentService.createStudent(student);
            return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);

        } catch (MobileNumberAlreadyExistsException ex) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(ex.getMessage());
        }
    }

    // 🔹 Get All Students
    @GetMapping("/all")
    public List<StudentOnboard> getAllStudents() {
        return studentService.getAllStudents();
    }

    // 🔹 Get Student by Register Number
    @GetMapping("/{registerNumber}")
    public StudentOnboard getStudent(@PathVariable String registerNumber) {
        return studentService.getStudentByRegisterNumber(registerNumber);
    }

    @GetMapping("/mobile/{mobileNumber}")
    public ResponseEntity<?> getStudentByMobile(
            @PathVariable String mobileNumber) {

        try {
            StudentOnboard student =
                    studentService.getStudentByMobileNumber(mobileNumber);
            return ResponseEntity.ok(student);

        } catch (StudentNotFoundException ex) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ex.getMessage());
        }
    }

    // 🔹 Update Student
    @PutMapping("/update/{registerNumber}")
    public ResponseEntity<?> updateStudent(
            @PathVariable String registerNumber,
            @RequestBody StudentOnboard student) {

        StudentOnboard updated =
                studentService.updateStudent(registerNumber, student);

        return ResponseEntity.ok(updated);
    }


    // 🔹 Delete Student
    @DeleteMapping("/delete/{registerNumber}")
    public String deleteStudent(@PathVariable String registerNumber) {
        studentService.deleteStudent(registerNumber);
        return "Student deleted successfully";
    }
}
