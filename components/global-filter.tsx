"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface GlobalFilterProps {
  filter: string
  setFilter: (value: string) => void
}

export function GlobalFilter({ filter, setFilter }: GlobalFilterProps) {
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="بحث..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-64 pl-8"
      />
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    </div>
  )
}

