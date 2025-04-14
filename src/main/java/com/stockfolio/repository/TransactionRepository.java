package com.stockfolio.repository;

import com.stockfolio.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByUserId(String userId);
    List<Transaction> findByUserIdAndSymbol(String userId, String symbol);
    List<Transaction> findByUserIdAndType(String userId, String type);
    List<Transaction> findByUserIdAndDateBetween(String userId, Date startDate, Date endDate);
    List<Transaction> findByPortfolioId(String portfolioId);
}
