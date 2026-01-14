package com.CloudBalance.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Component
public class LoginDto {

    @NotBlank(message = "email cannot be empty")
    @Email(message="email must be in correct format")
    private String email;
    @NotBlank(message = "password cannot be empty")
    private String password;

}
