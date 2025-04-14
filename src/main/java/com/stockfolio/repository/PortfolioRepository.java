package com.stockfolio.repository;

import com.stockfolio.model.Portfolio;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PortfolioRepository extends MongoRepository<Portfolio, String> {
    List<Portfolio> findByUserId(String userId);
    Optional<Portfolio> findByUserIdAndName(String userId, String name);
}
