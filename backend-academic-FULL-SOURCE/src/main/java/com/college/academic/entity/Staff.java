package com.college.academic.entity;
import com.college.academic.entity.FacultyWorkload;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "staff")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "facultyWorkloads")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_id")
    private Long staffId;

    @Column(name = "staff_name", nullable = false)
    private String staffName;

    @Column(name = "designation")
    private String designation;

    @Column(name = "email", unique = true)
    private String email;

    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    private List<FacultyWorkload> facultyWorkloads;
}
