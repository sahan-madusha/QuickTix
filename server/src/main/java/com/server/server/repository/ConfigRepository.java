package com.server.server.repository;

import com.server.server.entity.Config;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConfigRepository extends JpaRepository<Config, Integer> {
    boolean existsById(int id);
    Optional<Config> findById(int id);
}
