package com.arcade.manager.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
@ComponentScan(
        basePackages = {
                "com.arcade.manager.controllers",
                "com.arcade.manager.services",
                "com.arcade.manager.mappers",
        })
@MapperScan("com.arcade.manager.mappers")
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
