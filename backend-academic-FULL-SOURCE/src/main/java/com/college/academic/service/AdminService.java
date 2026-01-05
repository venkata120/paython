package com.college.academic.service;

import com.college.academic.entity.Admin;
import com.college.academic.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;

    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdminById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));
    }

    public Admin updateAdmin(Long id, Admin adminDetails) {
        Admin admin = getAdminById(id);
        admin.setUsername(adminDetails.getUsername());
        admin.setPassword(adminDetails.getPassword());
        return adminRepository.save(admin);
    }

    public void deleteAdmin(Long id) {
        Admin admin = getAdminById(id);
        adminRepository.delete(admin);
    }
}
