package com.example.student.repository;

import com.example.student.entity.User;
import com.example.student.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByMobileNumber(String mobileNumber);

    List<User> findByRole(Role role);
}
