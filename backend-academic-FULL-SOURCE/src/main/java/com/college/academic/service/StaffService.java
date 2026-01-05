package com.college.academic.service;

import com.college.academic.entity.Staff;
import com.college.academic.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffService {

    private final StaffRepository staffRepository;

    @Transactional
    public Staff saveStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff getStaffById(Long id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff member not found with ID: " + id));
    }

    @Transactional
    public Staff updateStaff(Long id, Staff staffDetails) {
        Staff staff = getStaffById(id);
        staff.setStaffName(staffDetails.getStaffName());
        staff.setDesignation(staffDetails.getDesignation());
        staff.setEmail(staffDetails.getEmail());
        return staffRepository.save(staff);
    }

    @Transactional
    public void deleteStaff(Long id) {
        if (!staffRepository.existsById(id)) {
            throw new RuntimeException("Staff not found");
        }
        staffRepository.deleteById(id);
    }
}
