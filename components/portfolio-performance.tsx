"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const performanceData = [
  {
    metric: "Annual Return",
    value: "15.8%",
    benchmark: "12.5%",
    status: "positive",
  },
  {
    metric: "Sharpe Ratio",
    value: "1.2",
    benchmark: "1.0",
    status: "positive",
  },
  {
    metric: "Volatility",
    value: "12.5%",
    benchmark: "14.2%",
    status: "positive",
  },
  {
    metric: "Alpha",
    value: "3.2%",
    benchmark: "0%",
    status: "positive",
  },
  {
    metric: "Beta",
    value: "0.85",
    benchmark: "1.0",
    status: "neutral",
  },
  {
    metric: "Maximum Drawdown",
    value: "-8.5%",
    benchmark: "-12.3%",
    status: "positive",
  },
]

export default function PortfolioPerformance() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead className="text-right">Your Portfolio</TableHead>
            <TableHead className="text-right">Benchmark (NIFTY 50)</TableHead>
            <TableHead className="text-right">Comparison</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {performanceData.map((item) => (
            <TableRow key={item.metric}>
              <TableCell className="font-medium">{item.metric}</TableCell>
              <TableCell className="text-right">{item.value}</TableCell>
              <TableCell className="text-right">{item.benchmark}</TableCell>
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
                  {item.status === "positive"
                    ? "Outperforming"
                    : item.status === "negative"
                      ? "Underperforming"
                      : "Neutral"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
