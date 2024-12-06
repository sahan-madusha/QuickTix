package com.server.server.dto;

import lombok.Data;

@Data
public class TicketsDto {
    private int id;
    private String name;
    private float price;
    private String description;
    private int eventId;
    private int userId;
    private  int qty;
}
