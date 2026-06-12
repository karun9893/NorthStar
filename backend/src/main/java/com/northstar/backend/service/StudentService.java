package com.northstar.backend.service;

import com.northstar.backend.model.Student;
import com.northstar.backend.model.User;
import com.northstar.backend.repository.StudentRepository;
import com.northstar.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    // Profile save karo
    public String saveProfile(String email,
                              String fullName, String college,
                              String branch, Integer graduationYear,
                              String phone, String linkedinUrl,
                              String githubUrl) {

        // 1. User dhundho email se
        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if(user == null) return "User not found!";

        // 2. Existing profile check karo
        Student student = studentRepository
                .findByUser(user)
                .orElse(new Student());

        // 3. Data set karo
        student.setUser(user);
        student.setFullName(fullName);
        student.setCollege(college);
        student.setBranch(branch);
        student.setGraduationYear(graduationYear);
        student.setPhone(phone);
        student.setLinkedinUrl(linkedinUrl);
        student.setGithubUrl(githubUrl);

        // 4. Save karo
        studentRepository.save(student);

        return "Profile saved!";
    }

    // Profile laao
    public Student getProfile(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        if(user == null) return null;

        return studentRepository
                .findByUser(user)
                .orElse(null);
    }
}