"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowUpRight, Bell, ChevronDown, LogOut, Menu, Plus, Search, Settings, User } from "lucide-react"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Input } from "../../components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

import PortfolioOverview from "../../components/portfolio-overview"
import PortfolioChart from "../../components/portfolio-chart"
import StockList from "../../components/stock-list"
import { useAuth as useAuthContext } from "../context/AuthContext"

import AddStockModal from "../../components/add-stock-modal"
import { apiService } from "../../lib/api"

export default function DashboardPage() {
  const router = useRouter()
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)
  const { user } = useAuthContext()

  // New state for search query and results
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // Effect to trigger search when searchQuery changes with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSearchResults([])
        return
      }
      searchStocks(searchQuery)
    }, 300) // 300ms debounce

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const searchStocks = async (query: string) => {
    const { data, error } = await apiService.searchStocks(query)
    if (error) {
      console.error("Error searching stocks:", error)
      setSearchResults([])
    } else {
      setSearchResults(data || [])
    }
  }

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                <nav className="flex flex-col gap-4 py-4">
                  <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                   InvestInSight
                  </Link>
                  <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link href="/dashboard/portfolio" className="flex items-center gap-2 text-sm font-medium">
                    Portfolio
                  </Link>
                  <Link href="/dashboard/transactions" className="flex items-center gap-2 text-sm font-medium">
                    Transactions
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center gap-2 text-sm font-medium">
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">InvestInSight</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/dashboard" className="font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
              <Link
                href="/dashboard/portfolio"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Portfolio
              </Link>
              <Link
                href="/dashboard/transactions"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Transactions
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="relative w-full max-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search stocks..."
                className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block">{user?.name || "User"}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || "User"}</p>
          </div>
          <Button onClick={() => setIsAddStockOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>
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
        <div>
          <Tabs defaultValue="all-stocks">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all-stocks">All Stocks</TabsTrigger>
                <TabsTrigger value="gainers">Gainers</TabsTrigger>
                <TabsTrigger value="losers">Losers</TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
            <TabsContent value="all-stocks" className="mt-4">
              <StockList stocks={searchQuery.trim() === "" ? undefined : searchResults} />
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
      <AddStockModal open={isAddStockOpen} onOpenChange={setIsAddStockOpen} />
    </div>
  )
}

function useAuth(): { user: any } {
  throw new Error("Function not implemented.")
}
