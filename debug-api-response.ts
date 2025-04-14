import { apiService } from './app/lib/api';

async function testApiResponse() {
  console.log("Testing API response...");
  const response = await apiService.searchStocks("");
  console.log("API Response:", response);
  console.log("Response Data:", response.data?.data);
  console.log("First Stock:", response.data?.data?.[0]);
  console.log("First Stock Values:", response.data?.data?.[0]?.values);
}

testApiResponse().catch(console.error);
