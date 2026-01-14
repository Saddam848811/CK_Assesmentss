package com.CloudBalance.Serviceimpl;

import com.CloudBalance.Config.SnowFlakeJDBC;
import com.CloudBalance.DTO.GroupByDTOResponse;
import com.CloudBalance.Service.CostExplorerService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
public class CostExplorerServiceImpl implements CostExplorerService {

    JdbcTemplate jdbcTemplate = SnowFlakeJDBC.getJdbcTemplate();

    NamedParameterJdbcTemplate namedJdbcTemplate =
            new NamedParameterJdbcTemplate(SnowFlakeJDBC.getJdbcTemplate());

    @Override
    public List<Map<String, Object>> getData() {

        String query = "SELECT ID, BILL_DATE, SERVICE, INSTANCE_TYPE, ACCOUNT_ID, USAGE_TYPE, " +
                "PLATFORM, REGION, PURCHASE_OPTION, USAGE_TYPE_GROUP, API_OPERATION, RESOURCE, " +
                "AVAILABILITY_ZONE, TENANCY, LEGAL_ENTITY, BILLING_ENTITY, COST " +
                "FROM SNOWFLAKE_LEARNING_DB.AWS_CUR.COSTREPORT";

        List<Map<String, Object>> rows = jdbcTemplate.queryForList(query);
        return rows;
    }

    @Override
    public List<GroupByDTOResponse> groupBy(String groupByColumn,
                                            String startDate,
                                            String endDate) {

        String sql =
                "SELECT BILL_DATE, " + groupByColumn + ", SUM(COST) AS TOTAL_COST " +
                        "FROM SNOWFLAKE_LEARNING_DB.AWS_CUR.COSTREPORT " +
                        "WHERE CAST(BILL_DATE AS DATE) BETWEEN :startDate AND :endDate " +
                        "GROUP BY BILL_DATE, " + groupByColumn + " " +
                        "ORDER BY BILL_DATE, TOTAL_COST";

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("startDate", startDate)
                .addValue("endDate", endDate);

        List<GroupByDTOResponse> result =
                namedJdbcTemplate.query(sql, params, (rs, rowNum) -> {
                    GroupByDTOResponse dto = new GroupByDTOResponse();
                     dto.setBILL_DATE(rs.getString("BILL_DATE"));
                     dto.setGroupByColumn(rs.getString(groupByColumn));
                     dto.setCOST(rs.getDouble("TOTAL_COST"));
                     return dto;
                });
        return result;
    }

    @Override
    public List<GroupByDTOResponse> getDates() {

        String sql =
                "SELECT DISTINCT BILL_DATE " +
                        "FROM SNOWFLAKE_LEARNING_DB.AWS_CUR.COSTREPORT " +
                        "ORDER BY BILL_DATE";

        List<GroupByDTOResponse> dates = new ArrayList<>();

        jdbcTemplate.query(sql, rs -> {
            GroupByDTOResponse dto = new GroupByDTOResponse();
            dto.setBILL_DATE(rs.getString("BILL_DATE"));
            dates.add(dto);
        });
        return dates;
    }

    @Override
    public List<String> getGroupByColumn(String groupByColumn) {

        String sql = "SELECT DISTINCT " + groupByColumn +
                " FROM SNOWFLAKE_LEARNING_DB.AWS_CUR.COSTREPORT" +
                " ORDER BY " + groupByColumn;

        List<String> result = new ArrayList<>();

        namedJdbcTemplate.query(sql, rs -> {
            result.add(rs.getString(groupByColumn));
        });
        return result;

    }

    @Override
    public List<GroupByDTOResponse> getGroupByColumnByAccountId(
            String groupByColumn,
            String startDate,
            String endDate
            ,String AccountId) {

        if (AccountId == null){
            throw new IllegalArgumentException("AccountId must not be empty");
        }

        try{
            groupByColumn = groupByColumn.toUpperCase();
        } catch (NullPointerException e) {
            throw new NullPointerException("invalid request parameter");
        }
        String sql =
                "SELECT ACCOUNT_ID, " +
                        "BILL_DATE, " +
                        groupByColumn + " AS GROUP_KEY, " +
                        "SUM(COST) AS TOTAL_COST " +
                        "FROM SNOWFLAKE_LEARNING_DB.AWS_CUR.COSTREPORT " +
                        "WHERE CAST(BILL_DATE AS DATE) BETWEEN :startDate AND :endDate " +
                        "AND ACCOUNT_ID = :accountId " +
                        "GROUP BY ACCOUNT_ID, BILL_DATE, " + groupByColumn + " " +
                        "ORDER BY BILL_DATE, TOTAL_COST";

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("startDate", startDate)
                .addValue("endDate", endDate)
                .addValue("accountId", AccountId);

        return namedJdbcTemplate.query(sql, params, (rs, rowNum) -> {
            GroupByDTOResponse dto = new GroupByDTOResponse();
            dto.setBILL_DATE(rs.getString("BILL_DATE"));
            dto.setGroupByColumn(rs.getString("GROUP_KEY"));
            dto.setCOST(rs.getDouble("TOTAL_COST"));
            dto.setAccountId(rs.getString("ACCOUNT_ID"));
            return dto;
        });
    }

    @Override
    public List<GroupByDTOResponse> getGroupByColumnField(
            String groupByColumn,
            String startDate,
            String endDate,
            List<String> fieldValue) {

        if (fieldValue == null || fieldValue.isEmpty()) {
            throw new IllegalArgumentException("Field must not be empty");
        }
        try{
            groupByColumn = groupByColumn.toUpperCase();
        } catch (NullPointerException e) {
            throw new NullPointerException("invalid request parameter");
        }
        String sql =
                "SELECT BILL_DATE, " + groupByColumn + " AS GROUP_KEY, " +
                        "SUM(COST) AS TOTAL_COST " +
                        "FROM SNOWFLAKE_LEARNING_DB.AWS_CUR.COSTREPORT " +
                        "WHERE CAST(BILL_DATE AS DATE) BETWEEN :startDate AND :endDate " +
                        "AND " + groupByColumn + " IN (:fieldValue) " +
                        "GROUP BY BILL_DATE, " + groupByColumn + " " +
                        "ORDER BY BILL_DATE, TOTAL_COST";

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("startDate", startDate)
                .addValue("endDate", endDate)
                .addValue("fieldValue", fieldValue);

        return namedJdbcTemplate.query(sql, params, (rs, rowNum) -> {
            GroupByDTOResponse dto = new GroupByDTOResponse();
            dto.setBILL_DATE(rs.getString("BILL_DATE"));
            dto.setGroupByColumn(rs.getString("GROUP_KEY"));
            dto.setCOST(rs.getDouble("TOTAL_COST"));
            return dto;
        });
    }

    @Override
    public List<GroupByDTOResponse> getGroupByColumnFieldByAccountId(
            String groupByColumn,
            String startDate,
            String endDate,
            List<String> fieldValue
            ,String AccountId) {

        if (fieldValue == null || fieldValue.isEmpty()) {
            throw new IllegalArgumentException("Field must not be empty");
        }

        if (AccountId == null){
            throw new IllegalArgumentException("AccountId must not be empty");
        }
        try{
            groupByColumn = groupByColumn.toUpperCase();
        } catch (NullPointerException e) {
            throw new NullPointerException("invalid request parameter");
        }

        String sql =
                "SELECT ACCOUNT_ID, " +
                        "BILL_DATE, " +
                        groupByColumn + " AS GROUP_KEY, " +
                        "SUM(COST) AS TOTAL_COST " +
                        "FROM SNOWFLAKE_LEARNING_DB.AWS_CUR.COSTREPORT " +
                        "WHERE CAST(BILL_DATE AS DATE) BETWEEN :startDate AND :endDate " +
                        "AND ACCOUNT_ID = :accountId " +
                        "AND " + groupByColumn + " IN (:fieldValue) " +
                        "GROUP BY ACCOUNT_ID, BILL_DATE, " + groupByColumn + " " +
                        "ORDER BY BILL_DATE, TOTAL_COST";

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("startDate", startDate)
                .addValue("endDate", endDate)
                .addValue("fieldValue", fieldValue)
                .addValue("accountId", AccountId);

        return namedJdbcTemplate.query(sql, params, (rs, rowNum) -> {
            GroupByDTOResponse dto = new GroupByDTOResponse();
            dto.setBILL_DATE(rs.getString("BILL_DATE"));
            dto.setGroupByColumn(rs.getString("GROUP_KEY"));
            dto.setCOST(rs.getDouble("TOTAL_COST"));
            dto.setAccountId(rs.getString("ACCOUNT_ID"));
            return dto;
        });
    }
}
