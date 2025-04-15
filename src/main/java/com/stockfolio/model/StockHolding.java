package com.stockfolio.model;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class StockHolding {
    
    private String symbol;
    private String name;
    private int quantity;
    private double avgPrice;
    private double currentPrice;
    private Date lastUpdated;
    
    public StockHolding() {
        this.lastUpdated = new Date();
    }
    
    public StockHolding(String symbol, String name, int quantity, double avgPrice, double currentPrice) {
        this.symbol = symbol;
        this.name = name;
        this.quantity = quantity;
        this.avgPrice = avgPrice;
        this.currentPrice = currentPrice;
        this.lastUpdated = new Date();
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
    
    public int getQuantity() {
        return quantity;
    }
    
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    public double getAvgPrice() {
        return avgPrice;
    }
    
    public void setAvgPrice(double avgPrice) {
        this.avgPrice = avgPrice;
    }
    
    public double getCurrentPrice() {
        return currentPrice;
    }
    
    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
        this.lastUpdated = new Date();
    }
    
    public Date getLastUpdated() {
        return lastUpdated;
    }
    
    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
    
    public double getTotalInvestment() {
        return quantity * avgPrice;
    }
    
    public double getCurrentValue() {
        return quantity * currentPrice;
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
