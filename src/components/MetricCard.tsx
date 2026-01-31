import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react"

interface MetricCardProps {
    title: string
    value: string | number
    description?: string
    trend?: {
        value: number
        label: string
        direction: "up" | "down" | "neutral"
    }
}

export function MetricCard({ title, value, description, trend }: MetricCardProps) {
    return (
        <Card className="hover:border-primary/50 transition-colors duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {trend && (
                    <div className={`flex items-center text-xs px-2 py-1 rounded-full ${trend.direction === 'up' ? 'bg-green-500/10 text-green-500' :
                            trend.direction === 'down' ? 'bg-red-500/10 text-red-500' :
                                'bg-muted text-muted-foreground'
                        }`}>
                        {trend.direction === 'up' && <ArrowUpIcon className="mr-1 h-3 w-3" />}
                        {trend.direction === 'down' && <ArrowDownIcon className="mr-1 h-3 w-3" />}
                        {trend.direction === 'neutral' && <MinusIcon className="mr-1 h-3 w-3" />}
                        {trend.value}%
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
