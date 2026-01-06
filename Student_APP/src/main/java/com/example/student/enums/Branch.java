package com.example.student.enums;

public enum Branch {

    // BTECH
    CSE(Course.BTECH),
    ECE(Course.BTECH),
    EEE(Course.BTECH),
    MECH(Course.BTECH),
    CIVIL(Course.BTECH),

    // DEGREE
    MPCs(Course.DEGREE),
    MEC(Course.DEGREE),
    MSCs(Course.DEGREE),
    BCOM(Course.DEGREE),
    BA(Course.DEGREE),
    BBA(Course.DEGREE);

    private final Course course;

    Branch(Course course) {
        this.course = course;
    }

    public Course getCourse() {
        return course;
    }
}
