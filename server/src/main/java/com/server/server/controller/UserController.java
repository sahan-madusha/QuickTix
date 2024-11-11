package com.server.server.controller;

import com.server.server.dto.RegisterDto;
import com.server.server.entity.User;
import com.server.server.exception.JwtTokenException;
import com.server.server.exception.UserAlreadyExistsException;
import com.server.server.service.AuthService;
import com.server.server.util.JwtResponse;
import com.server.server.util.JwtUtils;
import com.server.server.util.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final AuthService authService;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserController(AuthService authService, JwtUtils jwtUtils) {
        this.authService = authService;
        this.jwtUtils = jwtUtils;
    }

    // Sign In: Authenticate the user and return JWT token
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody RegisterDto loginRequest) {
        try {
            User user = authService.register(loginRequest);
            String token = jwtUtils.generateToken(user);
            return ResponseEntity.ok(new MessageResponse( "User registered successfully",token));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(400).body(new MessageResponse("User already exists"));
        } catch (JwtTokenException e) {
            return ResponseEntity.status(500).body(new MessageResponse("Error generating token"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

}
