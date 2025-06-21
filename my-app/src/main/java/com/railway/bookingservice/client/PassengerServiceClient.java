package com.railway.bookingservice.client;


import com.railway.bookingservice.dto.PassengerDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "passenger-service")
public interface PassengerServiceClient {

    @GetMapping("/api/passengers/{id}")
    PassengerDTO getPassengerById(@PathVariable Long id);
}

