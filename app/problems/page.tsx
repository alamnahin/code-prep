import { createClient } from "@/lib/supabase/server"
import { ProblemsGrid } from "@/components/problems-grid"
import { Code2 } from "lucide-react"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"

export default async function ProblemsPage() {
  const supabase = await createClient()

  const { data: problems } = await supabase
    .from("problems")
    .select("id, title, slug, difficulty")
    .order("difficulty", { ascending: true })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userProgress: Record<string, boolean> = {}
  if (user) {
    const { data: progress } = await supabase.from("user_progress").select("problem_id, solved").eq("user_id", user.id)

    if (progress) {
      userProgress = progress.reduce(
        (acc, p) => {
          acc[p.problem_id] = p.solved
          return acc
        },
        {} as Record<string, boolean>,
      )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Grid background */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      <div className="fixed inset-0 radial-overlay pointer-events-none" />

      <header className="relative z-10 border-b border-border/50 glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Code2 className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 blur-lg bg-primary/30 group-hover:bg-primary/50 transition-colors" />
            </div>
            <span className="text-xl font-bold">CodePrep</span>
          </Link>
          <UserNav user={user} />
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10 animate-slide-up">
          <h1 className="text-4xl font-bold mb-3">
            Problem <span className="gradient-text">Library</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Master algorithms and data structures with our curated collection
          </p>
        </div>
        <ProblemsGrid problems={problems || []} userProgress={userProgress} />
      </main>
    </div>
  )
}
