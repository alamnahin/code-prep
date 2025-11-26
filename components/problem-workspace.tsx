"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Loader2,
  RotateCcw,
  Zap,
  Flame,
  Target,
  Sparkles,
  Terminal,
} from "lucide-react"
import Link from "next/link"
import type { Problem, TestResult } from "@/lib/types"
import { CodeEditor } from "@/components/code-editor"
import { ProblemDescription } from "@/components/problem-description"

interface ProblemWorkspaceProps {
  problem: Problem
  userId?: string
}

const difficultyConfig = {
  easy: {
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: <Zap className="h-3 w-3" />,
  },
  medium: {
    color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: <Flame className="h-3 w-3" />,
  },
  hard: {
    color: "bg-red-500/10 text-red-400 border-red-500/30",
    icon: <Target className="h-3 w-3" />,
  },
}

export function ProblemWorkspace({ problem, userId }: ProblemWorkspaceProps) {
  const [code, setCode] = useState(problem.starter_code)
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestResult[] | null>(null)
  const [activeTab, setActiveTab] = useState("description")

  useEffect(() => {
    const savedCode = localStorage.getItem(`code-${problem.id}`)
    if (savedCode) {
      setCode(savedCode)
    }
  }, [problem.id])

  useEffect(() => {
    localStorage.setItem(`code-${problem.id}`, code)
  }, [code, problem.id])

  const runTests = async () => {
    setIsRunning(true)
    setResults(null)

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          testCases: problem.test_cases,
          problemId: problem.id,
        }),
      })

      const data = await response.json()
      setResults(data.results)
      setActiveTab("results")

      if (userId && data.results) {
        const supabase = createClient()
        const allPassed = data.results.every((r: TestResult) => r.passed)

        await supabase.from("submissions").insert({
          user_id: userId,
          problem_id: problem.id,
          code,
          language: "javascript",
          status: allPassed ? "passed" : "failed",
          results: data.results,
        })

        const { data: existingProgress } = await supabase
          .from("user_progress")
          .select("id, attempts, solved")
          .eq("user_id", userId)
          .eq("problem_id", problem.id)
          .single()

        if (existingProgress) {
          await supabase
            .from("user_progress")
            .update({
              solved: existingProgress.solved || allPassed,
              attempts: existingProgress.attempts + 1,
              last_submission_at: new Date().toISOString(),
            })
            .eq("id", existingProgress.id)
        } else {
          await supabase.from("user_progress").insert({
            user_id: userId,
            problem_id: problem.id,
            solved: allPassed,
            attempts: 1,
            last_submission_at: new Date().toISOString(),
          })
        }
      }
    } catch (error) {
      console.error("Error running tests:", error)
      setResults([{ passed: false, input: {}, expected: null, actual: null, error: "Failed to execute code" }])
      setActiveTab("results")
    } finally {
      setIsRunning(false)
    }
  }

  const allPassed = results?.every((r) => r.passed)
  const config = difficultyConfig[problem.difficulty]

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Grid background */}
      <div className="fixed inset-0 grid-pattern pointer-events-none opacity-50" />

      {/* Header */}
      <header className="relative z-10 flex h-14 items-center justify-between border-b border-border/50 px-4 glass">
        <div className="flex items-center gap-4">
          <Link
            href="/problems"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Problems</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-3">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-semibold">{problem.title}</span>
            <Badge variant="outline" className={`${config.color} border`}>
              {config.icon}
              <span className="ml-1.5 capitalize">{problem.difficulty}</span>
            </Badge>
          </div>
        </div>
        <Button
          onClick={runTests}
          disabled={isRunning}
          className="bg-primary hover:bg-primary/90 text-primary-foreground glow"
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Run Tests
            </>
          )}
        </Button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="flex w-1/2 flex-col border-r border-border/50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col">
            <div className="border-b border-border/50 px-4 pt-4">
              <TabsList className="bg-secondary/50">
                <TabsTrigger
                  value="description"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="results"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Results
                  {results && (
                    <span className={`ml-2 ${allPassed ? "text-emerald-400" : "text-red-400"}`}>
                      ({results.filter((r) => r.passed).length}/{results.length})
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="description" className="flex-1 overflow-auto p-6">
              <ProblemDescription description={problem.description} />
            </TabsContent>
            <TabsContent value="results" className="flex-1 overflow-auto p-6">
              {results ? (
                <div className="space-y-4">
                  {allPassed && (
                    <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 animate-scale-in">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                        <Sparkles className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-emerald-400">All tests passed!</div>
                        <div className="text-sm text-muted-foreground">Great job solving this problem</div>
                      </div>
                    </div>
                  )}
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`rounded-xl border p-4 animate-slide-up ${
                        result.passed ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="mb-3 flex items-center gap-2">
                        {result.passed ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                        <span className="font-medium">Test Case {index + 1}</span>
                      </div>
                      <div className="space-y-2 text-sm font-mono">
                        <div className="flex gap-2">
                          <span className="text-muted-foreground w-16">Input:</span>
                          <code className="rounded bg-secondary px-2 py-0.5 text-foreground">
                            {JSON.stringify(result.input)}
                          </code>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-muted-foreground w-16">Expected:</span>
                          <code className="rounded bg-secondary px-2 py-0.5 text-emerald-400">
                            {JSON.stringify(result.expected)}
                          </code>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-muted-foreground w-16">Output:</span>
                          <code
                            className={`rounded bg-secondary px-2 py-0.5 ${
                              result.passed ? "text-emerald-400" : "text-red-400"
                            }`}
                          >
                            {result.error || JSON.stringify(result.actual)}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Terminal className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <div className="text-muted-foreground">Run your code to see results</div>
                  <div className="text-sm text-muted-foreground/70 mt-1">Press the Run Tests button above</div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex w-1/2 flex-col">
          <div className="flex items-center justify-between border-b border-border/50 px-4 py-2 glass">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary/50" />
              <span className="text-sm font-medium">JavaScript</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCode(problem.starter_code)}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="mr-2 h-3 w-3" />
              Reset
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor value={code} onChange={setCode} />
          </div>
        </div>
      </div>
    </div>
  )
}
