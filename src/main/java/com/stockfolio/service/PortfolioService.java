package com.stockfolio.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.stockfolio.model.Portfolio;
import com.stockfolio.model.StockHolding;
import com.stockfolio.repository.PortfolioRepository;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final StockService stockService;

    public PortfolioService(PortfolioRepository portfolioRepository, StockService stockService) {
        this.portfolioRepository = portfolioRepository;
        this.stockService = stockService;
    }

    // Changed: userId parameter type changed from ObjectId to String
    public List<Portfolio> getUserPortfolios(String userId) {
        return portfolioRepository.findByUserId(userId);
    }

    public Portfolio getPortfolio(String id) {
        return portfolioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Portfolio not found with id: " + id));
    }

    // Changed: userId parameter type changed from ObjectId to String
    public Portfolio createPortfolio(String userId, String name) {
        Optional<Portfolio> existingPortfolio = portfolioRepository.findByUserIdAndName(userId, name);
        if (existingPortfolio.isPresent()) {
            throw new RuntimeException("Portfolio with this name already exists");
        }

        Portfolio portfolio = new Portfolio(userId, name);
        return portfolioRepository.save(portfolio);
    }

    public Portfolio addStockToPortfolio(String portfolioId, String symbol, String name, int quantity, double price) {
        Portfolio portfolio = getPortfolio(portfolioId);
        
        // Check if stock already exists in portfolio
        Optional<StockHolding> existingHolding = portfolio.getHoldings().stream()
                .filter(h -> h.getSymbol().equals(symbol))
                .findFirst();
        
        if (existingHolding.isPresent()) {
            // Update existing holding
            StockHolding holding = existingHolding.get();
            int newQuantity = holding.getQuantity() + quantity;
            double newAvgPrice = ((holding.getQuantity() * holding.getAvgPrice()) + (quantity * price)) / newQuantity;
            
            holding.setQuantity(newQuantity);
            holding.setAvgPrice(newAvgPrice);
            
            // Update current price from API
            double currentPrice = stockService.getCurrentPrice(symbol);
            holding.setCurrentPrice(currentPrice);
        } else {
            // Add new holding
            double currentPrice = stockService.getCurrentPrice(symbol);
            StockHolding newHolding = new StockHolding(symbol, name, quantity, price, currentPrice);
            portfolio.addHolding(newHolding);
        }
        
        return portfolioRepository.save(portfolio);
    }

    public Portfolio updatePortfolioStockPrices(String portfolioId) {
        Portfolio portfolio = getPortfolio(portfolioId);
        
        for (StockHolding holding : portfolio.getHoldings()) {
            double currentPrice = stockService.getCurrentPrice(holding.getSymbol());
            holding.setCurrentPrice(currentPrice);
        }
        
        return portfolioRepository.save(portfolio);
    }

    public Portfolio removeStockFromPortfolio(String portfolioId, String symbol, int quantity) {
        Portfolio portfolio = getPortfolio(portfolioId);
        
        Optional<StockHolding> existingHolding = portfolio.getHoldings().stream()
                .filter(h -> h.getSymbol().equals(symbol))
                .findFirst();
        
        if (existingHolding.isEmpty()) {
            throw new RuntimeException("Stock not found in portfolio");
        }
        
        StockHolding holding = existingHolding.get();
        
        if (holding.getQuantity() < quantity) {
            throw new RuntimeException("Not enough shares to remove");
        }
        
        if (holding.getQuantity() == quantity) {
            // Remove the holding completely
            portfolio.removeHolding(symbol);
        } else {
            // Reduce the quantity
            holding.setQuantity(holding.getQuantity() - quantity);
        }
        
        return portfolioRepository.save(portfolio);
    }

    public void deletePortfolio(String portfolioId) {
        portfolioRepository.deleteById(portfolioId);
    }
}
