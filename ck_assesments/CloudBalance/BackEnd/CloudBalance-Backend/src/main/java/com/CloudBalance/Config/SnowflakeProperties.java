package com.CloudBalance.Config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "snowflake")
public class SnowflakeProperties {
    private String url;
    private String warehouse;
    private String database;
    private String schema;
    private String role;
    private String username;
    private String password;
    private String driverClassName;
}
