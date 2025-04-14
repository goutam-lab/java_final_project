"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowUpRight, Bell, ChevronDown, LogOut, Menu, Plus, Search, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import PortfolioOverview from "@/components/portfolio-overview"
import PortfolioChart from "@/components/portfolio-chart"
import StockList from "@/components/stock-list"
import AddStockModal from "@/components/add-stock-modal"

export default function DashboardPage() {
  const router = useRouter()
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)

  const handleLogout = () => {
    // In a real app, this would call your Spring Boot logout endpoint
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
                    StockFolio
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
              <span className="font-bold">StockFolio</span>
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
                  <span className="hidden sm:inline-block">John Doe</span>
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
            <p className="text-muted-foreground">Welcome back, John Doe</p>
          </div>
          <Button onClick={() => setIsAddStockOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>
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
              <div className="text-2xl font-bold">₹125,000</div>
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
              <div className="text-2xl font-bold">₹142,350</div>
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
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+₹17,350</div>
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
              <div className="text-2xl font-bold">8</div>
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
      <AddStockModal open={isAddStockOpen} onOpenChange={setIsAddStockOpen} />
    </div>
  )
}
