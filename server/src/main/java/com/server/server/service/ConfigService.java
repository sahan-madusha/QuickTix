package com.server.server.service;

import com.server.server.entity.Config;
import com.server.server.repository.ConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfigService {

    @Autowired
    private ConfigRepository configRepository;

    public Config updateConfig(Config config) {
        if(configRepository.existsById(config.getId())) {
            return configRepository.save(config);
        }else {
            return null;
        }
    }

    public Config getConfig(int id) {
        if(configRepository.existsById(id)) {
            return configRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Config not found with id: " + id));
        }else {
            return null;
        }
    }
}
