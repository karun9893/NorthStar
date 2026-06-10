package com.northstar.backend.service;

import com.northstar.backend.model.User;
import com.northstar.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register
    public String register(String email, String password) {

        // 1. Email already exists?
        if(userRepository.existsByEmail(email)) {
            return "Email already exists!";
        }

        // 2. Naya user banao
        User user = new User();
        user.setEmail(email);

        // 3. Password encrypt karo
        user.setPassword(
                passwordEncoder.encode(password));

        // 4. Database mein save karo
        userRepository.save(user);

        return "Registration successful!";
    }

    // Login
    public String login(String email, String password) {

        // 1. User dhundho
        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        // 2. User nahi mila?
        if(user == null) {
            return "User not found!";
        }

        // 3. Password check karo
        if(!passwordEncoder.matches(
                password, user.getPassword())) {
            return "Invalid password!";
        }

        return "Login successful!";
    }
}