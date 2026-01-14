package com.CloudBalance.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Component
public class AccountDto {

    private Long id;
    private String accountName;
    private String accountId;
    private String resourceName;
    private String serviceType;
    private String platform;
    private String instanceType;
    private Boolean active;

}
