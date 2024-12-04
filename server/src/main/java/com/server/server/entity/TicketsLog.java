package com.server.server.entity;

import jakarta.persistence.*;
import lombok.Data;

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

    @Column(name = "datetime")
    private Date dateTime;  // Corresponds to DATETIME in DB

    @Column(name = "user_role", length = 45)
    private String userRole;

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
