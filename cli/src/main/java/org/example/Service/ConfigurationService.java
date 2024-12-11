package org.example.Service;

import Model.Configuration;
import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.naming.ConfigurationException;
import java.io.*;
import java.util.Scanner;

public class ConfigurationService {

    private static final Logger LOGGER = LogManager.getLogger(ConfigurationService.class);

    private static final String CONFIG_FILE = "configData.json"; // Consistent file name

    public void createConfig() {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            try {
                System.out.println("========== Please enter the event configurations ==========");

                // Configurations
                System.out.println("Enter the Maximum Ticket Capacity (maxTicketCapacity): ");
                int maxTicketCapacity = scanner.nextInt();
                if (maxTicketCapacity <= 0 || maxTicketCapacity > 100) {
                    LOGGER.warn("Invalid maxTicketCapacity. Please enter a number between 1 and 100");
                    continue;
                }

                System.out.println("Enter the Total Number of Tickets (totalTickets): ");
                int totalTickets = scanner.nextInt();
                if (totalTickets > maxTicketCapacity || totalTickets <= 0) {
                    LOGGER.warn("Invalid totalTickets. Please enter a number between 1 and " + maxTicketCapacity);
                    continue;
                }

                System.out.println("Enter the Ticket Release Rate (ticketReleaseRate): ");
                int ticketReleaseRate = scanner.nextInt();
                if (ticketReleaseRate <= 0 || ticketReleaseRate > 2000) {
                    LOGGER.warn("Invalid ticketReleaseRate. Please enter a number between 1 and 2000");
                    continue;
                }

                System.out.println("Enter the Customer Retrieval Rate (customerRetrievalRate): ");
                int customerRetrievalRate = scanner.nextInt();
                if (customerRetrievalRate <= 0 || customerRetrievalRate > 5000) {
                    LOGGER.warn("Invalid customerRetrievalRate. Please enter a number between 1 and 5000");
                    continue;
                }

                setEventConfigurations(totalTickets, maxTicketCapacity, ticketReleaseRate, customerRetrievalRate);
                break;
            } catch (Exception e) {
                LOGGER.error("Invalid input. Please enter a number", e);
                scanner.next();
            }
        }
    }

    public void setEventConfigurations(int totalTickets, int maxTicketCapacity, int ticketReleaseRate, int customerRetrievalRate) {
        try {
            File fileName = new File(CONFIG_FILE);

            if (!fileName.exists()) {
                fileName.createNewFile();
            }

            Gson gson = new Gson();
            FileWriter fileWriter = new FileWriter(fileName);
            Configuration configuration = new Configuration(maxTicketCapacity, totalTickets, ticketReleaseRate, customerRetrievalRate);
            gson.toJson(configuration, fileWriter);
            fileWriter.close();

            LOGGER.info("Configuration set successfully");

        } catch (IOException e) {
            LOGGER.error("An error occurred while writing the configuration", e);
        }
    }

    public void viewConfigData() {
        try {
            Gson gson = new Gson();
            FileReader fileReader = new FileReader(CONFIG_FILE);
            Configuration configuration = gson.fromJson(fileReader, Configuration.class);
            fileReader.close();

            LOGGER.info("Configuration fetched successfully");

            System.out.println("Max Ticket Capacity: " + configuration.getMaxTicketCapacity());
            System.out.println("Total Tickets: " + configuration.getTotalTickets());
            System.out.println("Ticket Release Rate: " + configuration.getTicketReleaseRate());
            System.out.println("Customer Retrieval Rate: " + configuration.getCustomerRetrievalRate());

        } catch (IOException e) {
            LOGGER.error("An error occurred while reading the configuration", e);
        }
    }

    public void addTicket() throws ConfigurationException {
        Scanner scanner = new Scanner(System.in);
        Configuration config = getConfigData();
        System.out.println("You can add only " + (config.getMaxTicketCapacity() - config.getTotalTickets()) + " tickets to reach the max capacity");

        int tickets;

        while (true) {
            System.out.println("Enter the number of tickets you added: ");
            tickets = scanner.nextInt();
            if (tickets > (config.getMaxTicketCapacity() - config.getTotalTickets())) {
                LOGGER.warn("You can't add more tickets than the max capacity");
            } else {
                int currentTotalTickets = config.getTotalTickets() + tickets;
                updateConfigData(currentTotalTickets);
                LOGGER.info("Tickets added successfully");
                break;
            }
        }
    }

    public Configuration getConfigData() throws ConfigurationException {
        try {
            Gson gson = new Gson();
            FileReader fileReader = new FileReader(CONFIG_FILE);
            Configuration config = gson.fromJson(fileReader, Configuration.class);
            fileReader.close();
            return config;
        } catch (IOException ex) {
            throw new ConfigurationException("An error occurred in getting configs: " + ex.getMessage());
        }
    }

    public void updateConfigData(int currentTotalTickets) throws ConfigurationException {
        try {
            Gson gson = new Gson();
            FileReader fileReader = new FileReader(CONFIG_FILE);
            Configuration configuration = gson.fromJson(fileReader, Configuration.class);
            fileReader.close();

            Configuration updatedConfiguration;

            if (currentTotalTickets > configuration.getMaxTicketCapacity()) {
                LOGGER.warn("You can't add more tickets than the max capacity");
                updatedConfiguration = configuration;
            } else {
                updatedConfiguration = new Configuration(configuration.getMaxTicketCapacity(), currentTotalTickets, configuration.getTicketReleaseRate(), configuration.getCustomerRetrievalRate());
            }

            FileWriter fileWriter = new FileWriter(CONFIG_FILE);
            gson.toJson(updatedConfiguration, fileWriter);
            fileWriter.close();

        } catch (IOException e) {
            throw new ConfigurationException("An error occurred while updating the configuration");
        }
    }
}
