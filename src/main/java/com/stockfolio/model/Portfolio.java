package com.stockfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "portfolios")
public class Portfolio {

    @Id
    private String id;
    private String userId;
    private String name;
    private Date createdAt;
    private Date updatedAt;
    private List<StockHolding> holdings = new ArrayList<>();

    public Portfolio() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public Portfolio(String userId, String name) {
        this.userId = userId;
        this.name = name;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<StockHolding> getHoldings() {
        return holdings;
    }

    public void setHoldings(List<StockHolding> holdings) {
        this.holdings = holdings;
    }

    public void addHolding(StockHolding holding) {
        this.holdings.add(holding);
        this.updatedAt = new Date();
    }

    public void removeHolding(String stockSymbol) {
        this.holdings.removeIf(holding -> holding.getSymbol().equals(stockSymbol));
        this.updatedAt = new Date();
    }

    public double getTotalInvestment() {
        return holdings.stream()
                .mapToDouble(StockHolding::getTotalInvestment)
                .sum();
    }

    public double getCurrentValue() {
        return holdings.stream()
                .mapToDouble(StockHolding::getCurrentValue)
                .sum();
    }

    public double getProfitLoss() {
        return getCurrentValue() - getTotalInvestment();
    }

    public double getProfitLossPercentage() {
        if (getTotalInvestment() == 0) {
            return 0;
        }
        return (getProfitLoss() / getTotalInvestment()) * 100;
    }
}
