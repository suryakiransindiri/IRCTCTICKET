package com.railway.bookingservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.railway.bookingservice.dto.SeatAvailabilityDTO;


@FeignClient(name = "seat-availability-service", path = "/api/seats")
public interface SeatAvailabilityClient {

    @GetMapping("/availability")
    SeatAvailabilityDTO getSeatAvailability(@RequestParam("trainId") Long trainId,
                                          @RequestParam("seats") int numberOfSeats);

    @PutMapping("/update/{trainId}")
    void updateAvailableSeats(@PathVariable Long trainId, @RequestParam int availableSeats);

}