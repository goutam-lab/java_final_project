package com.stockfolio.controller;

import com.stockfolio.model.Transaction;
import com.stockfolio.model.User;
import com.stockfolio.service.TransactionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getUserTransactions(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<Transaction> transactions = transactionService.getUserTransactions(user.getId());
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Transaction>> getUserTransactionsByType(
            Authentication authentication,
            @PathVariable String type) {
        User user = (User) authentication.getPrincipal();
        List<Transaction> transactions = transactionService.getUserTransactionsByType(user.getId(), type);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/symbol/{symbol}")
    public ResponseEntity<List<Transaction>> getUserTransactionsBySymbol(
            Authentication authentication,
            @PathVariable String symbol) {
        User user = (User) authentication.getPrincipal();
        List<Transaction> transactions = transactionService.getUserTransactionsBySymbol(user.getId(), symbol);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<Transaction>> getUserTransactionsByDateRange(
            Authentication authentication,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        User user = (User) authentication.getPrincipal();
        List<Transaction> transactions = transactionService.getUserTransactionsByDateRange(user.getId(), startDate, endDate);
        return ResponseEntity.ok(transactions);
    }

    @PostMapping
    public ResponseEntity<?> addTransaction(
            Authentication authentication,
            @RequestBody AddTransactionRequest request) {
        User user = (User) authentication.getPrincipal();
        try {
            Transaction transaction = transactionService.addTransaction(
                    user.getId(),
                    request.getPortfolioId(),
                    request.getSymbol(),
                    request.getName(),
                    request.getType(),
                    request.getQuantity(),
                    request.getPrice(),
                    request.getDate()
            );
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable String id) {
        transactionService.deleteTransaction(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Transaction deleted successfully");
        return ResponseEntity.ok(response);
    }

    public static class AddTransactionRequest {
        private String portfolioId;
        private String symbol;
        private String name;
        private String type;
        private int quantity;
        private double price;
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        private Date date;

        public String getPortfolioId() {
            return portfolioId;
        }

        public void setPortfolioId(String portfolioId) {
            this.portfolioId = portfolioId;
        }

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

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
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

        public Date getDate() {
            return date;
        }

        public void setDate(Date date) {
            this.date = date;
        }
    }
}
