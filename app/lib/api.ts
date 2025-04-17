const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { error: errorData.message || 'Request failed' };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: 'Network error occurred' };
    }
  }

  // Auth Services
  async login(email: string, password: string) {
    return this.request<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async updateUser(data: { name: string; email: string }): Promise<void> {
    return fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Failed to update user: ${text}`);
        });
      }
    });
  }

  async register(name: string, email: string, password: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async getCurrentUser() {
    return this.request('/users/me');
  }

  // Portfolio API
  async getUserPortfolios() {
    return this.request('/portfolios');
  }

  async createPortfolio(name: string) {
    return this.request('/portfolios', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  // Stock API
  async searchStocks(query: string) {
    return this.request<{
      data: Array<{
        symbol: string;
        name: string;
        exchange: string;
        currency: string;
        type: string;
        price?: number;
        change?: number;
        change_percent?: number;
      }>;
    }>(`/stocks/search?query=${encodeURIComponent(query)}`);
  }
  
}

export const apiService = new ApiService();