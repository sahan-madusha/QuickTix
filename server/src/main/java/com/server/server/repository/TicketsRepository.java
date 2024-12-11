package com.server.server.repository;

import com.server.server.entity.Tickets;
import com.server.server.enums.TicketAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TicketsRepository extends JpaRepository<Tickets, Integer> {
    List<Tickets> findByEventId(int eventId);

    @Override
    boolean existsById(Integer integer);

    @Query("SELECT SUM(t.qty) FROM Tickets t ")
    Long sumOfAvailableTickets();

    @Query("SELECT SUM(t.qty) FROM Tickets t " +
            "JOIN t.event e " +
            "WHERE e.user.id = :vendorId AND e.id = :eventId")
    Long sumOfTicketsForVendorAndTicket(@Param("vendorId") Integer vendorId, @Param("eventId") Integer eventId);

    @Query("SELECT SUM(t.qty) FROM Tickets t WHERE t.id = :ticketId")
    Long qtyOfTicket(@Param("ticketId") Integer ticketId);

    @Query("SELECT SUM(t.qty) FROM Tickets t WHERE t.event.id = :eventId ")
    Long sumOfAvailableTicketsInEvent(@Param("eventId") Integer eventId);

    @Query("SELECT SUM(t.qty) FROM Tickets t ")
    Long sumOfAvailableTicketsInSystem();

}