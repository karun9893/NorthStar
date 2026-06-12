package com.northstar.backend.controller;

import com.northstar.backend.model.Student;
import com.northstar.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // GET /api/student/profile?email=karun@gmail.com
    @GetMapping("/profile")
    public Student getProfile(
            @RequestParam String email) {

        return studentService.getProfile(email);
    }

    // POST /api/student/profile
    @PostMapping("/profile")
    public String saveProfile(
            @RequestParam String email,
            @RequestParam String fullName,
            @RequestParam String college,
            @RequestParam String branch,
            @RequestParam Integer graduationYear,
            @RequestParam String phone,
            @RequestParam String linkedinUrl,
            @RequestParam String githubUrl) {

        return studentService.saveProfile(
                email, fullName, college, branch,
                graduationYear, phone,
                linkedinUrl, githubUrl);
    }
}