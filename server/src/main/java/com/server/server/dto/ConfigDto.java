package com.server.server.dto;

import com.server.server.enums.TicketLimitationType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ConfigDto {
    private int vendorLimitation;
    private int customerLimitation;
    private TicketLimitationType type;
    private LocalDateTime lastUpdate;
}
