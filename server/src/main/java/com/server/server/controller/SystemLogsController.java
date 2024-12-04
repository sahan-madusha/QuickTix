package com.server.server.controller;

import com.server.server.entity.SystemLogs;
import com.server.server.service.SystemLogsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/getsystemlogs")
@Tag(name = "System logs", description = "Endpoints for system log")

public class SystemLogsController {

    @Autowired
    private SystemLogsService systemLogsService;

    @GetMapping
    @Operation(summary = "Fetch a system logs")
    public ResponseEntity<List<SystemLogs>> getAllLogs() {
        List<SystemLogs> logs = systemLogsService.getAllLogsLatestFirst();
        return ResponseEntity.ok(logs);
    }
}
