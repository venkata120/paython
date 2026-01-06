package com.example.student.entity;

import com.example.student.annotation.StudentValidation;
import com.example.student.enums.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

    @Entity
    @Table(name = "students",
            uniqueConstraints = {
                    @UniqueConstraint(columnNames = "ssc_hall_ticket_number"),
                    @UniqueConstraint(columnNames = "intermediate_hall_ticket_number"),
                    @UniqueConstraint(columnNames = "mobile_number")
            }
    )
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @StudentValidation
    public class StudentOnboard {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "register_number", unique = true)
        private String registerNumber;

        @NotBlank(message = "FirstName is Mandatory")
        @Size(min = 1)
        private String firstName;

        @NotBlank(message = "LastName is Mandatory")
        private String lastName;

        @NotBlank(message = "FatherName is Mandatory")
        private String fatherName;

        @NotBlank(message = "MotherName is Mandatory")
        private String motherName;

        @NotBlank(message =  "Email is mandatory")
        @Email(message = "Email Must be valid")
        private String emailId;

        @NotBlank
        @Pattern(regexp = "^[0-9]{10}$",
                message = "Mobile number must be exactly 10 digits")
        @Column(name = "mobile_number", nullable = false, unique = true)
        private String mobileNumber;

        // SSC Details
        @NotBlank(message =  "SSC School Name is mandatory")
        private String sscSchoolName;

        @NotNull(message =  "SSC percentage is mandatory")
        @Min(value = 35, message = "SSC percentage cannot be less than 35")
        @Max(value = 100, message = "SSC percentage cannot be more than 100")
        private Integer sscPercentage;

        @NotNull(message =  "SSC PassOut Year is mandatory")
        private Integer sscPassOutYear;

        @NotBlank(message = "Fill the SSC Hall Ticket Number")
        @Pattern(regexp = "^[0-9]{10}$",
                message = "SSC Hall Ticket Number must be exactly 10 digits")
        @Column(name = "ssc_hall_ticket_number", unique = true)
        private String sscHallTicketNumber;

        // Intermediate Details
        @NotBlank(message =  "Intermediate College Name is mandatory")
        private String intermediateCollegeName;

        @NotNull(message = "Intermediate percentage is mandatory")
        @Min(value = 35, message = "Intermediate percentage cannot be less than 35")
        @Max(value = 100, message = "Intermediate percentage cannot be more than 100")
        private Integer intermediatePercentage;

        @NotNull(message =  "Intermediate PassOut Year is mandatory")
        private Integer intermediatePassOutYear;

        @NotBlank(message = "Fill the Intermediate Hall Ticket Number")
        @Pattern(regexp = "^[0-9]{10}$",
                message = "Intermediate Hall Ticket Number must be exactly 10 digits")
        @Column(name = "intermediate_hall_ticket_number", unique = true)
        private String intermediateHallTicketNumber;

        @NotNull(message = "Course is mandatory")
        @Enumerated(EnumType.STRING)
        private Course course;

        @NotNull(message = "Branch is mandatory")
        @Enumerated(EnumType.STRING)
        private Branch branch;
    }

