package org.example;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.Scanner;

public class Main {
    private static Vendor vendor;
    private static Customer customer;
    private static TicketPool ticketPool;

    public static void main(String[] args) {

        final Logger LOGGER = (Logger) LogManager.getLogger(Main.class);
        Scanner scanner = new Scanner(System.in);

        LOGGER.info("============== Welcome to the QuickTix CLI! ==============");

        Config config = setupConfiguration(scanner);

        ticketPool = new TicketPool(config.getTotalTickets(),config.getMaxTicketCapacity());

        String command;
        System.out.println("Type 'start' to begin ticket operations, 'stop' to end, or 'exit' to quit.");

        while (true) {
            command = scanner.nextLine().trim().toLowerCase();
            switch (command) {
                case "start":
                    startTicket(config);
                    break;
                case "stop":
                    stopTicket();
                    break;
                case "exit":
                    stopTicket();
                    System.out.println("Exiting ....");
                    System.exit(0);
                    return;
                default:
                    System.out.println("Unknown command");
            }
        }
    }

    private static Config setupConfiguration(Scanner scanner) {
        // Check if saved config exists and prompt the user to load or enter new settings
        System.out.print("Would you like to use the saved configuration? (yes/no): ");
        String choice = scanner.nextLine().trim().toLowerCase();

        if (choice.equals("yes")) {
            Config savedConfig = ConfigDataManager.fetchConfig();
            if (savedConfig != null) {
                return savedConfig;
            } else {
                System.out.println("No saved configuration found, please enter new settings.");
            }
        }
        return newConfigData(scanner);
    }

    private static Config newConfigData(Scanner scanner) {
        System.out.print("Enter Total Number of Tickets: ");
        int totalTickets = scanner.nextInt();

        System.out.print("Enter Ticket Release Rate (tickets per interval): ");
        int ticketReleaseRate = scanner.nextInt();

        System.out.print("Enter Customer Retrieval Rate (tickets per interval): ");
        int customerRetrievalRate = scanner.nextInt();

        System.out.print("Enter Maximum Ticket Capacity: ");
        int maxTicketCapacity = scanner.nextInt();
        Config config = new Config(totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity);

        System.out.print("Would you like to save this configuration? (yes/no): ");
        String saveChoice = scanner.nextLine().trim().toLowerCase();
        if (saveChoice.equals("yes")) {
            ConfigDataManager.saveConfig(config);
        }
        return config;
    }

    private static void startTicket(Config config) {
        if (vendor == null || !vendor.isAlive()) {
            vendor = new Vendor(ticketPool, config.getTicketReleaseRate());
            vendor.start();
            System.out.println("Ticket production started.");
        }

        if (customer == null || !customer.isAlive()) {
            customer = new Customer(ticketPool, config.getCustomerRetrievalRate());
            customer.start();
            System.out.println("Ticket consumption started.");
        }
    }

    private static void stopTicket() {
        if (vendor != null && vendor.isAlive()) {
            vendor.interrupt();
            System.out.println("Ticket production stopped.");
        }

        if (customer != null && customer.isAlive()) {
            customer.interrupt();
            System.out.println("Ticket consumption stopped.");
        }
    }
}