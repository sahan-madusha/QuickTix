package com.server.server.service;

import com.server.server.dto.TicketsDto;
import com.server.server.repository.EventRepository;
import com.server.server.repository.TicketsLogRepository;
import com.server.server.repository.TicketsRepository;
import com.server.server.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class TicketService {

    private final TicketsRepository ticketsRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final TicketsLogRepository ticketsLogRepository;

    public TicketService(TicketsRepository ticketsRepository, UserRepository userRepository,
                         EventRepository eventRepository, TicketsLogRepository ticketsLogRepository) {
        this.ticketsRepository = ticketsRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.ticketsLogRepository = ticketsLogRepository;
    }

    public void executeTicketOperation(TicketsDto ticketDto ,String operationType) {
        TicketRunnable ticketRunnable = new TicketRunnable(ticketDto,operationType, ticketsRepository, userRepository, eventRepository, ticketsLogRepository);
        Thread thread = new Thread(ticketRunnable);
        thread.start();
    }
}
