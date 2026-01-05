package com.college.academic.repository;

import com.college.academic.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    // Derived query: find subjects where course.id = ?1 and semesterNumber = ?2
    List<Subject> findByCourseIdAndSemesterNumber(Long courseId, Integer semesterNumber);
}
