package org.example;

import java.util.Scanner;

public class Vendor implements Runnable {
    private final TicketPool ticketPool;
    private final int maxCapacity;

    public Vendor(TicketPool ticketPool, int maxCapacity) {
        this.ticketPool = ticketPool;
        this.maxCapacity = maxCapacity;
    }

    @Override
    public void run() {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("Enter number of tickets to add (or type 'exit' to stop):");
            String input = scanner.nextLine();
            if (input.equalsIgnoreCase("exit")) {
                break;
            }

            try {
                int ticketsToAdd = Integer.parseInt(input);
                ticketPool.addTicket(ticketsToAdd, maxCapacity);
                ticketPool.displayStatus();  // Display current ticket count after each addition
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a valid number of tickets.");
            }
        }
    }
}
