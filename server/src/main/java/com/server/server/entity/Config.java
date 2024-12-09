package com.server.server.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "config")
public class Config {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "vendor_limitation", nullable = true)
    private Integer vendorLimitation;

    @Column(name = "customer_limitation", nullable = true)
    private Integer customerLimitation;

    @Column(name = "status", nullable = true)
    private String status;

    @Column(name = "total_ticket_count", nullable = true)
    private Integer totalTicketCount;

    @Column(name = "maximum_ticket_count_event", nullable = true)
    private Integer maximumTicketCountEvent;

    @Column(name = "lastupdate", nullable = true)
    private LocalDateTime lastUpdate;
}
