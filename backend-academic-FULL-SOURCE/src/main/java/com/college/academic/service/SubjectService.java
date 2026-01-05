package com.college.academic.service;

import com.college.academic.entity.Course;
import com.college.academic.entity.Subject;
import com.college.academic.repository.CourseRepository;
import com.college.academic.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final CourseRepository courseRepository;


    @Transactional
    public Subject createSubject(Subject subject) {
        // 1. Check if the course ID is provided
        if (subject.getCourse() == null || subject.getCourse().getId() == null) {
            throw new RuntimeException("Course ID must be provided");
        }

        // 2. Fetch the REAL course from the database
        Long courseId = subject.getCourse().getId();
        Course managedCourse = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Cannot create Subject: Course with ID " + courseId + " does not exist."));

        // 3. Link the managed course to the subject
        subject.setCourse(managedCourse);

        // 4. Now save (MySQL will be happy because the ID is verified)
        return subjectRepository.save(subject);
    }


    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + id));
    }

    @Transactional
    public Subject updateSubject(Long id, Subject details) {
        Subject subject = getSubjectById(id);
        subject.setSubjectName(details.getSubjectName());
        subject.setSemesterNumber(details.getSemesterNumber());
        // Note: course update should be handled carefully if course_id changes
        if (details.getCourse() != null) {
            subject.setCourse(details.getCourse());
        }
        return subjectRepository.save(subject);
    }

    @Transactional
    public void deleteSubject(Long id) {
        if (!subjectRepository.existsById(id)) {
            throw new RuntimeException("Subject not found with id: " + id);
        }
        subjectRepository.deleteById(id);
    }

    public List<Subject> getSubjectsByCourseAndSemester(Long courseId, Integer semesterNumber) {
        return subjectRepository.findByCourseIdAndSemesterNumber(courseId, semesterNumber);
    }
}
