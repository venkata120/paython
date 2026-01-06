package com.example.student.repository;

import com.example.student.entity.StudentOnboard;
import com.example.student.enums.Branch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<StudentOnboard, Long> {

    boolean existsBySscHallTicketNumber(String sscHallTicketNumber);
    boolean existsByIntermediateHallTicketNumber(String intermediateHallTicketNumber);
    StudentOnboard findByRegisterNumber(String registerNumber);
    long countByBranch(Branch branch);
    boolean existsByMobileNumber(String mobileNumber);
    Optional<StudentOnboard> findByMobileNumber(String mobileNumber);
}
