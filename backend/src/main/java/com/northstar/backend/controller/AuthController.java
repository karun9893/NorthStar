package com.northstar.backend.controller;

import com.northstar.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // POST /api/auth/register
    @PostMapping("/register")
    public String register(
            @RequestParam String email,
            @RequestParam String password) {

        return authService.register(email, password);
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public String login(
            @RequestParam String email,
            @RequestParam String password) {

        return authService.login(email, password);
    }
}