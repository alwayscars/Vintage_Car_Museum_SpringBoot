package com.example.vintagecar.controller;

import com.example.vintagecar.entity.User;
import com.example.vintagecar.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.example.vintagecar.dto.LoginRequest;
import java.util.ArrayList;
import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(authService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest,
                                   HttpSession session) {

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        User user = authService.validateUser(username, password);

        session.setAttribute("username", username);
        session.setAttribute("role", user.getrole());

        System.out.println(user.getrole());

        return ResponseEntity.ok(user.getrole()); // returns "ADMIN" or "USER"
    }


    @GetMapping("/session-user")
    public ResponseEntity<?> getSessionUser(HttpSession session) {
        String username = (String) session.getAttribute("username");
        return ResponseEntity.ok(username);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        SecurityContextHolder.clearContext();
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }
}
