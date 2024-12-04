package com.server.server.util;

import com.server.server.entity.User;
import com.server.server.exception.JwtTokenException;
import com.server.server.service.AuthService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.logging.Logger;

@Component
public class JwtUtils {

    private static final Logger logger = Logger.getLogger(AuthService.class.getName());


    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expirationMs:3600000}")
    private int jwtExpirationMs;

    // Generate JWT token
    public String generateToken(User user) throws JwtTokenException {
        try{
            Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

            return Jwts.builder()
                    .setSubject(user.getUsername())
                    .claim("userId", user.getId())
                    .claim("email", user.getEmail())
                    .claim("userRole", user.getRole().name())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                    .signWith(key)
                    .compact();
        } catch (Exception e) {
            logger.info("Error generating token for user: " + e.getMessage());
            throw new JwtTokenException("Error generating JWT token", e);
        }
    }
}

