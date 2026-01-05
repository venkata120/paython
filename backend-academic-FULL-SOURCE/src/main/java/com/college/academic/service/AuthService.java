package com.college.academic.service;

import com.college.academic.entity.Admin;
import com.college.academic.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminRepository repo;

    /**
     * Authenticates an admin using raw strings instead of a DTO.
     */
    public boolean login(String username, String password) {
        Optional<Admin> admin = repo.findByUsername(username);

        // In 2026, we check if present and compare password
        // Use .equals() for string comparison
        return admin.isPresent() && admin.get().getPassword().equals(password);
    }
}
