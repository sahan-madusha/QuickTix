package com.server.server.controller;

import com.server.server.dto.ConfigDto;
import com.server.server.dto.EventDto;
import com.server.server.entity.Events;
import com.server.server.entity.User;
import com.server.server.repository.UserRepository;
import com.server.server.service.EventService;
import com.server.server.service.SystemLogsService;
import com.server.server.util.MessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/event")
@Tag(name = "Event", description = "Endpoints for event")
public class EventController {

    private static final Logger logger = Logger.getLogger(ConfigController.class.getName());

    private final EventService eventService;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;
    private final SystemLogsService systemLogsService;


    public EventController(EventService eventService, SimpMessagingTemplate messagingTemplate, UserRepository userRepository, SystemLogsService systemLogsService) {
        this.eventService = eventService;
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
        this.systemLogsService = systemLogsService;
    }

    //Add : Add new event
    @PostMapping("/add")
    @Operation(summary = "add event data")
    public ResponseEntity<?> updateConfig(@RequestBody EventDto eventDto) {

        logger.info("Received request to add event => "+ eventDto);

        User eventUser  = userRepository.findById(eventDto.getUserId()).get();
        try {
            Events savedEvent = eventService.saveEvent(eventDto);

            logger.info("Add new event : {" + eventDto +"}");
            systemLogsService.save("Add new event : {" + eventDto +"}", eventUser  , "1");
            messagingTemplate.convertAndSend("/topic/savedEvent", savedEvent);
            return ResponseEntity.ok(new MessageResponse( "Event Added successfully"));

        }catch (Exception e){
            logger.log(Level.SEVERE, "Add new event : Internal server error ", eventUser);
            systemLogsService.save("Add new event : Internal server error", eventUser  , "0");
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

    //Update event data
    @PostMapping("/update")
    @Operation(summary = "Update event data")
    public ResponseEntity<?> updateEvent(@RequestBody EventDto eventDto) {

        logger.info("Received request to update event => " + eventDto);

        User eventUser  = userRepository.findById(eventDto.getUserId()).get();

        try {
            Events updatedEvent = eventService.updateEvent(eventDto);

            logger.info("Event updated successfully: " + eventDto);
            messagingTemplate.convertAndSend("/topic/updateEvent", updatedEvent);
            systemLogsService.save("Update "+eventDto.getName()+" event {" + eventDto + "}", eventUser , "1");
            return ResponseEntity.ok(new MessageResponse("Event updated successfully"));
        } catch (Exception e) {
            systemLogsService.save("Update event "+eventDto.getName()+" Internal server error", eventUser , "0");
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
            logger.log(Level.SEVERE, "Failed to update event", e);
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

    @GetMapping("/list-events-user/{id}")
    @Operation(summary = "Get all event from user")
    public ResponseEntity<?> getAllEventByUserId(@PathVariable Integer id) {

        logger.info("Received request to fetch all event images and names");

        try {
            List<Map<String, Object>> events = eventService.getAllEventByUserId(id);
            logger.info("Fetched event images and names successfully");
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Failed to fetch event images and names", e);
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get event data by ID")
    public ResponseEntity<?> getEventById(@PathVariable Integer id) {

        logger.info("Received request to fetch events for user ID: " + id);

        User adminUser = userRepository.findByUsername("admin").get();

        try {
            Object event = eventService.getEventById(id);

            logger.info("Fetched events successfully for user ID: " + id);
            systemLogsService.save("Fetch " + id +" Event data", adminUser , "1");
            return ResponseEntity.ok(event);
        } catch (RuntimeException e) {
            logger.log(Level.SEVERE, "Failed to fetch events for user ID: " + id, e);
            systemLogsService.save("Failed to fetch " + id +" Event data", adminUser , "1");
            return ResponseEntity.status(404).body(new MessageResponse(e.getMessage()));
        }
    }
}
