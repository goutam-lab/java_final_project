"use client"

import type React from "react"

import { useState } from "react"
import { ArrowDown, ArrowUp, Calendar, Download, Filter, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import DashboardNav from "@/components/dashboard-nav"
import AddTransactionModal from "@/components/add-transaction-modal"

// Sample transaction data
const transactions = [
  {
    id: 1,
    date: "2023-07-15",
    type: "buy",
    symbol: "TATA",
    name: "Tata Motors Ltd",
    quantity: 500,
    price: 30.5,
    total: 15250,
  },
  {
    id: 2,
    date: "2023-07-16",
    type: "buy",
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    quantity: 50,
    price: 2500,
    total: 125000,
  },
  {
    id: 3,
    date: "2023-07-18",
    type: "sell",
    symbol: "TATA",
    name: "Tata Motors Ltd",
    quantity: 200,
    price: 32.75,
    total: 6550,
  },
  {
    id: 4,
    date: "2023-07-20",
    type: "buy",
    symbol: "INFOSYS",
    name: "Infosys Ltd",
    quantity: 100,
    price: 1000,
    total: 100000,
  },
  {
    id: 5,
    date: "2023-07-25",
    type: "buy",
    symbol: "TATA",
    name: "Tata Motors Ltd",
    quantity: 700,
    price: 31.5,
    total: 22050,
  },
]

export default function TransactionsPage() {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    if (!query) {
      setFilteredTransactions(transactions)
      return
    }

    const filtered = transactions.filter(
      (transaction) =>
        transaction.symbol.toLowerCase().includes(query) || transaction.name.toLowerCase().includes(query),
    )

    setFilteredTransactions(filtered)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">View and manage your stock transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setIsAddTransactionOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
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
              <div className="text-2xl font-bold">{transactions.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Buy Transactions</CardTitle>
              <ArrowDown className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactions.filter((t) => t.type === "buy").length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sell Transactions</CardTitle>
              <ArrowUp className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactions.filter((t) => t.type === "sell").length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
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
              <div className="text-2xl font-bold">
                ₹
                {transactions
                  .filter((t) => t.type === "buy")
                  .reduce((sum, t) => sum + t.total, 0)
                  .toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View all your stock transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative w-full sm:w-[300px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search transactions..."
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Calendar className="h-4 w-4" />
                    <span className="sr-only">Date Range</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Transaction Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="buy">Buy Only</SelectItem>
                      <SelectItem value="sell">Sell Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="highest">Highest Value</SelectItem>
                      <SelectItem value="lowest">Lowest Value</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Transactions</TabsTrigger>
                  <TabsTrigger value="buy">Buy</TabsTrigger>
                  <TabsTrigger value="sell">Sell</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Price (₹)</TableHead>
                          <TableHead className="text-right">Total (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>
                              {new Date(transaction.date).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  transaction.type === "buy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                              >
                                {transaction.type === "buy" ? "Buy" : "Sell"}
                              </span>
                            </TableCell>
                            <TableCell className="font-medium">{transaction.symbol}</TableCell>
                            <TableCell>{transaction.name}</TableCell>
                            <TableCell className="text-right">{transaction.quantity}</TableCell>
                            <TableCell className="text-right">{transaction.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{transaction.total.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="buy" className="mt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Price (₹)</TableHead>
                          <TableHead className="text-right">Total (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransactions
                          .filter((t) => t.type === "buy")
                          .map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell>
                                {new Date(transaction.date).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Buy
                                </span>
                              </TableCell>
                              <TableCell className="font-medium">{transaction.symbol}</TableCell>
                              <TableCell>{transaction.name}</TableCell>
                              <TableCell className="text-right">{transaction.quantity}</TableCell>
                              <TableCell className="text-right">{transaction.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right">{transaction.total.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="sell" className="mt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Price (₹)</TableHead>
                          <TableHead className="text-right">Total (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransactions
                          .filter((t) => t.type === "sell")
                          .map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell>
                                {new Date(transaction.date).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                  Sell
                                </span>
                              </TableCell>
                              <TableCell className="font-medium">{transaction.symbol}</TableCell>
                              <TableCell>{transaction.name}</TableCell>
                              <TableCell className="text-right">{transaction.quantity}</TableCell>
                              <TableCell className="text-right">{transaction.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right">{transaction.total.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </main>
      <AddTransactionModal open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen} />
    </div>
  )
}
