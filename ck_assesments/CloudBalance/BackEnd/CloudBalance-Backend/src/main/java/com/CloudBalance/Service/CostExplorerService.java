package com.CloudBalance.Service;

import com.CloudBalance.DTO.GroupByDTOResponse;

import java.util.List;
import java.util.Map;

public interface CostExplorerService {

    List<Map<String, Object>> getData();
    List<GroupByDTOResponse> groupBy(String GroupByColumn, String StartDate, String EndDate);
    List<GroupByDTOResponse> getDates();
    List<String> getGroupByColumn(String groupByColumn);
    List<GroupByDTOResponse> getGroupByColumnByAccountId(String groupByColumn, String startDate, String endDate,String AccountId);
    List<GroupByDTOResponse> getGroupByColumnField(String groupByColumn, String startDate, String endDate,List<String> fieldValue);
    List<GroupByDTOResponse> getGroupByColumnFieldByAccountId(String groupByColumn, String startDate, String endDate,List<String> Field ,String AccountId);

}
