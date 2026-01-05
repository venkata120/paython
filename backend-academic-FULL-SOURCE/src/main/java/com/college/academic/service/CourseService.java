package com.college.academic.service;

import com.college.academic.entity.Course;
import com.college.academic.entity.Department;
import com.college.academic.repository.CourseRepository;
import com.college.academic.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final DepartmentRepository departmentRepository;

    @Transactional
    public Course createCourse(Course course, Long departmentId) {
        Department dept = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        course.setDepartment(dept);
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    @Transactional
    public Course updateCourse(Long id, Course courseDetails) {
        // 1. Fetch the existing course from DB
        Course existingCourse = getCourseById(id);

        // 2. Only update fields if they are NOT null in the request
        if (courseDetails.getCourseName() != null) {
            existingCourse.setCourseName(courseDetails.getCourseName());
        }

        if (courseDetails.getDurationYears() != null) {
            existingCourse.setDurationYears(courseDetails.getDurationYears());
        }

        if (courseDetails.getTotalSemesters() != null) {
            existingCourse.setTotalSemesters(courseDetails.getTotalSemesters());
        }

        // 3. Handle Department update only if provided
        if (courseDetails.getDepartment() != null && courseDetails.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(courseDetails.getDepartment().getId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            existingCourse.setDepartment(dept);
        }

        // 4. Save the modified existingCourse
        return courseRepository.save(existingCourse);
    }



    @Transactional
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new RuntimeException("Course not found");
        }
        courseRepository.deleteById(id);
    }
}
