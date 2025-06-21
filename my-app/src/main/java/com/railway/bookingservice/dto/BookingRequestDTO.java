package com.railway.bookingservice.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingRequestDTO {

    private Long passengerId;
    private Long trainId;
    private int numberOfSeats;
}
