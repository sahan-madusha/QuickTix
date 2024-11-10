package org.example;

import java.util.concurrent.locks.ReentrantLock;

public class TicketPool {
    private int totalTickets;
    private final int maxCapacity;
    private final ReentrantLock lock = new ReentrantLock();

    public TicketPool(int totalTickets, int maxCapacity) {
        this.totalTickets = totalTickets;
        this.maxCapacity = maxCapacity;
    }

    public void setTotalTickets(int totalTickets) {
        this.totalTickets = totalTickets;
    }

    // Add tickets to the pool, but respect the capacity limit
    public void addTicket(int ticketsToAdd, int maxCapacity) {
        lock.lock();
        try {
            if (totalTickets + ticketsToAdd <= maxCapacity) {
                totalTickets += ticketsToAdd;
                System.out.println("Vendor added " + ticketsToAdd + " tickets. Total tickets: " + totalTickets);
            } else {
                System.out.println("Cannot add " + ticketsToAdd + " tickets. Exceeds max capacity.");
            }
        } finally {
            lock.unlock();
        }
    }

    // Remove tickets from the pool, but respect the availability
    public void removeTicket(int ticketsToRemove) {
        lock.lock();
        try {
            if (totalTickets >= ticketsToRemove) {
                totalTickets -= ticketsToRemove;
                System.out.println("Customer bought " + ticketsToRemove + " tickets. Total tickets: " + totalTickets);
            } else {
                System.out.println("Not enough tickets available. Only " + totalTickets + " tickets remaining.");
            }
        } finally {
            lock.unlock();
        }
    }

    public void displayStatus() {
        System.out.println("Current tickets available: " + totalTickets);
    }
}
