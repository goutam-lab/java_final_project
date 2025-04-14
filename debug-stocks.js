// Simple API debugger
const { apiService } = require('./app/lib/api');

(async () => {
  try {
    console.log("Fetching stock data...");
    const { data, error } = await apiService.searchStocks("");
    
    if (error) {
      console.error("API Error:", error);
      return;
    }

    console.log("Raw API Data:", JSON.stringify(data, null, 2));
    
    if (data?.data?.data) {
      const firstStock = data.data.data[0];
      console.log("\nFirst Stock:", firstStock);
      console.log("\nHas values array:", !!firstStock.values);
      if (firstStock.values) {
        console.log("\nFirst Value:", firstStock.values[0]);
      }
    }
  } catch (err) {
    console.error("Debug Error:", err);
  }
})();
