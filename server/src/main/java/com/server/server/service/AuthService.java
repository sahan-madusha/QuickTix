package com.server.server.service;

import com.server.server.dto.LoginDto;
import com.server.server.dto.RegisterDto;
import com.server.server.entity.User;
import com.server.server.enums.Role;
import com.server.server.exception.UserAlreadyExistsException;
import com.server.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.logging.Logger;

@Service
public class AuthService {

    private static final Logger logger = Logger.getLogger(AuthService.class.getName());


    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterDto registerDto) {

        // Check if user already exists by username or email
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            throw new UserAlreadyExistsException("Username is already taken");
        }
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new UserAlreadyExistsException("Email is already taken");
        }

        String encodedPassword = passwordEncoder.encode(registerDto.getPassword());
        User user = new User(registerDto.getUsername(), encodedPassword, registerDto.getEmail(), registerDto.getRole(), registerDto.getFirstname());
        userRepository.save(user);
        return user;
    }


    public Boolean loginUser(LoginDto loginDto) {
        Optional<User> user = userRepository.findByUsername(loginDto.getUsername());
        if (user.isPresent() && passwordEncoder.matches(loginDto.getPassword(), user.get().getPassword())) {
            return true;
        }else {
            return false;
        }
    }
}
