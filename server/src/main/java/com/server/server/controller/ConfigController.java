package com.server.server.controller;

import com.server.server.dto.ConfigDto;
import com.server.server.entity.Config;
import com.server.server.service.ConfigService;
import com.server.server.util.MessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/config")
@Tag(name = "Config", description = "Endpoints for app config")
public class ConfigController {

    @Autowired
    private ConfigService configService;

    //UPDATE : Update the app config
    @PostMapping("/update")
    @Operation(summary = "Update configuration data")
    public ResponseEntity<?> updateConfig(@RequestBody ConfigDto configDto) {
        try {
            int configId = 1;
            Config existingConfig = configService.getConfig(configId);

            existingConfig.setVendorLimitation(configDto.getVendorLimitation());
            existingConfig.setCustomerLimitation(configDto.getCustomerLimitation());
            existingConfig.setType(configDto.getType());
            existingConfig.setLastUpdate(LocalDateTime.now());

            Config updatedConfig = configService.updateConfig(existingConfig);
            return ResponseEntity.ok(updatedConfig);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }

    }

    //Fetch a data using id
    @GetMapping("/{id}")
    @Operation(summary = "Fetch a configuration by ID")
    public ResponseEntity<?> getConfig(@PathVariable int id) {
        try{
            Config config = configService.getConfig(id);
            return ResponseEntity.ok(config);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new MessageResponse("Internal server error"));
        }

    }
}