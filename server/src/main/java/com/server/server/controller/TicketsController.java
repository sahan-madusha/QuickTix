package com.server.server.controller;

import com.server.server.dto.EventDto;
import com.server.server.dto.TicketsDto;

import com.server.server.entity.Tickets;
import com.server.server.entity.User;
import com.server.server.repository.TicketsRepository;
import com.server.server.repository.UserRepository;
import com.server.server.service.SystemLogsService;
import com.server.server.service.TicketService;
import com.server.server.util.MessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/ticket")
@Tag(name = "Ticket", description = "Endpoints for ticket")
public class TicketsController {

    private final TicketService ticketService;
    private final UserRepository userRepository;
    private final SystemLogsService systemLogsService;
    private final TicketsRepository ticketsRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public TicketsController(TicketService ticketService, UserRepository userRepository, SystemLogsService systemLogsService, TicketsRepository ticketsRepository, SimpMessagingTemplate messagingTemplate) {
        this.ticketService = ticketService;
        this.userRepository = userRepository;
        this.systemLogsService = systemLogsService;
        this.ticketsRepository = ticketsRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public boolean doesTicketExist(TicketsDto ticketsDto) {
        return ticketsRepository.findById(ticketsDto.getId()).isPresent();
    }

    //Add : Add new ticket
    @PostMapping("/add")
    @Operation(summary = "add ticket data")
    public ResponseEntity<?> addTickets(@RequestBody TicketsDto ticketsDto) {
        User eventUser = userRepository.findById(ticketsDto.getUserId()).get();
        boolean ticketIsExists = doesTicketExist(ticketsDto);

        try {
            ticketService.addOrUpdateTicket(ticketsDto);
            String msg = "Ticket Added successfully";

            if (ticketIsExists) {
                msg = "Ticket Updated successfully";
            }
            systemLogsService.save(msg + " : => " + ticketsDto, eventUser, "1");
            messagingTemplate.convertAndSend("/topic/tickets", ticketsDto);
            return ResponseEntity.ok(new MessageResponse(msg));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            systemLogsService.save("Add new ticket : Internal server error : => "+ticketsDto, eventUser, "0");
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

    // Purchase ticket
    @PostMapping("/purchase")
    @Operation(summary = "Purchase ticket")
    public ResponseEntity<?> purchaseTickets(@RequestBody TicketsDto ticketsDto) {
        Optional<Tickets> optionalTicket = ticketsRepository.findById(ticketsDto.getId());
        User eventUser = userRepository.findById(ticketsDto.getUserId()).get();

        if (!optionalTicket.isPresent()) {
            systemLogsService.save("Ticket not found : Internal server error : => "+ticketsDto, eventUser, "0");
            return ResponseEntity.status(404).body(new MessageResponse("Ticket not found"));
        }

        Tickets ticket = optionalTicket.get();

        if (ticket.getQty() < ticketsDto.getQty()) {
            systemLogsService.save("Insufficient ticket quantity : Internal server error : => "+ticketsDto, eventUser, "0");
            return ResponseEntity.badRequest().body(new MessageResponse("Insufficient ticket quantity"));
        }

        ticket.setQty(ticket.getQty() - ticketsDto.getQty());

        try {
            ticketsRepository.save(ticket);
            messagingTemplate.convertAndSend("/topic/tickets", ticketsDto);
            systemLogsService.save("Ticket purchased successfully: " + ticketsDto, eventUser, "1");
            return ResponseEntity.ok(new MessageResponse("Ticket purchased successfully"));
        } catch (Exception e) {
            systemLogsService.save("Purchase ticket: Internal server error: : => "+ticketsDto, eventUser, "0");
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }


}
