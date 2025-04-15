package com.stockfolio.converter;

import org.springframework.core.convert.converter.Converter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stockfolio.model.StockHolding;

public class StringToStockHoldingConverter implements Converter<String, StockHolding> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public StringToStockHoldingConverter() {
        // Enable unquoted field names and single quotes to allow lenient JSON parsing
        objectMapper.configure(com.fasterxml.jackson.core.JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        objectMapper.configure(com.fasterxml.jackson.core.JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
    }

    @Override
    public StockHolding convert(String source) {
        if (source == null || source.isEmpty()) {
            return null;
        }
        try {
            // Parse the JSON string to StockHolding object
            return objectMapper.readValue(source, StockHolding.class);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to convert String to StockHolding: " + source, e);
        }
    }
}
