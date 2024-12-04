package com.server.server.service;

import com.server.server.dto.EventDto;
import com.server.server.entity.Events;
import com.server.server.repository.EventRepository;
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

    public Events saveEvent(EventDto eventDto) {
        Events eventEntity = new Events();
        return getEvents(eventDto, eventEntity);
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

    public Events getEventById(Integer id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
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
}
