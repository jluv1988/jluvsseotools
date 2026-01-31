"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VolumeChartProps {
    data: { month: string; volume: number }[]
}

export function VolumeChart({ data }: VolumeChartProps) {
    return (
        <Card className="col-span-4 glass-card">
            <CardHeader>
                <CardTitle>Volume History</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis
                            dataKey="month"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e1e20', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="volume"
                            stroke="#fb923c" /* Secondary/Orange color */
                            strokeWidth={3}
                            activeDot={{ r: 8, fill: "#fb923c" }}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
