package com.server.server.repository;

import com.server.server.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Events, Integer> {
    List<Events> findByUserId(int userId);
}
