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
import StockListWrapper from "@/components/StockListWrapper"
import AddStockModal from "@/components/add-stock-modal"

export default function DashboardPage() {
  const router = useRouter()
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header and other components remain unchanged */}
      
      {/* Update the Tabs section */}
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
            <StockListWrapper />
          </TabsContent>
          <TabsContent value="gainers" className="mt-4">
            <StockListWrapper filter="gainers" />
          </TabsContent>
          <TabsContent value="losers" className="mt-4">
            <StockListWrapper filter="losers" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
