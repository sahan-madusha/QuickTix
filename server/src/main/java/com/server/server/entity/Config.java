package com.server.server.entity;

import com.server.server.enums.TicketLimitationType;
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

    @Column(name = "type", nullable = true)
    @Enumerated(EnumType.STRING)
    private TicketLimitationType type;

    @Column(name = "lastupdate", nullable = true)
    private LocalDateTime lastUpdate;
}
