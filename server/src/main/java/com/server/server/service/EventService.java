package com.server.server.service;

import com.server.server.dto.EventDto;
import com.server.server.entity.Events;
import com.server.server.entity.User;
import com.server.server.repository.EventRepository;
import com.server.server.repository.TicketsRepository;
import com.server.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketsRepository ticketsRepository;

    public long getTotalEventCount() {
        return eventRepository.count();
    }

    public Events saveEvent(EventDto eventDto) {
        User eventUser = userRepository.findById(eventDto.getUserId()).get();

        Events eventEntity = new Events();
        eventEntity.setName(eventDto.getName());
        eventEntity.setLocation(eventDto.getLocation());
        eventEntity.setDate(eventDto.getDate());
        eventEntity.setTime(eventDto.getTime());
        eventEntity.setDescription(eventDto.getDescription());
        eventEntity.setImage(eventDto.getImage());
        eventEntity.setStatus(eventDto.getStatus());
        eventEntity.setUser(eventUser);

        return eventRepository.save(eventEntity);
    }

    public Events updateEvent(EventDto eventDto) throws Exception {
        Events existingEvent = eventRepository.findById(eventDto.getId())
                .orElseThrow(() -> new Exception("Event not found with ID: " + eventDto.getId()));
        return getEvents(eventDto, existingEvent);
    }

    public List<Map<String, Object>> getAllEventImagesAndNames() {
        return eventRepository.findAll().stream()
                .map(event -> {
                    Map<String, Object> eventData = new HashMap<>();
                    eventData.put("id", event.getId());
                    eventData.put("name", event.getName());
                    eventData.put("image", event.getImage());
                    eventData.put("status", event.getStatus());
                    return eventData;
                })
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getAllEventByUserId(int userId) {
        return eventRepository.findByUserId(userId).stream()
                .map(event -> {
                    Map<String, Object> eventData = new HashMap<>();
                    eventData.put("id", event.getId());
                    eventData.put("name", event.getName());
                    eventData.put("location" , event.getLocation());
                    eventData.put("date" , event.getDate());
                    eventData.put("time" , event.getTime());
                    eventData.put("description" , event.getDescription());
                    eventData.put("image", event.getImage());
                    eventData.put("status", event.getStatus());
                    return eventData;
                })
                .collect(Collectors.toList());
    }

    public Map<String, Object> getEventById(Integer id) {
        Events event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        List<Map<String, Object>> tickets = ticketsRepository.findByEventId(event.getId()).stream()
                .map(ticket -> {
                    Map<String, Object> ticketData = new HashMap<>();
                    ticketData.put("id", ticket.getId());
                    ticketData.put("name", ticket.getName());
                    ticketData.put("price", ticket.getPrice());
                    ticketData.put("description", ticket.getDescription());
                    ticketData.put("qty", ticket.getQty());
                    return ticketData;
                })
                .collect(Collectors.toList());

        Map<String, Object> eventData = new HashMap<>();
        eventData.put("id", event.getId());
        eventData.put("name", event.getName());
        eventData.put("location" , event.getLocation());
        eventData.put("date" , event.getDate());
        eventData.put("time" , event.getTime());
        eventData.put("description" , event.getDescription());
        eventData.put("image", event.getImage());
        eventData.put("status", event.getStatus());
        eventData.put("tickets", tickets);

        return eventData;
    }


    private Events getEvents(EventDto eventDto, Events existingEvent) {
        existingEvent.setName(eventDto.getName());
        existingEvent.setLocation(eventDto.getLocation());
        existingEvent.setDate(eventDto.getDate());
        existingEvent.setTime(eventDto.getTime());
        existingEvent.setDescription(eventDto.getDescription());
        existingEvent.setImage(eventDto.getImage());
        existingEvent.setStatus(eventDto.getStatus());
        return eventRepository.save(existingEvent);
    }

    public List<Map<String, Object>> getEventDataForChart() {
        List<Object[]> eventTicketDetails = eventRepository.findEventTicketDetails();

        List<Map<String, Object>> formattedDetails = eventTicketDetails.stream()
                .map(result -> {
                    Map<String, Object> eventData = new HashMap<>();
                    eventData.put("name", result[0]);
                    eventData.put("sales", result[2]);
                    eventData.put("total", result[1]);
                    eventData.put("available", result[3]);
                    return eventData;
                })
                .collect(Collectors.toList());

        return formattedDetails;
    }

}
