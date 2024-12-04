package com.server.server.dto;

import com.server.server.entity.User;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class SystemLogsDto {
    private int id;
    private LocalDate date;
    private LocalTime time;
    private User user;
    private String logs;
    private String status;
}
