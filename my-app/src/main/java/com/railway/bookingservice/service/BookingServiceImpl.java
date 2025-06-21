package com.railway.bookingservice.service;

import com.railway.bookingservice.client.PassengerServiceClient;
import com.railway.bookingservice.client.SeatAvailabilityClient;
import com.railway.bookingservice.client.TrainServiceClient;
import com.railway.bookingservice.dto.*;
import com.railway.bookingservice.entity.Booking;
import com.railway.bookingservice.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class BookingServiceImpl implements BookingService {

    private final TrainServiceClient trainServiceClient;
    private final PassengerServiceClient passengerServiceClient;
    private final SeatAvailabilityClient seatAvailabilityClient;
    private final BookingRepository bookingRepository;

    @Autowired
    public BookingServiceImpl(TrainServiceClient trainServiceClient, PassengerServiceClient passengerServiceClient, SeatAvailabilityClient seatAvailabilityClient, BookingRepository bookingRepository) {
        this.trainServiceClient = trainServiceClient;
        this.passengerServiceClient = passengerServiceClient;
        this.seatAvailabilityClient = seatAvailabilityClient;
        this.bookingRepository = bookingRepository;
    }

    @Transactional
    @Override
    public BookingResponseDTO bookTicket(BookingRequestDTO request) {
        // Check seat availability
        SeatAvailabilityDTO seatAvailability = seatAvailabilityClient.getSeatAvailability(request.getTrainId(), request.getNumberOfSeats());
        if(seatAvailability.getAvailableSeats() >= request.getNumberOfSeats()) {
            seatAvailability.setAvailable(true);
        } else { 
            seatAvailability.setAvailable(false);
        }

        if (!seatAvailability.isAvailable()) {
            throw new RuntimeException("Seats not available!");
        }

        // Fetch train and passenger details
        TrainDTO train = trainServiceClient.getTrainById(request.getTrainId());
        PassengerDTO passenger = passengerServiceClient.getPassengerById(request.getPassengerId());

        // Calculate fare
        double totalFare = train.getFare() * request.getNumberOfSeats();

        // Create Booking
        Booking booking = Booking.builder()
                .passengerId(passenger.getId())
                .trainId(train.getId())
                .numberOfSeats(request.getNumberOfSeats())
                .fare(totalFare)
                .status("CONFIRMED")
                .bookingTime(LocalDateTime.now())
                .build();
        bookingRepository.save(booking);

        // Update available seats
        int updatedSeats = train.getAvailableSeats() - request.getNumberOfSeats();
        seatAvailabilityClient.updateAvailableSeats(request.getTrainId(), updatedSeats);



        return new BookingResponseDTO(booking.getId(), booking.getStatus(), totalFare);
    }
}

