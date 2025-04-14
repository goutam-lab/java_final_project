"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"

// Sample data - in a real app, this would come from your Spring Boot API
const data = {
  "1W": [
    { date: "2023-07-15", value: 125000 },
    { date: "2023-07-16", value: 127500 },
    { date: "2023-07-17", value: 126800 },
    { date: "2023-07-18", value: 128900 },
    { date: "2023-07-19", value: 130500 },
    { date: "2023-07-20", value: 132000 },
    { date: "2023-07-21", value: 135000 },
  ],
  "1M": [
    { date: "2023-06-21", value: 110000 },
    { date: "2023-06-28", value: 115000 },
    { date: "2023-07-07", value: 120000 },
    { date: "2023-07-14", value: 125000 },
    { date: "2023-07-21", value: 135000 },
  ],
  "3M": [
    { date: "2023-04-21", value: 95000 },
    { date: "2023-05-21", value: 105000 },
    { date: "2023-06-21", value: 110000 },
    { date: "2023-07-21", value: 135000 },
  ],
  "1Y": [
    { date: "2022-07-21", value: 75000 },
    { date: "2022-10-21", value: 85000 },
    { date: "2023-01-21", value: 90000 },
    { date: "2023-04-21", value: 95000 },
    { date: "2023-07-21", value: 135000 },
  ],
  ALL: [
    { date: "2021-07-21", value: 50000 },
    { date: "2022-01-21", value: 65000 },
    { date: "2022-07-21", value: 75000 },
    { date: "2023-01-21", value: 90000 },
    { date: "2023-07-21", value: 135000 },
  ],
}

const timeRanges = ["1W", "1M", "3M", "1Y", "ALL"]

export default function PortfolioChart() {
  const [timeRange, setTimeRange] = useState("1M")
  const chartData = data[timeRange as keyof typeof data]

  // Calculate growth percentage
  const startValue = chartData[0].value
  const endValue = chartData[chartData.length - 1].value
  const growthPercentage = ((endValue - startValue) / startValue) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm font-medium text-muted-foreground">{timeRange} Growth</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">₹{endValue.toLocaleString('en-IN')}</span>
            <span className={`text-sm ${growthPercentage >= 0 ? "text-green-500" : "text-red-500"}`}>
              {growthPercentage >= 0 ? "+" : ""}
              {growthPercentage.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="h-7 px-3"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickFormatter={(date) => {
                const d = new Date(date)
                return `${d.getDate()}/${d.getMonth() + 1}`
              }}
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              tickFormatter={(value) => `₹${value / 1000}k`}
              tickLine={false}
              axisLine={false}
              tickCount={6}
              domain={["dataMin - 5000", "dataMax + 5000"]}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip
              formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, "Portfolio Value"]}
              labelFormatter={(date) => {
                const d = new Date(date)
                return d.toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "6px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "none",
              }}
            />
            <Area type="monotone" dataKey="value" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
