package com.example.student.service.Impl;

import com.example.student.entity.User;
import com.example.student.enums.Role;
import com.example.student.repository.UserRepository;
import com.example.student.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /* LOGIN */
    @Override
    public User login(String mobile, String password) {

        User user = userRepo.findByMobileNumber(mobile)
                .orElseThrow(() ->
                        new RuntimeException("Invalid mobile number"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    /* CREATE STAFF */
    @Override
    public User createStaff(User user) {

        if (userRepo.findByMobileNumber(user.getMobileNumber()).isPresent()) {
            throw new RuntimeException("Mobile number already exists");
        }

        user.setRole(Role.STAFF);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepo.save(user);
    }

    /* GET ALL STAFF */
    @Override
    public List<User> getAllStaff() {
        return userRepo.findByRole(Role.STAFF);
    }

    /* UPDATE STAFF */
    @Override
    public User updateStaff(Long id, User updated) {

        User staff = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        if (staff.getRole() != Role.STAFF) {
            throw new RuntimeException("Not a staff record");
        }

        staff.setFirstName(updated.getFirstName());
        staff.setLastName(updated.getLastName());
        staff.setEmail(updated.getEmail());

        return userRepo.save(staff);
    }

    /* DELETE STAFF */
    @Override
    public void deleteStaff(Long id) {

        User staff = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        if (staff.getRole() != Role.STAFF) {
            throw new RuntimeException("Not a staff record");
        }

        userRepo.delete(staff);
    }
}

