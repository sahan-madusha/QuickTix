package com.server.server.repository;

import com.server.server.entity.TicketsLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketsLogRepository extends JpaRepository<TicketsLog, Integer> {
}