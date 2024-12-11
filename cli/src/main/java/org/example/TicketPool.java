package org.example;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.locks.ReentrantLock;

public class TicketPool {
    private int ticketsAvailable;
    private final int maxCapacity;
    private final ReentrantLock lock = new ReentrantLock();
    private final SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");

    public TicketPool(int initialTickets, int maxCapacity) {
        this.ticketsAvailable = initialTickets;
        this.maxCapacity = maxCapacity;
        logStatus("Initial tickets: " + initialTickets);
    }

    private void logStatus(String message) {
        String timestamp = formatter.format(new Date());
        System.out.println("[" + timestamp + "] " + message);
    }

    public void produce(int tickets) {
        synchronized (this) {
            if (ticketsAvailable + tickets <= maxCapacity) {
                ticketsAvailable += tickets;
                logTransaction("Produced", tickets);
            } else {
                System.out.println("Cannot produce " + tickets + " tickets. Exceeds max capacity.");
            }
        }
    }

    public void consume(int tickets) {
        synchronized (this) {
            if (ticketsAvailable >= tickets) {
                ticketsAvailable -= tickets;
                logTransaction("Consumed", tickets);
            } else {
                System.out.println("Not enough tickets to consume. Tickets available: " + ticketsAvailable);
            }
        }
    }

    public int getTicketsAvailable() {
        return ticketsAvailable;
    }

    private void logTransaction(String action, int tickets) {
        String timestamp = formatter.format(new Date());
        System.out.println("[" + timestamp + "] " + action + " " + tickets + " tickets. Tickets available: " + ticketsAvailable);
    }
}
