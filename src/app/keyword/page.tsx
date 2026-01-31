"use client"

import { useSearchParams } from "next/navigation"
import { MetricCard } from "@/components/MetricCard"
import { VolumeChart } from "@/components/VolumeChart"
import { MOCK_DATA } from "@/lib/mockData"
import { SearchInput } from "@/components/SearchInput"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"

import { useState, useEffect } from "react"

function KeywordDashboard() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || "seo tools"
    const [data, setData] = useState(MOCK_DATA)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const res = await fetch(`/api/keyword?q=${encodeURIComponent(query)}`)
                if (res.ok) {
                    const result = await res.json()
                    setData(result)
                }
            } catch (error) {
                console.error("Failed to fetch data", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [query])

    if (loading) {
        return (
            <div className="min-h-screen bg-background p-8 flex items-center justify-center">
                <div className="text-white">Loading data for &quot;{query}&quot;...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background p-8">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">SEO Tool</h1>
                <div className="w-1/3">
                    <SearchInput />
                </div>
            </div>

            <div className="space-y-8 max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex justify-between items-end border-b border-border/50 pb-6">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">{query}</h2>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Updated: Just now</span>
                            <span>Database: United States</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline">Export</Button>
                        <Button>Add to List</Button>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <MetricCard
                        title="Search Volume"
                        value={data.overview.volume}
                        description="Average monthly searches"
                        trend={{ value: 12, label: "YoY", direction: "up" }}
                    />
                    <MetricCard
                        title="Keyword Difficulty"
                        value={data.overview.difficulty}
                        description="Hard to rank"
                        trend={{ value: 5, label: "vs last month", direction: "up" }}
                    />
                    <MetricCard
                        title="CPC"
                        value={data.overview.cpc}
                        description="Cost Per Click"
                        trend={{ value: 0, label: "Stable", direction: "neutral" }}
                    />
                    <MetricCard
                        title="Global Volume"
                        value={data.overview.globalVolume}
                        description="Total worldwide searches"
                    />
                </div>

                {/* Charts & Content Area */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <VolumeChart data={data.trend} />

                    <Card className="col-span-3 glass-card">
                        <CardHeader>
                            <CardTitle>Keyword Ideas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.related.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">{item.keyword}</div>
                                        <div className="flex gap-4 text-sm text-muted-foreground">
                                            <span className="w-16 text-right">{item.volume}</span>
                                            <span className={`w-8 text-center rounded ${item.kd > 60 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>{item.kd}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" className="w-full mt-4 text-muted-foreground">View all keywords</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default function KeywordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
            <KeywordDashboard />
        </Suspense>
    )
}
