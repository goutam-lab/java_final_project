"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Filter, Plus } from "lucide-react"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

import DashboardNav from "../../../components/dashboard-nav"
import PortfolioChart from "../../../components/portfolio-chart"
import PortfolioOverview from "../../../components/portfolio-overview"
import PortfolioPerformance from "../../../components/portfolio-performance"
import StockList from "../../../components/stock-list"
import AddStockModal from "../../../components/add-stock-modal"

import { useAuth } from "../../context/AuthContext"
import { apiService } from "../../lib/api"

interface Stock {
  symbol: string
  name: string
  exchange: string
  currency: string
  type: string
}

interface PortfolioSummary {
  totalInvestment: number
  currentValue: number
  profitLoss: number
  totalStocks: number
}

interface PortfolioHolding {
  symbol: string
  name: string
  exchange?: string
  currency?: string
  type?: string
}

interface Portfolio {
  id: string
  totalInvestment: number
  currentValue: number
  profitLoss: number
  holdings: PortfolioHolding[]
}

interface PortfolioData {
  summary: PortfolioSummary
  stocks: Stock[]
  portfolioId: string
}

export default function PortfolioPage() {
  const { user } = useAuth()
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPortfolios() {
      if (!user) {
        setPortfolioData(null)
        setLoading(false)
        return
      }
      setLoading(true)
      setError(null)
      try {
        const response = await apiService.getUserPortfolios()
        if (Array.isArray(response.data) && response.data.length > 0) {
          const portfolio: Portfolio = response.data[0]
          const summary: PortfolioSummary = {
            totalInvestment: portfolio.totalInvestment,
            currentValue: portfolio.currentValue,
            profitLoss: portfolio.profitLoss,
            totalStocks: portfolio.holdings.length,
          }
          const stocks: Stock[] = portfolio.holdings.map((h) => ({
            symbol: h.symbol,
            name: h.name,
            exchange: h.exchange || "",
            currency: h.currency || "",
            type: h.type || "",
          }))
          setPortfolioData({ summary, stocks, portfolioId: portfolio.id })
        } else {
          setPortfolioData(null)
        }
      } catch (err) {
        setError("Failed to load portfolio data.")
        setPortfolioData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolios()
  }, [user])

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Please log in to view your portfolio.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading portfolio data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>{error}</p>
      </div>
    )
  }

  if (!portfolioData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>No portfolio data available for your account.</p>
      </div>
    )
  }

  const { summary, stocks, portfolioId } = portfolioData

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Portfolio</h1>
            <p className="text-muted-foreground">Manage and track your investments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button onClick={() => setIsAddStockOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Stock
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{summary.totalInvestment.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{summary.currentValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+13.88% from investment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Profit/Loss</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-green-500"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+₹{summary.profitLoss.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+13.88% return</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalStocks}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <PortfolioChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Portfolio Overview</CardTitle>
              <CardDescription>Asset allocation across your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioOverview />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators for your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioPerformance />
          </CardContent>
        </Card>

        <div>
          <Tabs defaultValue="all-stocks">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all-stocks">All Stocks</TabsTrigger>
                <TabsTrigger value="gainers">Gainers</TabsTrigger>
                <TabsTrigger value="losers">Losers</TabsTrigger>
              </TabsList>
              <Link href="/dashboard/transactions">
                <Button variant="outline" size="sm">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  View Transactions
                </Button>
              </Link>
            </div>
            <TabsContent value="all-stocks" className="mt-4">
              <StockList />
            </TabsContent>
            <TabsContent value="gainers" className="mt-4">
              <StockList filter="gainers" />
            </TabsContent>
            <TabsContent value="losers" className="mt-4">
              <StockList filter="losers" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <AddStockModal open={isAddStockOpen} onOpenChange={setIsAddStockOpen} portfolioId={portfolioId} />
    </div>
  )
}