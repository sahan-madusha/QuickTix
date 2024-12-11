package com.server.server.controller;

import com.server.server.dto.ConfigDto;
import com.server.server.entity.Config;
import com.server.server.entity.User;
import com.server.server.repository.UserRepository;
import com.server.server.service.ConfigService;
import com.server.server.service.SystemLogsService;
import com.server.server.util.MessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/config")
@Tag(name = "Config", description = "Endpoints for app config")
public class ConfigController {

    private static final Logger logger = Logger.getLogger(ConfigController.class.getName());

    private final ConfigService configService;
    private final SimpMessagingTemplate messagingTemplate;
    private final SystemLogsService systemLogsService;
    private final UserRepository userRepository;

    public ConfigController(ConfigService configService, SimpMessagingTemplate messagingTemplate, SystemLogsService systemLogsService, UserRepository userRepository) {
        this.configService = configService;
        this.messagingTemplate = messagingTemplate;
        this.systemLogsService = systemLogsService;
        this.userRepository = userRepository;
    }

    //UPDATE : Update the app config
    @PostMapping("/update")
    @Operation(summary = "Update configuration data")
    public ResponseEntity<?> updateConfig(@RequestBody ConfigDto configDto) {

        logger.info("Received request to update configuration => "+ configDto);

        User adminUser = userRepository.findByUsername("admin").get();

        try {
            int configId = 1;
            Config existingConfig = configService.getConfig(configId);

            existingConfig.setVendorLimitation(configDto.getVendorLimitation());
            existingConfig.setCustomerLimitation(configDto.getCustomerLimitation());
            existingConfig.setStatus(configDto.getStatus());
            existingConfig.setTotalTicketCount(configDto.getTotalTicketCount());
            existingConfig.setMaximumTicketCountEvent(configDto.getMaximumTicketCountEvent());
            existingConfig.setLastUpdate(LocalDateTime.now());

            Config updatedConfig = configService.updateConfig(existingConfig);

            logger.info("Update configuration data => : " + configDto +" : "+ adminUser);
            systemLogsService.save("Update configuration data => : " + configDto , adminUser , "1");
            messagingTemplate.convertAndSend("/topic/configUpdates", updatedConfig);

            return ResponseEntity.ok(new MessageResponse( "Config successfully"));
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Update configuration data => Internal server error ", adminUser);
            systemLogsService.save("Update configuration data => Internal server error ", adminUser , "0");
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }

    //Fetch a data using id
    @GetMapping("/{id}")
    @Operation(summary = "Fetch a configuration by ID")
    public ResponseEntity<?> getConfig(@PathVariable int id) {
        try{
            Config config = configService.getConfig(id);
            logger.info("Update configuration data");
            return ResponseEntity.ok(config);
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error updating configuration", e);
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }
    }
}