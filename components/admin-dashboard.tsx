"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Zap, Flame, Target, FileCode, TestTube } from "lucide-react"
import type { Problem } from "@/lib/types"
import { useRouter } from "next/navigation"

interface AdminDashboardProps {
  problems: Problem[]
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

export function AdminDashboard({ problems: initialProblems }: AdminDashboardProps) {
  const [problems, setProblems] = useState(initialProblems)
  const [isOpen, setIsOpen] = useState(false)
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    difficulty: "easy" as "easy" | "medium" | "hard",
    starter_code: "",
    test_cases: "[]",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      difficulty: "easy",
      starter_code: "",
      test_cases: "[]",
    })
    setEditingProblem(null)
  }

  const openEditDialog = (problem: Problem) => {
    setEditingProblem(problem)
    setFormData({
      title: problem.title,
      slug: problem.slug,
      description: problem.description,
      difficulty: problem.difficulty,
      starter_code: problem.starter_code,
      test_cases: JSON.stringify(problem.test_cases, null, 2),
    })
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    try {
      const problemData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        difficulty: formData.difficulty,
        starter_code: formData.starter_code,
        test_cases: JSON.parse(formData.test_cases),
      }

      if (editingProblem) {
        const { data, error } = await supabase
          .from("problems")
          .update(problemData)
          .eq("id", editingProblem.id)
          .select()
          .single()

        if (error) throw error
        setProblems(problems.map((p) => (p.id === editingProblem.id ? data : p)))
      } else {
        const { data, error } = await supabase.from("problems").insert(problemData).select().single()

        if (error) throw error
        setProblems([data, ...problems])
      }

      setIsOpen(false)
      resetForm()
      router.refresh()
    } catch (error) {
      console.error("Error saving problem:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this problem?")) return

    const supabase = createClient()
    const { error } = await supabase.from("problems").delete().eq("id", id)

    if (!error) {
      setProblems(problems.filter((p) => p.id !== id))
      router.refresh()
    }
  }

  // Stats
  const stats = {
    total: problems.length,
    easy: problems.filter((p) => p.difficulty === "easy").length,
    medium: problems.filter((p) => p.difficulty === "medium").length,
    hard: problems.filter((p) => p.difficulty === "hard").length,
    testCases: problems.reduce((acc, p) => acc + p.test_cases.length, 0),
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Manage coding problems and test cases</p>
        </div>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow">
              <Plus className="mr-2 h-4 w-4" />
              Add Problem
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-xl">{editingProblem ? "Edit Problem" : "Create New Problem"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="two-sum"
                    required
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: "easy" | "medium" | "hard") => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Markdown)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={8}
                  className="font-mono text-sm bg-secondary/50 border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="starter_code">Starter Code</Label>
                <Textarea
                  id="starter_code"
                  value={formData.starter_code}
                  onChange={(e) => setFormData({ ...formData, starter_code: e.target.value })}
                  rows={6}
                  className="font-mono text-sm bg-secondary/50 border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="test_cases">Test Cases (JSON)</Label>
                <Textarea
                  id="test_cases"
                  value={formData.test_cases}
                  onChange={(e) => setFormData({ ...formData, test_cases: e.target.value })}
                  rows={6}
                  className="font-mono text-sm bg-secondary/50 border-border"
                  placeholder='[{"input": {"nums": [1,2,3]}, "expected": 6}]'
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-border">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : editingProblem ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 animate-slide-up stagger-1">
        <div className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <FileCode className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Total</span>
          </div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-muted-foreground">Easy</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">{stats.easy}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 hover:border-amber-500/50 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-muted-foreground">Medium</span>
          </div>
          <div className="text-2xl font-bold text-amber-400">{stats.medium}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 hover:border-red-500/50 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-red-400" />
            <span className="text-sm text-muted-foreground">Hard</span>
          </div>
          <div className="text-2xl font-bold text-red-400">{stats.hard}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <TestTube className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Test Cases</span>
          </div>
          <div className="text-2xl font-bold">{stats.testCases}</div>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-3">
        {problems.map((problem, index) => {
          const config = difficultyConfig[problem.difficulty]
          return (
            <div
              key={problem.id}
              className="group rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-all animate-slide-up"
              style={{ animationDelay: `${(index + 2) * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <FileCode className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">{problem.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="outline" className={`${config.color} border`}>
                        {config.icon}
                        <span className="ml-1.5 capitalize">{problem.difficulty}</span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">{problem.test_cases.length} test cases</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(problem)}
                    className="hover:bg-secondary hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(problem.id)}
                    className="text-red-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}

        {problems.length === 0 && (
          <div className="py-16 text-center">
            <FileCode className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <div className="text-muted-foreground">No problems yet. Create your first problem to get started.</div>
          </div>
        )}
      </div>
    </div>
  )
}
