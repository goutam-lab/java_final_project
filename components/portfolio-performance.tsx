"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const performanceData = [
  {
    stock: "Tata",
    purchasePrice: "₹3500",
    currentPrice: "₹4000",
    profitLoss: "+₹500",
    status: "positive",
  },
  {
    stock: "Reliance",
    purchasePrice: "₹2500",
    currentPrice: "₹2700",
    profitLoss: "+₹200",
    status: "positive",
  },
  {
    stock: "Infosys",
    purchasePrice: "₹1500",
    currentPrice: "₹1400",
    profitLoss: "-₹100",
    status: "negative",
  },
  {
    stock: "HDFC",
    purchasePrice: "₹3200",
    currentPrice: "₹3300",
    profitLoss: "+₹100",
    status: "positive",
  },
  {
    stock: "TCS",
    purchasePrice: "₹2800",
    currentPrice: "₹2800",
    profitLoss: "₹0",
    status: "neutral",
  },
]

export default function PortfolioPerformance() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stocks</TableHead>
            <TableHead className="text-right">Purchase Price</TableHead>
            <TableHead className="text-right">Current Price</TableHead>
            <TableHead className="text-right">Profit/Loss</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {performanceData.map((item) => (
            <TableRow key={item.stock}>
              <TableCell className="font-medium">{item.stock}</TableCell>
              <TableCell className="text-right">{item.purchasePrice}</TableCell>
              <TableCell className="text-right">{item.currentPrice}</TableCell>
              <TableCell className="text-right">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.status === "positive"
                      ? "bg-green-100 text-green-800"
                      : item.status === "negative"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.profitLoss === "₹0"
                    ? "Neutral"
                    : item.status === "positive"
                    ? "Profit"
                    : "Loss"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
