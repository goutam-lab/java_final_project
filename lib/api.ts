// API Service for Stockfolio Frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

interface StockData {
  symbol: string;
  name: string;
  exchange?: string;
  currency?: string;
  type?: string;
  price?: number;
  change?: number;
  change_percent?: number;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      console.log(`Fetching API: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { error: errorData.message || `Request failed with status ${response.status}` };
      }

      const data = await response.json();
      console.log('API response data:', data);
      return { data };
    } catch (error) {
      console.error('API Request Failed:', error);
      return { error: 'Network error occurred' };
    }
  }

  // Stock Data API
  async searchStocks(query: string): Promise<{ data?: StockData[], error?: string }> {
    const response = await this.request<any>(`/stocks/search?query=${encodeURIComponent(query)}`);
    
    if (response.error) {
      return { error: response.error };
    }

    if (!response.data) {
      console.warn('No data field in API response');
      return { error: 'No data received' };
    }

    // Handle response.data as array or nested data array
    let stocksData: any[] = [];
    if (Array.isArray(response.data)) {
      stocksData = response.data;
    } else if (Array.isArray(response.data.data)) {
      stocksData = response.data.data;
    }

    if (stocksData.length === 0) {
      console.warn('Empty stocks data array received');
    }

    return {
      data: stocksData.map((item: any) => ({
        symbol: item.symbol || 'N/A',
        name: item.name || item.instrument_name || 'N/A',
        exchange: item.exchange || 'N/A',
        currency: item.currency || 'N/A',
        type: item.type || item.instrument_type || 'N/A',
        price: item.price || 0,
        change: item.change || 0,
        change_percent: item.change_percent || item.changePercent || 0
      }))
    };
  }

  // Other methods unchanged...
}

export const apiService = new ApiService();
