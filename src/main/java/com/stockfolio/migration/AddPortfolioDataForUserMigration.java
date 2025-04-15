package com.stockfolio.migration;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.stockfolio.model.Portfolio;
import com.stockfolio.model.StockHolding;
import com.stockfolio.repository.PortfolioRepository;

/**
 * Migration to add different portfolio data for user with ID "67fcd91d05c8a9443c4506ff".
 * Run this once to add the portfolio data.
 */
@Component
public class AddPortfolioDataForUserMigration implements CommandLineRunner {

    private static final String USER_ID = "67fcd91d05c8a9443c4506ff";
    private static final String PORTFOLIO_NAME = "User67fcd91d Portfolio";

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if portfolio already exists for user
        List<Portfolio> existingPortfolios = portfolioRepository.findByUserId(USER_ID);
        Portfolio portfolio = existingPortfolios.stream()
                .filter(p -> PORTFOLIO_NAME.equals(p.getName()))
                .findFirst()
                .orElseGet(() -> new Portfolio(USER_ID, PORTFOLIO_NAME));

        List<StockHolding> holdings = Arrays.asList(
            new StockHolding("NFLX", "Netflix Inc.", 12, 500.0, 480.0),  // Loss
            new StockHolding("NVDA", "NVIDIA Corporation", 25, 600.0, 650.0), // Profit
            new StockHolding("BABA", "Alibaba Group", 30, 150.0, 140.0) // Loss
        );

        portfolio.setHoldings(holdings);

        portfolioRepository.save(portfolio);

        System.out.println("Added or updated portfolio with different data for user " + USER_ID);
    }
}
