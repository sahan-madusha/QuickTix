package com.server.server.controller;

import com.server.server.entity.TicketsLog;
import com.server.server.service.EventService;
import com.server.server.service.TicketService;
import com.server.server.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@Tag(name = "Stats", description = "Endpoints for system stats")

public class StatsController {
    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @Autowired
    private TicketService ticketService;

    @GetMapping
    @Operation(summary = "Fetch a admin dashboard stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        long totalEvents = eventService.getTotalEventCount();
        long totalVendors = userService.getTotalVendorCount();
        long totalCustomers = userService.getTotalCustomerCount();
        long totalPurchasedTickets = ticketService.getSumOfPurchasedTickets();
        long totalOfAvailableTickets = ticketService.getTotalOfAvailableTickets();
        List<Map<String, Object>> eventTicketDetails = eventService.getEventDataForChart();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEvents", totalEvents);
        stats.put("totalCustomers", totalCustomers);
        stats.put("totalVendors", totalVendors);
        stats.put("totalPurchasedTickets", totalPurchasedTickets);
        stats.put("totalOfAvailableTickets", totalOfAvailableTickets);
        stats.put("eventTicketDetails", eventTicketDetails);
        return ResponseEntity.ok(stats);
    }
}