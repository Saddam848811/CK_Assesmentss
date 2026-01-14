package com.CloudBalance.DTO;


import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Component
public class GroupByDTO {

    @NotBlank(message = "GroupByColumn must not be empty")
    @Pattern(
            regexp = "^(SERVICE|INSTANCE_TYPE|REGION|ACCOUNT_ID|USAGE_TYPE|PLATFORM|USAGE_TYPE_GROUP)$",
            message = "Invalid GroupByColumn"
    )
    private String GroupByColumn;

    @NotBlank(message = "StartDate must not be empty")
    @Pattern(
            regexp = "^\\d{4}-\\d{2}-\\d{2}$",
            message = "StartDate must be in yyyy-MM-dd format"
    )
    public String StartDate;
    @NotBlank(message = "EndDate must not be empty")
    @Pattern(
            regexp = "^\\d{4}-\\d{2}-\\d{2}$",
            message = "EndDate must be in yyyy-MM-dd format"
    )
    public String EndDate;
    public List<String> Fields;
    public String AccountId;
}