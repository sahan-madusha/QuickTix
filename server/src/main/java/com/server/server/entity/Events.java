package com.server.server.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Events {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 45)
    private String name;

    @Column(nullable = false, length = 45)
    private String location;

    @Column(nullable = false, length = 45)
    private String imagePath;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(columnDefinition = "LONGTEXT", nullable = true)
    private String description;

    @ManyToOne
    @JoinColumn(name = "users_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false)
    private int status;

    public Events() {
    }

    public Events(int id, String name, String location, String imagePath, LocalDateTime date, String description, User user, int status) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.imagePath = imagePath;
        this.date = date;
        this.description = description;
        this.user = user;
        this.status = status;
    }

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public String getLocation() {return location;}
    public void setLocation(String location) {this.location = location;}

    public String getImagePath() {return imagePath;}
    public void setImagePath(String imagePath) {this.imagePath = imagePath;}

    public LocalDateTime getDate() {return date;}
    public void setDate(LocalDateTime date) {this.date = date;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}

    public int getStatus() {return status;}
    public void setStatus(int status) {this.status = status;}
}
