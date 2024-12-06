package com.server.server.controller;

import com.server.server.dto.EventDto;
import com.server.server.dto.TicketsDto;

import com.server.server.entity.User;
import com.server.server.repository.UserRepository;
import com.server.server.service.SystemLogsService;
import com.server.server.service.TicketService;
import com.server.server.util.MessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ticket")
@Tag(name = "Ticket", description = "Endpoints for ticket")
public class TicketsController {

    private final TicketService ticketService;
    private final UserRepository userRepository;
    private final SystemLogsService systemLogsService;

    public TicketsController(TicketService ticketService, UserRepository userRepository, SystemLogsService systemLogsService) {
        this.ticketService = ticketService;
        this.userRepository = userRepository;
        this.systemLogsService = systemLogsService;
    }

    //Add : Add new ticket
    @PostMapping("/add")
    @Operation(summary = "add ticket data")
    public ResponseEntity<?> addTickets(@RequestBody TicketsDto ticketsDto) {
        User eventUser = userRepository.findById(ticketsDto.getUserId()).get();
        try {
            ticketService.addTicket(ticketsDto);
            systemLogsService.save("Ticket Added successfully : => "+ticketsDto, eventUser, "1");
            return ResponseEntity.ok(new MessageResponse( "Ticket Added successfully"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            systemLogsService.save("Add new ticket : Internal server error : => "+ticketsDto, eventUser, "0");
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

}
