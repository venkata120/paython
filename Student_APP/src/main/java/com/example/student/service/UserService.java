package com.example.student.service;
import com.example.student.entity.User;

import java.util.List;

public interface UserService {

    User login(String mobileNumber, String password);
    User createStaff(User user);
    List<User> getAllStaff();
    User updateStaff(Long id, User user);
    void deleteStaff(Long id);
}
