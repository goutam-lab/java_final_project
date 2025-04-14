"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface AddTransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddTransactionModal({ open, onOpenChange }: AddTransactionModalProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [transactionType, setTransactionType] = useState<string>("buy")
  const [symbol, setSymbol] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    if (!symbol || !quantity || !price) return

    setIsLoading(true)

    // In a real app, this would call your Spring Boot API to add the transaction
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Adding transaction:", {
        date,
        type: transactionType,
        symbol,
        quantity: Number.parseInt(quantity),
        price: Number.parseFloat(price),
        total: Number.parseInt(quantity) * Number.parseFloat(price),
      })

      // Reset form and close modal
      resetForm()
      onOpenChange(false)
    } catch (error) {
      console.error("Error adding transaction:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setDate(new Date())
    setTransactionType("buy")
    setSymbol("")
    setQuantity("")
    setPrice("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Record a new stock transaction in your portfolio</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transaction-date" className="text-right">
              Date
            </Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="transaction-date"
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transaction-type" className="text-right">
              Type
            </Label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger id="transaction-type" className="col-span-3">
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Symbol
            </Label>
            <Input
              id="symbol"
              placeholder="e.g., TATA"
              className="col-span-3"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="Number of shares"
              className="col-span-3"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price (₹)
            </Label>
            <Input
              id="price"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Price per share"
              className="col-span-3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          {quantity && price && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Total</Label>
              <div className="col-span-3 rounded-md bg-muted p-2 font-medium">
                ₹{(Number.parseFloat(price || "0") * Number.parseInt(quantity || "0")).toLocaleString()}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !symbol || !quantity || !price}>
            {isLoading ? "Adding..." : "Add Transaction"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
