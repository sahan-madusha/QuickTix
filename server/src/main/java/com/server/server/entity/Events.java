package com.server.server.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "events")
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String location;

}
