package com.server.server.controller;

import com.server.server.dto.ConfigDto;
import com.server.server.dto.EventDto;
import com.server.server.entity.Events;
import com.server.server.service.EventService;
import com.server.server.util.MessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/event")
@Tag(name = "Event", description = "Endpoints for event")
public class EventController {
    private final EventService eventService;
    private final SimpMessagingTemplate messagingTemplate;


    public EventController(EventService eventService, SimpMessagingTemplate messagingTemplate) {
        this.eventService = eventService;
        this.messagingTemplate = messagingTemplate;
    }

    //Add : Add new event
    @PostMapping("/add")
    @Operation(summary = "add event data")
    public ResponseEntity<?> updateConfig(@RequestBody EventDto eventDto) {
        try {
            Events savedEvent = eventService.saveEvent(eventDto);
            messagingTemplate.convertAndSend("/topic/savedEvent", savedEvent);
            return ResponseEntity.ok(new MessageResponse( "Event Added successfully"));
        }catch (Exception e){
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

    //Update event data
    @PostMapping("/update")
    @Operation(summary = "Update event data")
    public ResponseEntity<?> updateEvent(@RequestBody EventDto eventDto) {
        try {
            Events updatedEvent = eventService.updateEvent(eventDto);
            messagingTemplate.convertAndSend("/topic/updateEvent", updatedEvent);
            return ResponseEntity.ok(new MessageResponse("Event updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

    @GetMapping("/list-events")
    @Operation(summary = "Get all event images and names")
    public ResponseEntity<?> getAllEventImagesAndNames() {
        try {
            List<Map<String, Object>> eventImagesAndNames = eventService.getAllEventImagesAndNames();
            return ResponseEntity.ok(eventImagesAndNames);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get event data by ID")
    public ResponseEntity<?> getEventById(@PathVariable Integer id) {
        try {
            Events event = eventService.getEventById(id);
            return ResponseEntity.ok(event);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(new MessageResponse(e.getMessage()));
        }
    }
}
