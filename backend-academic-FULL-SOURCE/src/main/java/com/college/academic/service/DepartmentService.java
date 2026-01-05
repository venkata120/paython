package com.college.academic.service;

import com.college.academic.entity.Department;
import com.college.academic.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Transactional
    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
    }

    @Transactional
    public Department updateDepartment(Long id, Department details) {
        Department department = getDepartmentById(id);
        department.setDepartmentName(details.getDepartmentName());
        return departmentRepository.save(department);
    }

    @Transactional
    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete: Department not found.");
        }
        departmentRepository.deleteById(id);
    }
}
