"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiService } from '../lib/api'

interface AuthContextType {
  user: any
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

interface ApiResponse<T> {
  data?: T
  error?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null)

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password)
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token)
        const userResponse: ApiResponse<any> = await apiService['getCurrentUser']()
        if (userResponse.data) {
          setUser(userResponse.data)
          localStorage.setItem('user', JSON.stringify(userResponse.data))
        }
      } else if (response.error) {
        throw new Error(response.error)
      }
    } catch (error) {
      console.error('Login failed', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      apiService['getCurrentUser']().then((userResponse: ApiResponse<any>) => {
        if (userResponse.data) {
          setUser(userResponse.data)
          localStorage.setItem('user', JSON.stringify(userResponse.data))
        } else {
          setUser(null)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
