package com.example.student.service.Impl;

import com.example.student.entity.StudentOnboard;
import com.example.student.enums.Branch;
import com.example.student.exception.MobileNumberAlreadyExistsException;
import com.example.student.exception.StudentNotFoundException;
import com.example.student.repository.StudentRepository;
import com.example.student.service.StudentService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    /* ================= CREATE STUDENT ================= */
    @Override
    public StudentOnboard createStudent(StudentOnboard student) {

        // ===== VALIDATIONS =====
        if (studentRepository.existsBySscHallTicketNumber(
                student.getSscHallTicketNumber())) {
            throw new IllegalArgumentException(
                    "SSC hall ticket number already exists"
            );
        }

        if (studentRepository.existsByIntermediateHallTicketNumber(
                student.getIntermediateHallTicketNumber())) {
            throw new IllegalArgumentException(
                    "Intermediate hall ticket number already exists"
            );
        }

        if (studentRepository.existsByMobileNumber(
                student.getMobileNumber())) {
            throw new MobileNumberAlreadyExistsException(
                    "Mobile number already exists: " +
                            student.getMobileNumber()
            );
        }

        // ===== SAVE FIRST (GET ID) =====
        StudentOnboard savedStudent =
                studentRepository.save(student);

        // ===== PER-BRANCH SEQUENCE =====
        long sequence =
                studentRepository.countByBranch(
                        savedStudent.getBranch()
                );

        // ===== GENERATE REGISTER NUMBER =====
        String registerNumber =
                generateRegisterNumber(
                        savedStudent.getBranch(),
                        sequence
                );

        savedStudent.setRegisterNumber(registerNumber);

        // ===== SAVE AGAIN WITH REGISTER NUMBER =====
        return studentRepository.save(savedStudent);
    }

    /* ================= GET BY MOBILE ================= */
    @Override
    public StudentOnboard getStudentByMobileNumber(
            String mobileNumber) {

        return studentRepository
                .findByMobileNumber(mobileNumber)
                .orElseThrow(() ->
                        new StudentNotFoundException(
                                "Student not found with mobile number: "
                                        + mobileNumber
                        )
                );
    }

    /* ================= REGISTER NUMBER LOGIC ================= */
    private String generateRegisterNumber(Branch branch, long sequence) {

        int year = LocalDate.now().getYear() % 100;

        // convert enum to string
        String normalizedBranch = branch.name().toUpperCase();

        if (normalizedBranch.length() > 3) {
            normalizedBranch = normalizedBranch.substring(0, 3);
        } else if (normalizedBranch.length() < 3) {
            normalizedBranch = String.format("%-3s", normalizedBranch)
                    .replace(' ', '0');
        }

        String seq = String.format("%05d", sequence);

        return String.format("%02d%s%s", year, normalizedBranch, seq);
    }



    @Override
    public List<StudentOnboard> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public StudentOnboard getStudentByRegisterNumber(String registerNumber) {
        return studentRepository.findByRegisterNumber(registerNumber);
    }

    @Override
    public StudentOnboard updateStudent(String registerNumber, StudentOnboard updated) {

        StudentOnboard existing = getStudentByRegisterNumber(registerNumber);

        existing.setFirstName(updated.getFirstName());
        existing.setLastName(updated.getLastName());
        existing.setFatherName(updated.getFatherName());
        existing.setMotherName(updated.getMotherName());
        existing.setCourse(updated.getCourse());
        existing.setBranch(updated.getBranch());

        return studentRepository.save(existing);
    }

    @Override
    public void deleteStudent(String registerNumber) {
        StudentOnboard student = getStudentByRegisterNumber(registerNumber);
        studentRepository.delete(student);
    }
}



