"use client"

import { useEffect, useState } from "react"
import { apiService } from "../lib/api"
import { Skeleton } from "./ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

interface Stock {
  id: string
  symbol: string
  name: string
  exchange: string
  currency: string
  type: string
}

export default function StockList({ filter = "all" }: { filter?: string }) {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const fetchStocks = async () => {
      try {
        setLoading(true)
        setError(null)

        // Remove hardcoded "AAPL" query for "all" filter to fetch random stocks
        const query = filter === "INR" ? "" : filter
        
        console.log('Fetching stocks with query:', query)
        const response = await apiService.searchStocks(query)
        console.log('Full API response:', response)
        const { data, error } = response as { data?: Array<any>; error?: string }
        
        if (!mounted) return
        
        console.log('Raw data received:', data)
        
        if (error) {
          setError(error)
          return
        }

        if (!data || data.length === 0) {
          setError('No data received')
          return
        }

        const stockData = data.map((item: any, index: number): Stock => ({
          id: `${item.symbol}-${index}-${Date.now()}`,
          symbol: item.symbol,
          name: item.name,
          exchange: item.exchange,
          currency: item.currency,
          type: item.type
        }))

        console.log('Processed stock data:', stockData)
        setStocks(stockData)
      } catch (err) {
        console.error('Fetch error:', err)
        if (mounted) setError("Failed to fetch stocks")
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchStocks()
    return () => { mounted = false }
  }, [filter])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={`skeleton-${i}`} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>
  }

  if (stocks.length === 0) {
    return <div className="p-4">No stocks found</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Exchange</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock) => (
          <TableRow key={stock.id}>
            <TableCell className="font-medium">
              {stock.symbol}
            </TableCell>
            <TableCell>
              {stock.name}
            </TableCell>
            <TableCell>
              {stock.exchange}
            </TableCell>
            <TableCell>
              {stock.currency}
            </TableCell>
            <TableCell>
              {stock.type}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
