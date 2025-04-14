package com.stockfolio.controller;

import com.stockfolio.model.Portfolio;
import com.stockfolio.model.User;
import com.stockfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping
    public ResponseEntity<List<Portfolio>> getUserPortfolios(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<Portfolio> portfolios = portfolioService.getUserPortfolios(user.getId());
        return ResponseEntity.ok(portfolios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Portfolio> getPortfolio(@PathVariable String id) {
        Portfolio portfolio = portfolioService.getPortfolio(id);
        return ResponseEntity.ok(portfolio);
    }

    @PostMapping
    public ResponseEntity<?> createPortfolio(Authentication authentication, @RequestBody CreatePortfolioRequest request) {
        User user = (User) authentication.getPrincipal();
        try {
            Portfolio portfolio = portfolioService.createPortfolio(user.getId(), request.getName());
            return ResponseEntity.ok(portfolio);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/{id}/stocks")
    public ResponseEntity<?> addStockToPortfolio(
            @PathVariable String id,
            @RequestBody AddStockRequest request) {
        try {
            Portfolio portfolio = portfolioService.addStockToPortfolio(
                    id,
                    request.getSymbol(),
                    request.getName(),
                    request.getQuantity(),
                    request.getPrice()
            );
            return ResponseEntity.ok(portfolio);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}/stocks/{symbol}")
    public ResponseEntity<?> removeStockFromPortfolio(
            @PathVariable String id,
            @PathVariable String symbol,
            @RequestParam int quantity) {
        try {
            Portfolio portfolio = portfolioService.removeStockFromPortfolio(id, symbol, quantity);
            return ResponseEntity.ok(portfolio);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/refresh")
    public ResponseEntity<Portfolio> updatePortfolioStockPrices(@PathVariable String id) {
        Portfolio portfolio = portfolioService.updatePortfolioStockPrices(id);
        return ResponseEntity.ok(portfolio);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePortfolio(@PathVariable String id) {
        portfolioService.deletePortfolio(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Portfolio deleted successfully");
        return ResponseEntity.ok(response);
    }

    public static class CreatePortfolioRequest {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class AddStockRequest {
        private String symbol;
        private String name;
        private int quantity;
        private double price;

        public String getSymbol() {
            return symbol;
        }

        public void setSymbol(String symbol) {
            this.symbol = symbol;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }
}
