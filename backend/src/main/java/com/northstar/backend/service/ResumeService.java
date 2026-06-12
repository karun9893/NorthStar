package com.northstar.backend.service;

import com.northstar.backend.model.Resume;
import com.northstar.backend.model.Student;
import com.northstar.backend.model.User;
import com.northstar.backend.repository.ResumeRepository;
import com.northstar.backend.repository.StudentRepository;
import com.northstar.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // Resume upload karo
    public String uploadResume(
            String email, MultipartFile file) {

        // 1. User dhundho
        User user = userRepository
                .findByEmail(email)
                .orElse(null);
        if(user == null) return "User not found!";

        // 2. Student dhundho
        Student student = studentRepository
                .findByUser(user)
                .orElse(null);
        if(student == null)
            return "Profile not found! Pehle profile banao.";

        try {
            // 3. Upload folder banao
            File uploadFolder = new File(uploadDir);
            if(!uploadFolder.exists()) {
                uploadFolder.mkdirs();
            }

            // 4. File save karo
            String fileName = email + "_resume_"
                    + file.getOriginalFilename();
            String filePath = uploadDir + "/" + fileName;
            file.transferTo(new File(filePath));

            // 5. Database mein save karo
            Resume resume = resumeRepository
                    .findByStudent(student)
                    .orElse(new Resume());

            resume.setStudent(student);
            resume.setFileName(fileName);
            resume.setFilePath(filePath);
            resume.setUploadedAt(LocalDateTime.now());

            resumeRepository.save(resume);

            return "Resume uploaded successfully!";

        } catch (IOException e) {
            return "Upload failed: " + e.getMessage();
        }
    }

    // Resume info laao
    public Resume getResume(String email) {
        User user = userRepository
                .findByEmail(email)
                .orElse(null);
        if(user == null) return null;

        Student student = studentRepository
                .findByUser(user)
                .orElse(null);
        if(student == null) return null;

        return resumeRepository
                .findByStudent(student)
                .orElse(null);
    }
}