package com.college.academic.repository;

import com.college.academic.entity.FacultyWorkload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyWorkloadRepository extends JpaRepository<FacultyWorkload, Long> {
}
