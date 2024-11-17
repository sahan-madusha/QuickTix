package com.server.server.entity;

import com.server.server.enums.TicketLimitationType;
import jakarta.persistence.*;

import java.time.LocalDateTime;

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

    @Column(name = "type", length = 45, nullable = true)
    private TicketLimitationType type;

    @Column(name = "lastupdate", nullable = true)
    private LocalDateTime lastupdate;

    public Config() {
    }

    public Config(int id, int vendor_limitation, int customerLimitation, TicketLimitationType type, LocalDateTime lastupdate) {
        this.id = id;
        this.vendorLimitation = vendor_limitation;
        this.customerLimitation = customerLimitation;
        this.type = type;
        this.lastupdate = lastupdate;
    }

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public Integer getVendorLimitation() {return vendorLimitation;}
    public void setVendorLimitation(Integer vendorLimitation) {this.vendorLimitation = vendorLimitation;}

    public Integer getCustomerLimitation() {return customerLimitation;}
    public void setCustomerLimitation(Integer customerLimitation) {this.customerLimitation = customerLimitation;}

    public TicketLimitationType getType() {return type;}
    public void setType(TicketLimitationType type) {this.type = type;}

    public LocalDateTime getLastupdate() {return lastupdate;}
    public void setLastupdate(LocalDateTime lastupdate) {this.lastupdate = lastupdate;}
}
