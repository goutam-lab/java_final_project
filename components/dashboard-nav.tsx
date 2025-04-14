"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
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

export default function DashboardNav() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    // In a real app, this would call your Spring Boot logout endpoint
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <nav className="flex flex-col gap-4 py-4">
                <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                  StockFolio
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/dashboard/portfolio" className="flex items-center gap-2 text-sm font-medium">
                  Portfolio
                </Link>
                <Link href="/dashboard/transactions" className="flex items-center gap-2 text-sm font-medium">
                  Transactions
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-2 text-sm font-medium">
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">StockFolio</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/dashboard"
              className={`font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/portfolio"
              className={`font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard/portfolio" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Portfolio
            </Link>
            <Link
              href="/dashboard/transactions"
              className={`font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard/transactions" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Transactions
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="relative w-full max-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search stocks..."
              className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[300px]"
            />
          </div>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline-block">John Doe</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
