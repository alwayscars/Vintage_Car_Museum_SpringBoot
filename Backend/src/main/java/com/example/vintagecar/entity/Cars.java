package com.example.vintagecar.entity;
import jakarta.persistence.*;
   @Entity
   @Table(name="cars")
public class Cars {
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Long id;

       private String model;

       private String brand;

       @Column(name = "year_range")
       private String yearRange;

       @Column(columnDefinition = "TEXT")
       private String description;

       private String imageUrl;

       private String audioUrl;

       public Cars() {
           // default constructor required by JPA
       }

       // Getters
       public Long getId() {
           return id;
       }

       public String getModel() {
           return model;
       }

       public String getBrand() {
           return brand;
       }

       public String getYearRange() {
           return yearRange;
       }

       public String getDescription() {
           return description;
       }

       public String getImageUrl() {
           return imageUrl;
       }

       public String getAudioUrl() {
           return audioUrl;
       }

       // Setters
       public void setId(Long id) {
           this.id = id;
       }

       public void setModel(String model) {
           this.model = model;
       }

       public void setBrand(String brand) {
           this.brand = brand;
       }

       public void setYearRange(String yearRange) {
           this.yearRange = yearRange;
       }

       public void setDescription(String description) {
           this.description = description;
       }

       public void setImageUrl(String imageUrl) {
           this.imageUrl = imageUrl;
       }

       public void setAudioUrl(String audioUrl) {
           this.audioUrl = audioUrl;
       }


}
