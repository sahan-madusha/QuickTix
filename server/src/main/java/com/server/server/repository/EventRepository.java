package com.server.server.repository;

import com.server.server.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Events, Integer> {
}
