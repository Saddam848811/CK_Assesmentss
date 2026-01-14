package com.CloudBalance.Config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.jdbc.core.JdbcTemplate;


public class SnowFlakeJDBC {

    private static final String SNOWFLAKE_URL = "jdbc:snowflake://jgwazim-wu66490.snowflakecomputing.com/";
    private static final String WAREHOUSE = "snowflake_learning_wh";
    private static final String DB = "snowflake_learning_db";
    private static final String SCHEMA = "AWS_CUR";
    private static final String ROLE = "cost_db_readonly";
    private static final String USERNAME = "cost_read_user";
    private static final String PASSWORD = "aws_cost_report_read_only";
    private static final String DRIVER_CLASS = "net.snowflake.client.jdbc.SnowflakeDriver";

    private static JdbcTemplate jdbcTemplate;

    public static JdbcTemplate getJdbcTemplate() {
        if (jdbcTemplate == null) {
            HikariDataSource ds = new HikariDataSource();
            ds.setJdbcUrl(SNOWFLAKE_URL
                    + "?warehouse=" + WAREHOUSE
                    + "&db=" + DB
                    + "&schema=" + SCHEMA
                    + "&role=" + ROLE
            );
            ds.setUsername(USERNAME);
            ds.setPassword(PASSWORD);
            ds.setDriverClassName(DRIVER_CLASS);
            ds.setMaximumPoolSize(5);

            jdbcTemplate = new JdbcTemplate(ds);
        }
        return jdbcTemplate;
    }
}
