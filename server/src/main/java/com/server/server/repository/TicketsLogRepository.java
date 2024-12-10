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
}