package com.server.server.service;

import com.server.server.dto.TicketsDto;
import com.server.server.entity.Events;
import com.server.server.entity.Tickets;
import com.server.server.entity.TicketsLog;
import com.server.server.entity.User;
import com.server.server.repository.EventRepository;
import com.server.server.repository.TicketsLogRepository;
import com.server.server.repository.TicketsRepository;
import com.server.server.repository.UserRepository;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
@Data
@NoArgsConstructor(force = true)
public class TicketRunnable implements Runnable {

    private final TicketsDto ticketsDto;
    private final String operationType;

    private final TicketsRepository ticketsRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final TicketsLogRepository ticketsLogRepository;

    public TicketRunnable(TicketsDto ticketsDto, String operationType, TicketsRepository ticketsRepository,
                          UserRepository userRepository, EventRepository eventRepository,
                          TicketsLogRepository ticketsLogRepository) {
        this.ticketsDto = ticketsDto;
        this.operationType = operationType;
        this.ticketsRepository = ticketsRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.ticketsLogRepository = ticketsLogRepository;
    }

    @Override
    public void run() {
        switch (operationType.toLowerCase()) {
            case "add_or_update":
                addOrUpdateTicket();
                break;
            case "purchase":
                purchaseTicket();
                break;
            default:
                System.out.println("Invalid operation type: " + operationType);
        }
    }

    @Async
    public void addOrUpdateTicket() {
        User eventUser = userRepository.findById(ticketsDto.getUserId()).orElse(null);
        Events eventData = eventRepository.findById(ticketsDto.getEventId()).orElse(null);

        if (eventUser != null && eventData != null) {
            Tickets ticketEntity = ticketsRepository.findById(ticketsDto.getId()).orElse(new Tickets());
            ticketEntity.setName(ticketsDto.getName());
            ticketEntity.setPrice(ticketsDto.getPrice());
            ticketEntity.setDescription(ticketsDto.getDescription());
            ticketEntity.setEvent(eventData);
            ticketEntity.setUser(eventUser);
            ticketEntity.setQty(ticketsDto.getQty());

            //add or save
            ticketsRepository.save(ticketEntity);

            addTicketLog(ticketEntity, eventUser, eventData, ticketsDto.getQty());
        }
    }

    @Async
    /*{
      "id": 41,
      "userId": 38,
      "qty": 10
    }*/
    public void purchaseTicket() {
        Tickets ticket = ticketsRepository.findById(ticketsDto.getId()).orElse(null);
        User user = userRepository.findById(ticketsDto.getUserId()).orElse(null);

        if (ticket == null || user == null || ticket.getQty() < ticketsDto.getQty()) {
            return;
        }

        ticket.setQty(ticket.getQty() - ticketsDto.getQty());
        ticketsRepository.save(ticket);
        addTicketLog(ticket, user, ticket.getEvent(), ticketsDto.getQty());
    }

    @Async
    /* {
      "name": "string",
      "price": 50,
      "description": "string",
      "eventId": 32,
      "userId": 37,
      "qty": 100
    }*/
    public void addTicketLog(Tickets ticketEntity, User user, Events event, int qty) {
        TicketsLog ticketsLog = new TicketsLog();
        ticketsLog.setCount(qty);
        ticketsLog.setDate(LocalDate.now());
        ticketsLog.setTime(LocalTime.now());
        ticketsLog.setUserRole(user.getRole());
        ticketsLog.setUser(user);
        ticketsLog.setEvent(event);
        ticketsLog.setTicket(ticketEntity);
        ticketsLog.setTotalAmount(String.valueOf(qty * ticketEntity.getPrice()));

        ticketsLogRepository.save(ticketsLog);
    }
}
