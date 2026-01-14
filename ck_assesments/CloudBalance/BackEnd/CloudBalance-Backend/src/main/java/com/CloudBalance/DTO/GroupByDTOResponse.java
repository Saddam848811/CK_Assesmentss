package com.CloudBalance.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Component
public class GroupByDTOResponse {

    public String BILL_DATE;
    public String GroupByColumn;
    public double COST;
    public String AccountId;
}
