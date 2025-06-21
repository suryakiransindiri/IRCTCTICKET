package com.railway.bookingservice.service;

import com.railway.bookingservice.dto.BookingRequestDTO;
import com.railway.bookingservice.dto.BookingResponseDTO;

public interface BookingService {
    BookingResponseDTO bookTicket(BookingRequestDTO request);
}

