package com.CloudBalance.Controllers;

import com.CloudBalance.DTO.GroupByDTO;
import com.CloudBalance.DTO.GroupByDTOResponse;
import com.CloudBalance.Service.CostExplorerService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/costExplorer")
@Validated
public class CostExplorerController {


    private final CostExplorerService costExplorerService;

    public CostExplorerController(CostExplorerService costExplorerService) {
        this.costExplorerService = costExplorerService;
    }

    @GetMapping("getData")
    public ResponseEntity<List<Map<String, Object>>> getData() {
        return new ResponseEntity<>(costExplorerService.getData(), HttpStatus.OK);
    }

    @PostMapping("groupBy")
    public ResponseEntity<List<GroupByDTOResponse>> groupBy(@Valid @RequestBody GroupByDTO groupByDTO) {
        List<GroupByDTOResponse> groupByDTOResponseList = costExplorerService.groupBy(groupByDTO.getGroupByColumn(), groupByDTO.getStartDate(), groupByDTO.getEndDate());
        return new ResponseEntity<>(groupByDTOResponseList, HttpStatus.OK);
    }

    @GetMapping("getDates")
    public ResponseEntity<List<GroupByDTOResponse>> getDates() {
        List<GroupByDTOResponse> groupByDTOResponseList = costExplorerService.getDates();
        return new ResponseEntity<>(groupByDTOResponseList, HttpStatus.OK);
    }

    @PostMapping("getGroupByColumn")
    public ResponseEntity<List<String>> getGroupByColumn(@RequestParam
                                                         @NotBlank(message = "GroupByColumn must not be empty")
                                                         @Pattern(
                                                                 regexp = "^(SERVICE|INSTANCE_TYPE|REGION|ACCOUNT_ID|USAGE_TYPE|PLATFORM|USAGE_TYPE_GROUP)$",
                                                                 message = "Invalid GroupByColumn"
                                                         ) String GroupByColumn) {
        List<String> list = costExplorerService.getGroupByColumn(GroupByColumn);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("getGroupByColumnByAccountId")
    public ResponseEntity<List<GroupByDTOResponse>> getGroupByColumnByAccountId(@RequestBody GroupByDTO groupByDTO) {
        List<GroupByDTOResponse> list = costExplorerService.getGroupByColumnByAccountId(groupByDTO.getGroupByColumn(), groupByDTO.getStartDate(), groupByDTO.getEndDate(), groupByDTO.getAccountId());
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("getGroupByColumnField")
    public ResponseEntity<List<GroupByDTOResponse>> getGroupByColumnField(@Valid @RequestBody GroupByDTO groupByDTO) {

        List<GroupByDTOResponse> groupByDTOResponseList = costExplorerService.getGroupByColumnField(groupByDTO.getGroupByColumn(), groupByDTO.getStartDate(), groupByDTO.getEndDate(), groupByDTO.getFields());
        return new ResponseEntity<>(groupByDTOResponseList, HttpStatus.OK);
    }

    @PostMapping("getGroupByColumnFieldByAccountId")
    public ResponseEntity<List<GroupByDTOResponse>> getGroupByColumnFieldByAccountId(@Valid @RequestBody GroupByDTO groupByDTO) {

        List<GroupByDTOResponse> groupByDTOResponseList = costExplorerService.getGroupByColumnFieldByAccountId(groupByDTO.getGroupByColumn(), groupByDTO.getStartDate(), groupByDTO.getEndDate(), groupByDTO.getFields(), groupByDTO.getAccountId());
        return new ResponseEntity<>(groupByDTOResponseList, HttpStatus.OK);
    }
}
