import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '@/lib/api';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const { data, error } = await apiService.getCurrentUser();
    if (data) {
      setUser(data);
    } else {
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await apiService.login(email, password);
    if (data?.token) {
      localStorage.setItem('token', data.token);
      fetchUser();
    } else {
      throw new Error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
