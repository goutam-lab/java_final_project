"use client"

import dynamic from 'next/dynamic'
import { Skeleton } from "./ui/skeleton"

const StockList = dynamic(() => import('./stock-list'), {
  ssr: false,
  loading: () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
})

export default function StockListWrapper() {
  return <StockList />
}
