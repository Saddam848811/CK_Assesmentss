package com.CloudBalance.DTO;

import com.CloudBalance.Validation.ValueOfEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Positive;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Component
public class UserDto {

    @Positive(message = "id must be positive")
    private Long id;
    @NotBlank(message = "UserName cannot be empty")
    private String username;
    @NotBlank(message = "email cannot be empty")
    @Email(message="email must be in correct format")
    private  String email;
    @NotBlank(message = "password cannot be empty")
    private String password;
    @NotBlank(message = "role cannot be empty")
    @ValueOfEnum(enumClass = Role.class, message = "Role must be one of ADMIN, READONLY, CUSTOMER")
    private  String role;
    @NotNull(message = "Active status must be provided")
    private Boolean active;
    private List<AccountDto> accountList;
}
