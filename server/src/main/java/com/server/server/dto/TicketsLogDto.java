package com.server.server.dto;

import com.server.server.entity.Tickets;
import com.server.server.entity.User;
import com.server.server.enums.Role;
import jdk.jfr.Event;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TicketsLogDto {
    private int id;
    private int count;
    private LocalDate date;
    private LocalTime time;
    private Role userRole;
    private int userId;
    private int eventId;
    private int ticketId;
    private User user;
    private Event event;
    private Tickets ticket;
    private String totalAmount;
}