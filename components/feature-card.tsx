"use client"

import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  gradient: string
  delay: number
}

export function FeatureCard({ icon, title, description, gradient, delay }: FeatureCardProps) {
  return (
    <div
      className={`group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 animate-slide-up stagger-${delay}`}
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
      />

      <div className="relative">
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white mb-4`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
