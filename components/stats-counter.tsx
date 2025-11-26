"use client"

import { useEffect, useState } from "react"

const stats = [
  { label: "Problems", value: 12, suffix: "+" },
  { label: "Test Cases", value: 50, suffix: "+" },
  { label: "Uptime", value: 99.9, suffix: "%" },
]

export function StatsCounter() {
  const [mounted, setMounted] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    setMounted(true)
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic

      setCounts(stats.map((stat) => Math.round(stat.value * eased * 10) / 10))

      if (step >= steps) {
        clearInterval(timer)
        setCounts(stats.map((stat) => stat.value))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center gap-8 pt-4 animate-slide-up stagger-5">
      {stats.map((stat, i) => (
        <div key={stat.label} className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {counts[i]}
            {stat.suffix}
          </div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
