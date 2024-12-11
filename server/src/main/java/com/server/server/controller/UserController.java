package com.server.server.controller;

import com.server.server.dto.LoginDto;
import com.server.server.dto.RegisterDto;
import com.server.server.entity.User;
import com.server.server.exception.JwtTokenException;
import com.server.server.exception.UserAlreadyExistsException;
import com.server.server.repository.UserRepository;
import com.server.server.service.AuthService;
import com.server.server.service.SystemLogsService;
import com.server.server.util.JwtUtils;
import com.server.server.util.MessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "Endpoints for user authentication")

public class UserController {

    private static final Logger logger = Logger.getLogger(ConfigController.class.getName());

    private final AuthService authService;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final SystemLogsService systemLogsService;

    @Autowired
    public UserController(AuthService authService, JwtUtils jwtUtils, UserRepository userRepository, SystemLogsService systemLogsService) {
        this.authService = authService;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.systemLogsService = systemLogsService;
    }

    // Sign UP: Authenticate the user and return JWT token
    @Operation(summary = "Sign up a new user")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody RegisterDto registerRequest) {
        User unknownUser = userRepository.findByUsername("unknownuser").get();

        logger.info("Sign up a new user => "+ registerRequest);

        try {
            User user = authService.register(registerRequest);
            String token = jwtUtils.generateToken(user);

            logger.info("User signed up with username: " + registerRequest.getUsername());
            systemLogsService.save("User signed up with username: " + registerRequest.getUsername(), user , "1");
            return ResponseEntity.ok(new MessageResponse( "User registered successfully",token));
        } catch (UserAlreadyExistsException e) {
            logger.log(Level.SEVERE,"User already exists with username: ", registerRequest.getUsername());
            systemLogsService.save("User already exists with username: " + registerRequest.getUsername(), unknownUser, "0");
            return ResponseEntity.status(400).body(new MessageResponse("User already exists"));
        } catch (JwtTokenException e) {
            logger.log(Level.SEVERE,"User already exists with username: ", registerRequest.getUsername());
            systemLogsService.save("Error generating token for username: " + registerRequest.getUsername(), unknownUser, "0");
            return ResponseEntity.status(500).body(new MessageResponse("Error generating token"));
        } catch (Exception e) {
            logger.log(Level.SEVERE,"Internal server error during signup for username: ", registerRequest.getUsername());
            systemLogsService.save("Internal server error during signup for username: " + registerRequest.getUsername(), unknownUser, "0");
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

    // Sign IN: Authenticate the user and return JWT token
    @Operation(summary = "Sign in an existing user")
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody LoginDto loginRequest) {
        User unknownUser = userRepository.findByUsername("unknownuser").get();

        logger.info("Sign in an existing user => "+ loginRequest);

        try {
            Boolean isAuthenticated = authService.loginUser(loginRequest);
            if (isAuthenticated) {
                User user = userRepository.findByUsername(loginRequest.getUsername()).get();
                String token = jwtUtils.generateToken(user);

                logger.info("User signed up with username: " + loginRequest.getUsername());
                systemLogsService.save("User signed up with username: " + loginRequest.getUsername(), user , "1");
                return ResponseEntity.ok(new MessageResponse( "Logging succeed",token));
            } else {
                logger.info("User signed up with username: " + loginRequest.getUsername());
                systemLogsService.save("User signed up with username: " + loginRequest.getUsername(), unknownUser , "0");
                return ResponseEntity.status(401).body(new MessageResponse("Invalid credentials"));
            }
        }catch (Exception e) {
            logger.log(Level.SEVERE, "Internal server error", unknownUser);
            systemLogsService.save("Internal server error", unknownUser , "0");
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

}
