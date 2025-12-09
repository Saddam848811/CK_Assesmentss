package com.CloudBalance.DTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Component
public class UserDto {

    private Long id;
    private  String firstName;
    private  String lastName;
    private  String email;
    private  String role;
    private Instant lastLogin = null;
    private boolean active = false;



}
