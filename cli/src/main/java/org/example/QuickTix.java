package org.example;

import java.util.Scanner;

public class QuickTix {
    private int totalTickets;
    private int maxTicketCapacity;
    private TicketPool ticketPool;

    public QuickTix() {
        this.ticketPool = new TicketPool(totalTickets, maxTicketCapacity);
    }

    public void startQuickTixCLI() {
        Scanner scanner = new Scanner(System.in);
        loadConfiguration();

        while (true) {
            System.out.println("Enter command (vendor, customer, exit):");
            String command = scanner.nextLine();

            switch (command.toLowerCase()) {
                case "vendor":
                    new Thread(new Vendor(ticketPool, maxTicketCapacity)).start();
                    break;
                case "customer":
                    new Thread(new Customer(ticketPool)).start();
                    break;
                case "exit":
                    System.out.println("Exiting system...");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid command. Try again.");
            }
        }
    }

    private void loadConfiguration() {
        this.totalTickets = 10;  // Initial tickets, can be changed based on config.
        this.maxTicketCapacity = 20;  // Max capacity
        this.ticketPool.setTotalTickets(totalTickets);
    }

    public static void main(String[] args) {
        QuickTix system = new QuickTix();
        system.startQuickTixCLI();
    }
}