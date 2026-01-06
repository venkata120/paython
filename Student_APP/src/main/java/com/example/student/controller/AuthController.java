package com.example.student.controller;

import com.example.student.dto.LoginRequest;
import com.example.student.dto.RegisterRequest;
import com.example.student.entity.User;
import com.example.student.enums.Role;
import com.example.student.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /* ================= STUDENT REGISTER ================= */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {

        if (!req.password.equals(req.confirmPassword)) {
            return ResponseEntity.badRequest()
                    .body("Password and Confirm Password not matched");
        }

        if (userRepo.findByMobileNumber(req.mobileNumber).isPresent()) {
            return ResponseEntity.badRequest()
                    .body("Mobile number already registered");
        }

        User user = new User();
        user.setFirstName(req.firstName);
        user.setLastName(req.lastName);
        user.setMobileNumber(req.mobileNumber);
        user.setEmail(req.email);
        user.setPassword(passwordEncoder.encode(req.password));
        user.setRole(Role.STUDENT);

        userRepo.save(user);

        return ResponseEntity.ok("Student registered successfully");
    }

    /* ================= LOGIN (ADMIN / STAFF / STUDENT) ================= */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        User user = userRepo.findByMobileNumber(req.mobileNumber)
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid mobile number");
        }

        String dbPassword = user.getPassword();   // password from DB
        String inputPassword = req.password;      // password entered by user

        // 2️⃣ CASE A: Password already encrypted (BCrypt)
        if (dbPassword.startsWith("$2a$") || dbPassword.startsWith("$2b$")) {

            if (!passwordEncoder.matches(inputPassword, dbPassword)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid password");
            }

        }
        // 3️⃣ CASE B: OLD USER (plain-text password in DB)
        else {

            if (!inputPassword.equals(dbPassword)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid password");
            }

            // 🔥 AUTO-UPGRADE PASSWORD TO BCrypt
            user.setPassword(passwordEncoder.encode(inputPassword));
            userRepo.save(user);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("userId", user.getId());
        response.put("role", user.getRole().name());
        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());
        response.put("emailId", user.getEmail());
        response.put("mobileNumber", user.getMobileNumber());

        return ResponseEntity.ok(response);
    }
}
