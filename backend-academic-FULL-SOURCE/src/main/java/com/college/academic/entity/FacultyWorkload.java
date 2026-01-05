package com.college.academic.entity;

import com.college.academic.entity.Course;
import com.college.academic.entity.Department;
import com.college.academic.entity.Staff;
import com.college.academic.entity.Subject;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "faculty_workloads")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@ToString(exclude = {"department", "course", "subject", "staff"})
public class FacultyWorkload {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workload_id")
    private Long workloadId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "semester_number")
    private Integer semesterNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    @JsonIgnoreProperties({"courses","hibernateLazyInitializer", "handler"})
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnoreProperties({"subjects","hibernateLazyInitializer", "handler"})
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id", nullable = false)
    @JsonIgnoreProperties({"facultyWorkloads","hibernateLazyInitializer", "handler"})
    private Staff staff;

    // Inside FacultyWorkload.java
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    @JsonIgnoreProperties({"course","hibernateLazyInitializer", "handler"})
    private Subject subject;


}
