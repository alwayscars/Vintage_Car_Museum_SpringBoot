package com.example.vintagecar.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "stories")
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private Long carId;     // no foreign key relation

    @Column(name = "story_text", columnDefinition = "TEXT")
    private String storyText;

    public Story() {
        // default constructor
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Long getCarId() {
        return carId;
    }

    public String getStoryText() {
        return storyText;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public void setStoryText(String storyText) {
        this.storyText = storyText;
    }
}
