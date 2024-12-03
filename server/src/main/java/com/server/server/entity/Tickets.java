package com.server.server.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tickets")
public class Tickets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false, length = 45)
    private String name;

    @Column(name = "price", nullable = false)
    private float price;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;  // LONGTEXT in DB, mapped to String

    @ManyToOne
    @JoinColumn(name = "events_id", nullable = false)
    private Events event;
}
