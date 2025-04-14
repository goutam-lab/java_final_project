package com.stockfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.stockfolio.service.StockService;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/search")
    public ResponseEntity<JsonNode> searchStocks(@RequestParam String query) {
        JsonNode results = stockService.searchStocks(query);
        // Recursively unwrap nested "data" fields until an array is found
        JsonNode dataNode = results;
        while (dataNode.has("data") && dataNode.get("data").isContainerNode()) {
            dataNode = dataNode.get("data");
        }
        return ResponseEntity.ok(dataNode);
    }

    @GetMapping("/{symbol}/price")
    public ResponseEntity<Double> getStockPrice(@PathVariable String symbol) {
        double price = stockService.getCurrentPrice(symbol);
        return ResponseEntity.ok(price);
    }

    @GetMapping("/{symbol}/details")
    public ResponseEntity<JsonNode> getStockDetails(@PathVariable String symbol) {
        JsonNode details = stockService.getStockDetails(symbol);
        return ResponseEntity.ok(details);
    }

    @GetMapping("/{symbol}/time-series")
    public ResponseEntity<JsonNode> getTimeSeriesData(
            @PathVariable String symbol,
            @RequestParam(defaultValue = "1day") String interval,
            @RequestParam(defaultValue = "30") String outputsize) {
        JsonNode data = stockService.getTimeSeriesData(symbol, interval, outputsize);
        return ResponseEntity.ok(data);
    }
}
