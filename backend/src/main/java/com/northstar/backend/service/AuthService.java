package com.northstar.backend.service;

import com.northstar.backend.JwtUtil;
import com.northstar.backend.model.User;
import com.northstar.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(String email, String password) {
        if(userRepository.existsByEmail(email)) {
            return "Email already exists!";
        }
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return "Registration successful!";
    }

    // Login ab token return karega
    public Map<String, String> login(
            String email, String password) {

        Map<String, String> response = new HashMap<>();

        // 1. User dhundho
        User user = userRepository
                .findByEmail(email)
                .orElse(null);

        // 2. User nahi mila
        if(user == null) {
            response.put("error", "User not found!");
            return response;
        }

        // 3. Password check karo
        if(!passwordEncoder.matches(
                password, user.getPassword())) {
            response.put("error", "Invalid password!");
            return response;
        }

        // 4. Token generate karo
        String token = jwtUtil.generateToken(email);
        response.put("token", token);
        response.put("email", email);
        response.put("message", "Login successful!");

        return response;
    }
}