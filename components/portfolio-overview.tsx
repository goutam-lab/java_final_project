"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "TATA", value: 35000, color: "#0088FE" },
  { name: "RELIANCE", value: 25000, color: "#00C49F" },
  { name: "INFOSYS", value: 20000, color: "#FFBB28" },
  { name: "HDFC", value: 15000, color: "#FF8042" },
  { name: "TCS", value: 30000, color: "#8884d8" },
]

export default function PortfolioOverview() {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-4">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`₹${value}`, "Value"]} labelFormatter={(name) => `${name}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        {data.map((stock) => (
          <div key={stock.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: stock.color }} />
              <span>{stock.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">₹{stock.value.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">{((stock.value / total) * 100).toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
