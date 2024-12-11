package com.server.server.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ConfigDto {
    private int vendorLimitation;
    private int customerLimitation;
    private String status;
    private LocalDateTime lastUpdate;
    private int totalTicketCount;
    private int maximumTicketCountEvent;
}
