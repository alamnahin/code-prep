import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Code2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin")
  }

  const { data: problems } = await supabase.from("problems").select("*").order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      {/* Grid background */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      <div className="fixed inset-0 radial-overlay pointer-events-none" />

      <header className="relative z-10 border-b border-border/50 glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Code2 className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 blur-lg bg-primary/30" />
              </div>
              <span className="text-xl font-bold">CodePrep</span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium">Admin</span>
          </div>
          <Link
            href="/problems"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Problems
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-12">
        <AdminDashboard problems={problems || []} />
      </main>
    </div>
  )
}
