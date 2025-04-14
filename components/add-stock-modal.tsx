"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AddStockModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddStockModal({ open, onOpenChange }: AddStockModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedStock, setSelectedStock] = useState<any | null>(null)
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Mock search function - in a real app, this would call your Spring Boot API
  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const results = [
        { symbol: "TATA", name: "Tata Motors Ltd", currentPrice: 45.75 },
        { symbol: "TATASTEEL", name: "Tata Steel Ltd", currentPrice: 120.5 },
        { symbol: "TCS", name: "Tata Consultancy Services Ltd", currentPrice: 3400.0 },
      ].filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      setSearchResults(results)
      setIsLoading(false)
    }, 1000)
  }

  const handleSelectStock = (stock: any) => {
    setSelectedStock(stock)
    setPrice(stock.currentPrice.toString())
  }

  const handleAddStock = () => {
    if (!selectedStock || !quantity || !price) return

    // In a real app, this would call your Spring Boot API to add the stock
    console.log("Adding stock:", {
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      quantity: Number.parseInt(quantity),
      price: Number.parseFloat(price),
    })

    // Reset form and close modal
    setSearchQuery("")
    setSearchResults([])
    setSelectedStock(null)
    setQuantity("")
    setPrice("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Stock to Portfolio</DialogTitle>
          <DialogDescription>Search for a stock and add it to your portfolio</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="search">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search Stock</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>
          <TabsContent value="search" className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="search">Search Stock</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Enter stock symbol or name"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>
              <div className="mt-auto">
                <Button onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>

            {searchResults.length > 0 && (
              <div className="rounded-md border">
                <div className="p-2 font-medium">Search Results</div>
                <div className="divide-y">
                  {searchResults.map((stock) => (
                    <div
                      key={stock.symbol}
                      className={`flex cursor-pointer items-center justify-between p-2 hover:bg-muted ${
                        selectedStock?.symbol === stock.symbol ? "bg-muted" : ""
                      }`}
                      onClick={() => handleSelectStock(stock)}
                    >
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">{stock.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹{stock.currentPrice.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedStock && (
              <div className="space-y-4 rounded-md border p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{selectedStock.symbol}</div>
                    <div className="text-sm text-muted-foreground">{selectedStock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{selectedStock.currentPrice.toFixed(2)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Share (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                {quantity && price && (
                  <div className="rounded-md bg-muted p-2 text-right">
                    <div className="text-sm text-muted-foreground">Total Value</div>
                    <div className="font-bold">
                      ₹{(Number.parseFloat(price) * Number.parseInt(quantity || "0")).toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="manual" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="symbol">Stock Symbol</Label>
                  <Input id="symbol" placeholder="e.g., TATA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Stock Name</Label>
                  <Input id="name" placeholder="e.g., Tata Motors Ltd" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manual-quantity">Quantity</Label>
                  <Input id="manual-quantity" type="number" min="1" placeholder="Enter quantity" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manual-price">Price per Share (₹)</Label>
                  <Input id="manual-price" type="number" min="0.01" step="0.01" placeholder="Enter price" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddStock} disabled={!selectedStock || !quantity || !price}>
            Add to Portfolio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
