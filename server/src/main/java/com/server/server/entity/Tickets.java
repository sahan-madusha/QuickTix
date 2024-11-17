package com.server.server.entity;

import jakarta.persistence.*;

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

    public Tickets() {
    }

    public Tickets(int id, String name, float price, String description, Events event) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.event = event;
    }

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public float getPrice() {return price;}
    public void setPrice(float price) {this.price = price;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public Events getEvent() {return event;}
    public void setEvent(Events event) {this.event = event;}
}
