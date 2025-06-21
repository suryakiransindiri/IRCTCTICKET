package com.railway.bookingservice.client;


import com.railway.bookingservice.dto.TrainDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "train-service", url = "http://localhost:8081/api/trains")
public interface TrainServiceClient {

    @GetMapping("/{id}")
    TrainDTO getTrainById(@PathVariable Long id);

}

