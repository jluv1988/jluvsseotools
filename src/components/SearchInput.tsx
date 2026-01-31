"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

import { useRouter } from "next/navigation"

export function SearchInput({ onSearch }: { onSearch?: (query: string) => void }) {
    const [query, setQuery] = React.useState("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (onSearch) {
            onSearch(query)
        } else if (query) {
            // Use router.push for client-side navigation
            router.push(`/keyword?q=${encodeURIComponent(query)}`)
        }
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSearch}
            className="flex w-full max-w-2xl items-center space-x-2 relative"
        >
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Enter keyword (e.g., 'seo tools')"
                    className="pl-10 h-14 text-lg border-2 focus-visible:ring-offset-0 focus-visible:border-primary transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.1)] focus:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <Button type="submit" size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/20">
                Analyze
            </Button>
        </motion.form>
    )
}
