package com.stockfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class StockfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(StockfolioApplication.class, args);
    }
}
