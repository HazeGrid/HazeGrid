import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherCardProps {
  title: string
  value: string
  icon: ReactNode
}

export function WeatherCard({ title, value, icon }: WeatherCardProps) {
  return (
    <Card className="bg-white/10 border-none backdrop-blur-sm">
      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="text-xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  )
}
