package com.railway.bookingservice.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingResponseDTO {
    private Long bookingId;
    private String status;
    private double totalFare;
}

