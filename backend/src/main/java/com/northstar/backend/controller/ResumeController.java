package com.northstar.backend.controller;

import com.northstar.backend.model.Resume;
import com.northstar.backend.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    // POST /api/resume/upload
    @PostMapping("/upload")
    public String uploadResume(
            @RequestParam String email,
            @RequestParam("file") MultipartFile file) {

        return resumeService.uploadResume(email, file);
    }

    // GET /api/resume?email=karun@gmail.com
    @GetMapping
    public Resume getResume(
            @RequestParam String email) {

        return resumeService.getResume(email);
    }
}