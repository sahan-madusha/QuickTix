package com.server.server.service;

import com.server.server.entity.SystemLogs;
import com.server.server.entity.User;
import com.server.server.repository.SystemLogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SystemLogsService {

    @Autowired
    private SystemLogsRepository systemLogsRepository;

    private final SimpMessagingTemplate messagingTemplate;

    public SystemLogsService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void save(String logMessage, User user , String status) {
        SystemLogs systemLogs = new SystemLogs();
        systemLogs.setDate(LocalDate.now());
        systemLogs.setTime(LocalTime.now());
        systemLogs.setLogs(logMessage);
        systemLogs.setUser(user);
        systemLogs.setStatus(status);
        systemLogsRepository.save(systemLogs);

        List<Object> sendData = new ArrayList<>();
        sendData.add(LocalDate.now());
        sendData.add(LocalTime.now());
        sendData.add(logMessage);
        sendData.add(user.getFirstname());
        sendData.add(status);
        messagingTemplate.convertAndSend("/topic/systemlogs", sendData);
    }

    public List<SystemLogs> getAllLogsLatestFirst() {
        return systemLogsRepository.findAllByOrderByIdDesc();
    }
}
