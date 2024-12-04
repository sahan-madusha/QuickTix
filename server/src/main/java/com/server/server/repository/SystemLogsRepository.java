package com.server.server.repository;

import com.server.server.entity.SystemLogs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SystemLogsRepository extends JpaRepository<SystemLogs, Integer> {
    List<SystemLogs> findAllByOrderByIdDesc();
}
