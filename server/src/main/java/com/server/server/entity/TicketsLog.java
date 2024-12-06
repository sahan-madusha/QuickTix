package com.server.server.entity;

import com.server.server.enums.Role;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@Entity
@Table(name = "tickets_log")
public class TicketsLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int count;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "time")
    private LocalTime time;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role")
    private Role userRole;

    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "events_id", nullable = false)
    private Events event;

    @ManyToOne
    @JoinColumn(name = "tickets_id", nullable = false)
    private Tickets ticket;
}
