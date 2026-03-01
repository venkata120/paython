package com.college.academic.controller;

import com.college.academic.entity.FacultyWorkload;
import com.college.academic.service.FacultyWorkloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/workloads")
@RequiredArgsConstructor
public class FacultyWorkloadController {

    private final FacultyWorkloadService workloadService;

    @PostMapping
    public ResponseEntity<FacultyWorkload> create(@RequestBody FacultyWorkload workload) {
        return new ResponseEntity<>(workloadService.saveWorkload(workload), HttpStatus.CREATED);
    }

    @GetMapping
    public List<FacultyWorkload> getAll() {
        return workloadService.getAllWorkloads();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacultyWorkload> getById(@PathVariable Long id) {
        return ResponseEntity.ok(workloadService.getWorkloadById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacultyWorkload> update(@PathVariable Long id, @RequestBody FacultyWorkload details) {
        return ResponseEntity.ok(workloadService.updateWorkload(id, details));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        workloadService.deleteWorkload(id);
        return ResponseEntity.noContent().build();
    }
}
