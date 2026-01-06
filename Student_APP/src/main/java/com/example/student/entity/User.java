package com.example.student.entity;

import com.example.student.enums.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "RegStudent")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String mobileNumber;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    private Role role;   // ADMIN / STUDENT / STAFF

}

