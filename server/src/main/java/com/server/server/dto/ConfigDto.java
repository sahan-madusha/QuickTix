package com.server.server.dto;

import com.server.server.enums.TicketLimitationType;

import java.time.LocalDateTime;

public class ConfigDto {
    private int vendorLimitation;
    private int customerLimitation;
    private TicketLimitationType type;
    private LocalDateTime lastUpdate;

    public Integer getVendorLimitation() {return vendorLimitation;}
    public void setVendorLimitation(Integer vendorLimitation) {this.vendorLimitation = vendorLimitation;}

    public Integer getCustomerLimitation() {return customerLimitation;}
    public void setCustomerLimitation(Integer customerLimitation) {this.customerLimitation = customerLimitation;}

    public TicketLimitationType getType() {return type;}
    public void setType(TicketLimitationType type) {this.type = type;}

    public LocalDateTime getLastUpdate() {return lastUpdate;}
    public void setLastUpdate(LocalDateTime lastUpdate) {this.lastUpdate = lastUpdate;}
}
