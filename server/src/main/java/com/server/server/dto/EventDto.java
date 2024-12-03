package com.server.server.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class EventDto {
    private Integer id;
    private String name;
    private String location;
    private LocalDate date;
    private LocalTime time;
    private String description;
    private String image;
    private Integer status;
}