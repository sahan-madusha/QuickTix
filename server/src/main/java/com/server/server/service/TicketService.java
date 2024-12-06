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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class TicketService {
    @Autowired
    private TicketsRepository ticketsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TicketsLogRepository ticketsLogRepository;


    public void addTicket(TicketsDto ticketDto) {
        User eventUser = userRepository.findById(ticketDto.getUserId()).get();
        Events eventData = eventRepository.findById(ticketDto.getEventId()).get();

        Tickets ticketEntity = new Tickets();
        ticketEntity.setName(ticketDto.getName());
        ticketEntity.setPrice(ticketDto.getPrice());
        ticketEntity.setDescription(ticketDto.getDescription());
        ticketEntity.setEvent(eventData);
        ticketEntity.setUser(eventUser);
        ticketEntity.setQty(ticketDto.getQty());
        ticketsRepository.save(ticketEntity);

        addTicketLogAsync(ticketEntity, eventUser, eventData, ticketDto.getQty());
    }

    @Async
    public void addTicketLogAsync(Tickets ticketEntity, User user, Events event, int qty) {
        TicketsLog ticketsLog = new TicketsLog();
        ticketsLog.setCount(qty);
        ticketsLog.setDate(LocalDate.now());
        ticketsLog.setTime(LocalTime.now());
        ticketsLog.setUserRole(user.getRole());
        ticketsLog.setUser(user);
        ticketsLog.setEvent(event);
        ticketsLog.setTicket(ticketEntity);
        ticketsLogRepository.save(ticketsLog);
    }
}