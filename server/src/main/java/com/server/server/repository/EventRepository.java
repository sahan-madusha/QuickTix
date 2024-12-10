package com.server.server.repository;

import com.server.server.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Events, Integer> {
    List<Events> findByUserId(int userId);

    @Query("SELECT " +
            "    e.name AS event_name, " +
            "    SUM(CASE WHEN tl.action IN ('ADD', 'UPDATE') THEN tl.count ELSE 0 END) AS total_tickets, " +
            "    SUM(CASE WHEN tl.action = 'PURCHASE' THEN tl.count ELSE 0 END) AS sold_tickets, " +
            "    (t.qty) AS available_tickets " +
            "FROM " +
            "    TicketsLog tl " +
            "JOIN " +
            "    Tickets t ON tl.ticket.id = t.id " +
            "JOIN " +
            "    Events e ON t.event.id = e.id " +
            "GROUP BY " +
            "    e.name, t.qty")
    List<Object[]> findEventTicketDetails();


}
