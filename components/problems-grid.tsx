"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, ChevronRight, Flame, Target, Zap } from "lucide-react"

interface Problem {
  id: string
  title: string
  slug: string
  difficulty: "easy" | "medium" | "hard"
}

interface ProblemsGridProps {
  problems: Problem[]
  userProgress: Record<string, boolean>
}

const difficultyConfig = {
  easy: {
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: <Zap className="h-3 w-3" />,
    glow: "group-hover:shadow-emerald-500/20",
  },
  medium: {
    color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: <Flame className="h-3 w-3" />,
    glow: "group-hover:shadow-amber-500/20",
  },
  hard: {
    color: "bg-red-500/10 text-red-400 border-red-500/30",
    icon: <Target className="h-3 w-3" />,
    glow: "group-hover:shadow-red-500/20",
  },
}

export function ProblemsGrid({ problems, userProgress }: ProblemsGridProps) {
  const [filter, setFilter] = useState<"all" | "easy" | "medium" | "hard">("all")

  const filteredProblems = filter === "all" ? problems : problems.filter((p) => p.difficulty === filter)

  const stats = {
    total: problems.length,
    solved: Object.values(userProgress).filter(Boolean).length,
    easy: problems.filter((p) => p.difficulty === "easy").length,
    medium: problems.filter((p) => p.difficulty === "medium").length,
    hard: problems.filter((p) => p.difficulty === "hard").length,
  }

  const solvedPercentage = stats.total > 0 ? (stats.solved / stats.total) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* Progress Card */}
        <div className="col-span-2 md:col-span-1 rounded-xl border border-border bg-card p-5 relative overflow-hidden group hover:border-primary/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="text-3xl font-bold text-foreground">
              {stats.solved}
              <span className="text-muted-foreground text-lg">/{stats.total}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">Solved</div>
            <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500"
                style={{ width: `${solvedPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Difficulty Cards */}
        {(["easy", "medium", "hard"] as const).map((difficulty) => {
          const config = difficultyConfig[difficulty]
          const count = stats[difficulty]
          return (
            <div
              key={difficulty}
              className={`rounded-xl border border-border bg-card p-5 relative overflow-hidden group hover:border-primary/50 transition-all ${config.glow} hover:shadow-lg`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`${config.color} p-1 rounded`}>{config.icon}</span>
                <span className="text-sm text-muted-foreground capitalize">{difficulty}</span>
              </div>
              <div className="text-2xl font-bold">{count}</div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "easy", "medium", "hard"] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
            className={filter === f ? "bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== "all" && <span className="ml-1.5 text-xs opacity-70">{stats[f as keyof typeof stats]}</span>}
          </Button>
        ))}
      </div>

      {/* Problem List */}
      <div className="space-y-2">
        {filteredProblems.map((problem, index) => {
          const config = difficultyConfig[problem.difficulty]
          const isSolved = userProgress[problem.id]

          return (
            <Link key={problem.id} href={`/problems/${problem.slug}`}>
              <div
                className={`group relative rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/50 hover:bg-card/80 ${config.glow} hover:shadow-lg animate-slide-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        isSolved ? "bg-emerald-500/20" : "bg-secondary"
                      }`}
                    >
                      {isSolved ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {problem.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`${config.color} border`}>
                      {config.icon}
                      <span className="ml-1.5 capitalize">{problem.difficulty}</span>
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filteredProblems.length === 0 && (
        <div className="py-16 text-center">
          <div className="text-muted-foreground">No problems found matching your filter.</div>
        </div>
      )}
    </div>
  )
}
