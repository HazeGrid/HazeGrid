"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchLocationProps {
  onSearch: (location: string) => void
}

export function SearchLocation({ onSearch }: SearchLocationProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setQuery("") // Clear the input after search
    }
  }

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search any city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-white/20 border-none placeholder:text-white/70 text-white"
        />
        <Button type="submit" variant="outline" size="icon" className="bg-white/20 border-none hover:bg-white/30">
          <Search className="h-4 w-4 text-white" />
          <span className="sr-only">Search</span>
        </Button>
      </form>
    </div>
  )
}
