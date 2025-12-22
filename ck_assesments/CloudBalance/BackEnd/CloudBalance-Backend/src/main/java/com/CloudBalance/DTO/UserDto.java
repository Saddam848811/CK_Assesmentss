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
    private String username;
    private  String email;
    private String password;
    private  String role;
    private boolean active;



}
