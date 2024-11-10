package org.example;

import java.util.concurrent.locks.ReentrantLock;

public class Main {

    private TicketPool ticketPool;
    private ReentrantLock lock = new ReentrantLock();
    private boolean systemRunning = false;

    
    public static void main(String[] args) {

    }
}