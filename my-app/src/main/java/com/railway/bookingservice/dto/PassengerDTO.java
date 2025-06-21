package com.railway.bookingservice.dto;

import lombok.Data;

@Data
public class PassengerDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String gender;
    private int age;
    private String email;
    private String phoneNumber;

  }
