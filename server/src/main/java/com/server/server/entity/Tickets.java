package com.server.server.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tickets")
public class Tickets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int released_count;

    @Column(nullable = false)
    private double price;
}
