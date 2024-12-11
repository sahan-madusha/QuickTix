package org.example;

public class Customer extends Thread {
    private final TicketPool ticketPool;
    private final int rate;

    public Customer(TicketPool ticketPool, int rate) {
        this.ticketPool = ticketPool;
        this.rate = rate;
    }

    @Override
    public void run() {
        while (!isInterrupted()) {
            ticketPool.consume(rate);
            try {
                Thread.sleep(7000);
            } catch (InterruptedException e) {
                System.out.println("Consumer interrupted.");
                break;
            }
        }
    }
}