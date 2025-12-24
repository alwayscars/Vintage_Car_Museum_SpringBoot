package com.example.vintagecar.service;

import com.example.vintagecar.entity.User;
import com.example.vintagecar.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // REGISTER USER
    public String register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getrole() == null) {
            user.setrole("USER"); // default
        }

        userRepository.save(user);
        return user.getUsername() + " registered successfully";
    }

    // VALIDATE USER FOR LOGIN
    public User validateUser(String username, String password) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}
