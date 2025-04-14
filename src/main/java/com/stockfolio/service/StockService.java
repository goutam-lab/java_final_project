package com.stockfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class StockService {
    private static final Logger log = LoggerFactory.getLogger(StockService.class);

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${twelvedata.api.host}")
    private String apiHost;

    @Value("${twelvedata.api.key}")
    private String apiKey;

    public StockService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public JsonNode searchStocks(String query) {
        try {
            if (query == null || query.trim().isEmpty()) {
                log.info("Empty query received, returning empty data array");
                return objectMapper.createObjectNode().putArray("data");
            }

            String url = String.format("https://%s/symbol_search?symbol=%s&apikey=%s", 
                apiHost, query, apiKey);
            
            log.info("Making API request to: {}", url.replace(apiKey, "******"));
            
            ResponseEntity<String> apiResponse = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                String.class
            );

            log.debug("API response status: {}", apiResponse.getStatusCode());
            
            String responseBody = apiResponse.getBody();
            log.debug("Raw API response: {}", responseBody);
            
            // Fix malformed JSON if needed
            responseBody = responseBody.replace("\"symbol\":\"", "\"symbol\": \"")
                                     .replace("\"instrument_name\":\"", "\"instrument_name\": \"");
            
            JsonNode result = objectMapper.readTree(responseBody);
            log.debug("Parsed JSON response: {}", result);

            // Return the original parsed JSON result directly
            return result;
        } catch (Exception e) {
            log.error("Error processing response: {}", e.getMessage());
            return objectMapper.createObjectNode().put("error", "Failed to fetch stocks");
        }
    }

    public double getCurrentPrice(String symbol) {
        try {
            String url = String.format("https://%s/quote?symbol=%s&apikey=%s", 
                apiHost, symbol, apiKey);
            
            log.info("Fetching current price for: {}", symbol);
            
            ResponseEntity<String> apiResponse = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                String.class
            );

            JsonNode result = objectMapper.readTree(apiResponse.getBody());
            return result.path("price").asDouble(0.0);
        } catch (Exception e) {
            log.error("Error fetching current price: {}", e.getMessage());
            return 0.0;
        }
    }

    public JsonNode getStockDetails(String symbol) {
        try {
            String url = String.format("https://%s/profile?symbol=%s&apikey=%s", 
                apiHost, symbol, apiKey);
            
            log.info("Fetching details for: {}", symbol);
            
            ResponseEntity<String> apiResponse = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                String.class
            );

            return objectMapper.readTree(apiResponse.getBody());
        } catch (Exception e) {
            log.error("Error fetching stock details: {}", e.getMessage());
            return objectMapper.createObjectNode().put("error", "Failed to fetch details");
        }
    }

    public JsonNode getTimeSeriesData(String symbol, String interval, String outputsize) {
        try {
            String url = String.format("https://%s/time_series?symbol=%s&interval=%s&outputsize=%s&apikey=%s", 
                apiHost, symbol, interval, outputsize, apiKey);
            
            log.info("Fetching time series for: {}", symbol);
            
            ResponseEntity<String> apiResponse = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                String.class
            );

            return objectMapper.readTree(apiResponse.getBody());
        } catch (Exception e) {
            log.error("Error fetching time series data: {}", e.getMessage());
            return objectMapper.createObjectNode().put("error", "Failed to fetch time series");
        }
    }
}
