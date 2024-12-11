package org.example;

public class Vendor extends Thread{
    private final TicketPool ticketPool;
    private final int rate;

    public Vendor(TicketPool ticketPool, int rate) {
        this.ticketPool = ticketPool;
        this.rate = rate;
    }

    @Override
    public void run() {
        while (!isInterrupted()) {
            ticketPool.produce(rate);
            try {
                Thread.sleep(5000); // Produce tickets every 2 seconds
            } catch (InterruptedException e) {
                System.out.println("Producer interrupted.");
                break;
            }
        }
    }
}
