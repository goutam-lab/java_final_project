package com.stockfolio.service;

import com.stockfolio.model.Transaction;
import com.stockfolio.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final PortfolioService portfolioService;

    public TransactionService(TransactionRepository transactionRepository, PortfolioService portfolioService) {
        this.transactionRepository = transactionRepository;
        this.portfolioService = portfolioService;
    }

    public List<Transaction> getUserTransactions(String userId) {
        return transactionRepository.findByUserId(userId);
    }

    public List<Transaction> getUserTransactionsByType(String userId, String type) {
        return transactionRepository.findByUserIdAndType(userId, type);
    }

    public List<Transaction> getUserTransactionsBySymbol(String userId, String symbol) {
        return transactionRepository.findByUserIdAndSymbol(userId, symbol);
    }

    public List<Transaction> getUserTransactionsByDateRange(String userId, Date startDate, Date endDate) {
        return transactionRepository.findByUserIdAndDateBetween(userId, startDate, endDate);
    }

    public Transaction addTransaction(String userId, String portfolioId, String symbol, String name, String type, int quantity, double price, Date date) {
        Transaction transaction = new Transaction(userId, portfolioId, symbol, name, type, quantity, price, date);
        
        // Update portfolio based on transaction type
        if ("buy".equalsIgnoreCase(type)) {
            portfolioService.addStockToPortfolio(portfolioId, symbol, name, quantity, price);
        } else if ("sell".equalsIgnoreCase(type)) {
            portfolioService.removeStockFromPortfolio(portfolioId, symbol, quantity);
        }
        
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(String transactionId) {
        // Note: This doesn't update the portfolio. In a real app, you'd need to handle this.
        transactionRepository.deleteById(transactionId);
    }
}
