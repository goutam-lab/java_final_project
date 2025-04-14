package com.stockfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "transactions")
public class Transaction {
    
    @Id
    private String id;
    private String userId;
    private String portfolioId;
    private String symbol;
    private String name;
    private String type; // "buy" or "sell"
    private int quantity;
    private double price;
    private double total;
    private Date date;
    private Date createdAt;
    
    public Transaction() {
        this.createdAt = new Date();
    }
    
    public Transaction(String userId, String portfolioId, String symbol, String name, String type, int quantity, double price, Date date) {
        this.userId = userId;
        this.portfolioId = portfolioId;
        this.symbol = symbol;
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.price = price;
        this.total = quantity * price;
        this.date = date;
        this.createdAt = new Date();
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
        this.total = this.quantity * this.price;
    }
    
    public double getPrice() {
        return price;
    }
    
    public void setPrice(double price) {
        this.price = price;
        this.total = this.quantity * this.price;
    }
    
    public double getTotal() {
        return total;
    }
    
    public void setTotal(double total) {
        this.total = total;
    }
    
    public Date getDate() {
        return date;
    }
    
    public void setDate(Date date) {
        this.date = date;
    }
    
    public Date getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
