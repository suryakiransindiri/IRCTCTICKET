package com.railway.bookingservice.controller;

import com.railway.bookingservice.dto.BookingRequestDTO;
import com.railway.bookingservice.dto.BookingResponseDTO;
import com.railway.bookingservice.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponseDTO> bookTicket(@RequestBody BookingRequestDTO request) {
        return ResponseEntity.ok(bookingService.bookTicket(request));
    }
}
