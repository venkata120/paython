package com.college.academic.service;

import com.college.academic.entity.*;
import com.college.academic.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyWorkloadService {

    private final FacultyWorkloadRepository workloadRepository;
    private final StaffRepository staffRepository;
    private final DepartmentRepository departmentRepository;
    private final CourseRepository courseRepository;
    private final SubjectRepository subjectRepository;

    @Transactional
    public FacultyWorkload saveWorkload(FacultyWorkload request) {
        // 1. Validate request and IDs
        if (request.getStaff() == null || request.getStaff().getStaffId() == null)
            throw new RuntimeException("Staff ID is missing");
        if (request.getSubject() == null || request.getSubject().getId() == null)
            throw new RuntimeException("Subject ID is missing");

        // 2. Fetch managed entities
        Staff managedStaff = staffRepository.findById(request.getStaff().getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        Department managedDept = departmentRepository.findById(request.getDepartment().getId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Course managedCourse = courseRepository.findById(request.getCourse().getId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Fix: Use getSubject().getId()
        Subject managedSubject = subjectRepository.findById(request.getSubject().getId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        // 3. Build and Save
        FacultyWorkload workload = new FacultyWorkload();
        workload.setSemesterNumber(request.getSemesterNumber());
        workload.setDepartment(managedDept);
        workload.setCourse(managedCourse);
        workload.setSubject(managedSubject); // Fix: Use setSubject
        workload.setStaff(managedStaff);

        return workloadRepository.save(workload);
    }



    public List<FacultyWorkload> getAllWorkloads() {
        return workloadRepository.findAll();
    }

    public FacultyWorkload getWorkloadById(Long id) {
        return workloadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workload not found with id: " + id));
    }

    @Transactional
    public FacultyWorkload updateWorkload(Long id, FacultyWorkload details) {
        FacultyWorkload workload = getWorkloadById(id);
        workload.setSemesterNumber(details.getSemesterNumber());
        workload.setDepartment(details.getDepartment());
        workload.setCourse(details.getCourse());
        workload.setSubject(details.getSubject());
        workload.setStaff(details.getStaff());
        return workloadRepository.save(workload);
    }

    @Transactional
    public void deleteWorkload(Long id) {
        if (!workloadRepository.existsById(id)) {
            throw new RuntimeException("Workload not found");
        }
        workloadRepository.deleteById(id);
    }
}
