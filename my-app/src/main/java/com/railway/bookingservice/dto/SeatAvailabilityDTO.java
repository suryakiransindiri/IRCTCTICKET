package com.railway.bookingservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatAvailabilityDTO {
    private String trainNumber;
    private LocalDate date;
    private int availableSeats;
    private boolean available;
}
