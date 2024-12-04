package com.server.server.controller;

import com.server.server.service.EventService;
import com.server.server.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@Tag(name = "Stats", description = "Endpoints for system stats")

public class StatsController {
    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @GetMapping
    @Operation(summary = "Fetch a admin dashboard stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        long totalEvents = eventService.getTotalEventCount();
        long totalVendors = userService.getTotalVendorCount();
        long totalCustomers = userService.getTotalCustomerCount();

        Map<String, Long> stats = Map.of(
                "totalEvents", totalEvents,
                "totalCustomers", totalCustomers,
                "totalVendors", totalVendors
        );

        return ResponseEntity.ok(stats);
    }
}
