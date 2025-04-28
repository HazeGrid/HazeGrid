"use client"
import { Button } from "@/components/ui/button"

interface UnitToggleProps {
  onUnitChange: (unit: "imperial" | "metric") => void
  currentUnit: "imperial" | "metric"
}

export function UnitToggle({ onUnitChange, currentUnit }: UnitToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={currentUnit === "imperial" ? "secondary" : "outline"}
        size="sm"
        onClick={() => onUnitChange("imperial")}
        className={`${
          currentUnit === "imperial"
            ? "bg-white/30 text-white"
            : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
        } border-none`}
      >
        °F
      </Button>
      <Button
        variant={currentUnit === "metric" ? "secondary" : "outline"}
        size="sm"
        onClick={() => onUnitChange("metric")}
        className={`${
          currentUnit === "metric"
            ? "bg-white/30 text-white"
            : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
        } border-none`}
      >
        °C
      </Button>
    </div>
  )
}
