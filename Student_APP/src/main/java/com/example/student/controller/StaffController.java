package com.example.student.controller;

import com.example.student.entity.User;
import com.example.student.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin
public class StaffController {

    @Autowired
    private UserService userService;

    @PostMapping("/created")
    public ResponseEntity<?> create(@RequestBody User user) {
        return ResponseEntity.ok(userService.createStaff(user));
    }

    @GetMapping("/all")
    public List<User> getAll() {
        return userService.getAllStaff();
    }

    @PutMapping("/{id}")
    public User update(
            @PathVariable Long id,
            @RequestBody User user
    ) {
        return userService.updateStaff(id, user);
    }

    @DeleteMapping("/deleted/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        userService.deleteStaff(id);
        return ResponseEntity.ok("Staff deleted successfully");
    }
}
