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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/getsystemlogs")
@Tag(name = "System logs", description = "Endpoints for system log")

public class SystemLogsController {

    private static final Logger logger = Logger.getLogger(ConfigController.class.getName());

    @Autowired
    private SystemLogsService systemLogsService;

    @GetMapping
    @Operation(summary = "Fetch a system logs")
    public ResponseEntity<List<Map<String, Object>>> getAllLogs() {
        List<SystemLogs> logs = systemLogsService.getAllLogsLatestFirst();
        List<Map<String, Object>> formattedData = new ArrayList<>();

        for (SystemLogs log : logs) {
            Map<String, Object> logData = new HashMap<>();
            logData.put("date", log.getDate());
            logData.put("time", log.getTime());
            logData.put("logMessage", log.getLogs());
            logData.put("username", log.getUser().getFirstname());
            logData.put("status", log.getStatus());
            formattedData.add(logData);
        }

        logger.info("Fetch a system logs");

        return ResponseEntity.ok(formattedData);
    }
}
