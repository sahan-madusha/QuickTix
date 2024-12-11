package com.server.server.service;

import com.server.server.dto.TicketsDto;
import com.server.server.entity.TicketsLog;
import com.server.server.enums.TicketAction;
import com.server.server.repository.EventRepository;
import com.server.server.repository.TicketsLogRepository;
import com.server.server.repository.TicketsRepository;
import com.server.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public List<TicketsLog> getPurchasedTickets() {
        return ticketsLogRepository.findByAction(TicketAction.PURCHASE);
    }

    public Long getSumOfPurchasedTickets() {
        return ticketsLogRepository.sumOfPurchasedTickets(TicketAction.PURCHASE);
    }

    public Long getTotalOfAvailableTickets() {
        return ticketsRepository.sumOfAvailableTickets();
    }

    public List<Map<String, Object>> getUserPurchasedTicketsWithDetails(int userId) {
        List<Object[]> rawData = ticketsLogRepository.userPurchasedTicketsByUserId(userId);
        Map<Integer, Map<String, Object>> eventMap = new HashMap<>();

        for (Object[] record : rawData) {

            Map<String, Object> eventDetails = eventMap.computeIfAbsent((Integer) record[0], k -> new HashMap<>());

            if (eventDetails.get("eventName") == null) {
                eventDetails.put("eventId", record[0]);
                eventDetails.put("eventName", record[1]);
                eventDetails.put("eventLocation", record[2]);
                eventDetails.put("eventImage", record[3]);
                eventDetails.put("eventDate", record[4]);
                eventDetails.put("eventTime", record[5]);
                eventDetails.put("eventDescription", record[6]);
                eventDetails.put("tickets", new ArrayList<Map<String, Object>>());
            }

            List<Map<String, Object>> tickets = (List<Map<String, Object>>) eventDetails.get("tickets");
            Map<String, Object> ticketMap = new HashMap<>();
            ticketMap.put("ticketId", record[7]);
            ticketMap.put("ticketName", record[8]);
            ticketMap.put("ticketCount", record[9]);
            ticketMap.put("ticketTotalAmount", record[10]);

            tickets.add(ticketMap);
        }

        return new ArrayList<>(eventMap.values());
    }
}
