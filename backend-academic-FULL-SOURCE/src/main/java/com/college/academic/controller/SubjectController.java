package com.college.academic.controller;

import com.college.academic.entity.Subject;
import com.college.academic.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;

    @PostMapping
    public ResponseEntity<Subject> create(@RequestBody Subject subject) {
        return new ResponseEntity<>(subjectService.createSubject(subject), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Subject> getAll() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subject> getById(@PathVariable Long id) {
        return ResponseEntity.ok(subjectService.getSubjectById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subject> update(@PathVariable Long id, @RequestBody Subject details) {
        return ResponseEntity.ok(subjectService.updateSubject(id, details));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint: GET /api/subjects/course/{courseId}/semester/{semesterNumber}
    @GetMapping("/course/{courseId}/semester/{semesterNumber}")
    public List<Subject> getSubjects(
            @PathVariable Long courseId,
            @PathVariable Integer semesterNumber) {
        return subjectService.getSubjectsByCourseAndSemester(courseId, semesterNumber);
    }
}
