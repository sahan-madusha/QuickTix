package com.server.server.service;

import com.server.server.dto.TicketsDto;
import com.server.server.entity.TicketsLog;
import com.server.server.enums.TicketAction;
import com.server.server.repository.EventRepository;
import com.server.server.repository.TicketsLogRepository;
import com.server.server.repository.TicketsRepository;
import com.server.server.repository.UserRepository;
import org.springframework.stereotype.Service;

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

    public List<Map<String, Object>> userPurchasedTicketsByUserId(int userId) {
        List<Object[]> rawData = ticketsLogRepository.userPurchasedTicketsByUserId(userId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] record : rawData) {
            Map<String, Object> map = new HashMap<>();
            map.put("date", record[0]);
            map.put("time", record[1]);
            map.put("qty", record[2]);
            map.put("totalAmount", record[3]);
            map.put("eventName", record[4]);
            map.put("location", record[5]);
            map.put("image", record[6]);
            map.put("eventDate", record[7]);
            map.put("eventTime", record[8]);
            map.put("description", record[9]);
            map.put("ticket", record[10]);
            result.add(map);
        }
        return result;
    }
}
