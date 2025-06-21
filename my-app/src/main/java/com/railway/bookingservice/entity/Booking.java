package com.railway.bookingservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long passengerId;
    private Long trainId;
    private int numberOfSeats;
    private double fare;
    private String status; // CONFIRMED, WAITLISTED, CANCELLED
    private LocalDateTime bookingTime;
}

