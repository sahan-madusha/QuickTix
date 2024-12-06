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
    private String description;

    @Column(name = "qty")
    private int qty;

    @ManyToOne
    @JoinColumn(name = "events_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_tickets_events1"))
    private Events event;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_events_users"))
    private User user;
}
