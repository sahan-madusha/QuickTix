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
}