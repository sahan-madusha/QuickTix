package org.example;

import java.util.Scanner;

public class Customer implements Runnable {
    private final TicketPool ticketPool;

    public Customer(TicketPool ticketPool) {
        this.ticketPool = ticketPool;
    }

    @Override
    public void run() {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("Enter number of tickets to buy (or type 'exit' to stop):");
            String input = scanner.nextLine();
            if (input.equalsIgnoreCase("exit")) {
                break;
            }

            try {
                int ticketsToBuy = Integer.parseInt(input);
                ticketPool.removeTicket(ticketsToBuy);
                ticketPool.displayStatus();  // Display current ticket count after each addition
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a valid number of tickets.");
            }
        }
    }
}
