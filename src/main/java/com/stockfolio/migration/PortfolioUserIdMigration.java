package com.stockfolio.migration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.stockfolio.model.Portfolio;
import com.stockfolio.repository.PortfolioRepository;

/**
 * Migration to fix portfolio userId fields to match user ids.
 * Run this once to update portfolio documents.
 */
@Component
public class PortfolioUserIdMigration implements CommandLineRunner {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Override
    public void run(String... args) throws Exception {
        List<Portfolio> portfolios = portfolioRepository.findAll();
        for (Portfolio portfolio : portfolios) {
            String userId = portfolio.getUserId();
            // Add your logic here to fix userId if needed
            // For example, trim spaces or convert formats
            String fixedUserId = userId.trim(); // example fix
            if (!userId.equals(fixedUserId)) {
                portfolio.setUserId(fixedUserId);
                portfolioRepository.save(portfolio);
                System.out.println("Fixed userId for portfolio: " + portfolio.getId());
            }
        }
        System.out.println("Portfolio userId migration completed.");
    }
}
