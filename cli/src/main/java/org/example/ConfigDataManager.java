package org.example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class ConfigDataManager {
    private static final String configFileName = "config.json";
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public static void saveConfig(Config config) {
        try(FileWriter writer = new FileWriter(configFileName)){
            gson.toJson(config, writer);
            System.out.println("Saved configuration");
        }catch(IOException e){
            System.err.println("Error save config  " + e.getMessage());
        }
    }
    public static Config fetchConfig() {
        try(FileReader reader = new FileReader(configFileName)){
            return gson.fromJson(reader, Config.class);
        }catch(IOException e){
            System.err.println("Error fetch config " + e.getMessage());
            return null;
        }
    }
}
