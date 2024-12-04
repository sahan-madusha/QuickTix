package com.server.server.repository;

import com.server.server.entity.User;
import com.server.server.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    long countByRole(Role role);

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
