package com.server.server.controller;

import com.server.server.dto.EventDto;
import com.server.server.dto.TicketsDto;

import com.server.server.entity.Config;
import com.server.server.entity.Tickets;
import com.server.server.entity.TicketsLog;
import com.server.server.entity.User;
import com.server.server.enums.TicketAction;
import com.server.server.repository.ConfigRepository;
import com.server.server.repository.TicketsLogRepository;
import com.server.server.repository.TicketsRepository;
import com.server.server.repository.UserRepository;
import com.server.server.service.SystemLogsService;
import com.server.server.service.TicketService;
import com.server.server.util.MessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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
    private final ConfigRepository configRepository;
    private final TicketsLogRepository ticketsLogRepository;


    public TicketsController(TicketService ticketService, UserRepository userRepository, SystemLogsService systemLogsService, TicketsRepository ticketsRepository, SimpMessagingTemplate messagingTemplate, ConfigRepository configRepository, TicketsLogRepository ticketsLogRepository) {
        this.ticketService = ticketService;
        this.userRepository = userRepository;
        this.systemLogsService = systemLogsService;
        this.ticketsRepository = ticketsRepository;
        this.messagingTemplate = messagingTemplate;
        this.configRepository = configRepository;
        this.ticketsLogRepository = ticketsLogRepository;
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
        Config config = configRepository.findById(1).get();

        //Maximum number of tickets that can be added to an event for a vendor
        long currentTicketCountForVendor = ticketsRepository.sumOfTicketsForVendorAndTicket(ticketsDto.getUserId() , ticketsDto.getEventId());
        long qtyOfTicket = ticketsRepository.qtyOfTicket(ticketsDto.getId());
        if (currentTicketCountForVendor + ticketsDto.getQty()-qtyOfTicket > config.getVendorLimitation()) {
            systemLogsService.save("Your ticket adding limit is exceeded" + " : => " + ticketsDto, eventUser, "0");
            return ResponseEntity.ok(new MessageResponse("You ticket limit is exceeded."));
        }

        //Maximum Tickets count for event
        Long sumOfAvailableTicketsInEvent = ticketsRepository.sumOfAvailableTicketsInEvent(ticketsDto.getEventId());
        if (sumOfAvailableTicketsInEvent + ticketsDto.getQty()-qtyOfTicket > config.getMaximumTicketCountEvent()) {
            systemLogsService.save("System ticket limit is exceeded" + " : => " + ticketsDto, eventUser, "0");
            return ResponseEntity.ok(new MessageResponse("System ticket limit is exceeded."));
        }

        //Maximum Tickets count for system
        Long sumOfAvailableTicketsInSystem = ticketsRepository.sumOfAvailableTicketsInSystem();
        if (sumOfAvailableTicketsInSystem + ticketsDto.getQty()-qtyOfTicket > config.getTotalTicketCount()) {
            systemLogsService.save("System ticket limit is exceeded" + " : => " + ticketsDto, eventUser, "0");
            return ResponseEntity.ok(new MessageResponse("System ticket limit is exceeded."));
        }

        try {
            String msg = "Ticket Added successfully";
            ticketService.executeTicketOperation(ticketsDto , "add_or_update");
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
        Config config = configRepository.findById(1).get();

        if (!optionalTicket.isPresent()) {
            systemLogsService.save("Ticket not found : Internal server error : => "+ticketsDto, eventUser, "0");
            return ResponseEntity.status(404).body(new MessageResponse("Ticket not found"));
        }

        Tickets ticket = optionalTicket.get();

        //Maximum number of tickets that can be purchased to an event for a customer
        Long sumOfTicketsForCustomerAndTicket = ticketsLogRepository.sumOfTicketsForCustomerAndEvent(
                ticketsDto.getUserId(),
                ticketsDto.getEventId());

        if (sumOfTicketsForCustomerAndTicket + ticketsDto.getQty() > config.getCustomerLimitation()) {
            systemLogsService.save("Your ticket purchasing limit is exceeded : => "+ticketsDto, eventUser, "0");
            return ResponseEntity.badRequest().body(new MessageResponse("Your ticket purchasing limit is exceeded"));
        }

        ticket.setQty(ticket.getQty() - ticketsDto.getQty());

        try {
            ticketService.executeTicketOperation(ticketsDto,"purchase");
            messagingTemplate.convertAndSend("/topic/tickets", ticketsDto);
            systemLogsService.save("Ticket purchased successfully: " + ticketsDto, eventUser, "1");
            return ResponseEntity.ok(new MessageResponse("Ticket purchased successfully"));
        } catch (Exception e) {
            systemLogsService.save("Purchase ticket: Internal server error: : => "+ticketsDto, eventUser, "0");
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

    @GetMapping("/list-ticket-user/{id}")
    @Operation(summary = "Get all event from user")
    public ResponseEntity<?> getAllPurchasedEventByUserId(@PathVariable Integer id) {
        try {
            List<Map<String, Object>> tickets = ticketService.getUserPurchasedTicketsWithDetails(id);
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }
}
