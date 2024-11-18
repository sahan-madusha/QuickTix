package com.server.server.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tickets_log")
public class TicketsLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int count;

    @Column(name = "datetime")
    private Date dateTime;  // Corresponds to DATETIME in DB

    @Column(name = "user_role", length = 45)
    private String userRole;

    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "events_id", nullable = false)
    private Events event;

    @ManyToOne
    @JoinColumn(name = "tickets_id", nullable = false)
    private Tickets ticket;

    public TicketsLog() {
    }

    public TicketsLog(int id, int count, Date dateTime, String userRole, User user, Events event, Tickets ticket) {
        this.id = id;
        this.count = count;
        this.dateTime = dateTime;
        this.userRole = userRole;
        this.user = user;
        this.event = event;
        this.ticket = ticket;
    }

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public int getCount() {return count;}
    public void setCount(int count) {this.count = count;}

    public Date getDateTime() {return dateTime;}
    public void setDateTime(Date dateTime) {this.dateTime = dateTime;}

    public String getUserRole() {return userRole;}
    public void setUserRole(String userRole) {this.userRole = userRole;}

    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}

    public Events getEvent() {return event;}
    public void setEvent(Events event) {this.event = event;}

    public Tickets getTicket() {return ticket;}
    public void setTicket(Tickets ticket) {this.ticket = ticket;}
}
