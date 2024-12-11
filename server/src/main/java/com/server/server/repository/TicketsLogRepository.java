package com.server.server.repository;

import com.server.server.entity.TicketsLog;
import com.server.server.enums.TicketAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketsLogRepository extends JpaRepository<TicketsLog, Integer> {

    @Query("SELECT SUM(t.count) FROM TicketsLog t WHERE t.action = :action")
    Long sumOfPurchasedTickets(@Param("action") TicketAction action);

    List<TicketsLog> findByAction(TicketAction action);

    @Query("SELECT " +
            "e.id AS eventId, " +
            "e.name AS eventName, " +
            "e.location AS eventLocation, " +
            "e.image AS eventImage, " +
            "e.date AS eventDate, " +
            "e.time AS eventTime, " +
            "e.description AS eventDescription, " +
            "t.id AS ticketId, " +
            "t.name AS ticketName, " +
            "tl.count AS ticketCount, " +
            "tl.totalAmount AS ticketTotalAmount " +
            "FROM TicketsLog tl " +
            "JOIN tl.event e " +
            "JOIN tl.ticket t " +
            "WHERE tl.user.id = :user_id " +
            "ORDER BY e.id, t.id")
    List<Object[]> userPurchasedTicketsByUserId(@Param("user_id") int user_id);

    @Query("SELECT SUM(tl.count) FROM TicketsLog tl " +
            "WHERE tl.event.id = :eventId AND tl.user.id = :customerId")
    Long sumOfTicketsForCustomerAndEvent(@Param("customerId") Integer customerId,
                                         @Param("eventId") Integer eventId);
}