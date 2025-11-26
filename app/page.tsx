import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, Terminal, Trophy, Zap, ArrowRight, Sparkles, BarChart3, Timer } from "lucide-react"
import { HeroAnimation } from "@/components/hero-animation"
import { StatsCounter } from "@/components/stats-counter"
import { FeatureCard } from "@/components/feature-card"
import { CodePreview } from "@/components/code-preview"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      <div className="fixed inset-0 radial-overlay pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Code2 className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 blur-lg bg-primary/30 group-hover:bg-primary/50 transition-colors" />
            </div>
            <span className="text-xl font-bold">CodePrep</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/problems">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Problems
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Login
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="animate-slide-up stagger-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <Sparkles className="h-4 w-4" />
                <span>New: AI-powered hints now available</span>
              </div>
            </div>

            <h1 className="text-5xl font-bold tracking-tight lg:text-6xl animate-slide-up stagger-2">
              Master Your <span className="gradient-text">Coding Interviews</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl animate-slide-up stagger-3">
              Practice real interview problems, run code instantly, and track your progress. Built for developers who
              want to land their dream job.
            </p>

            <div className="flex flex-wrap items-center gap-4 animate-slide-up stagger-4">
              <Link href="/problems">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow group">
                  Start Practicing
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button size="lg" variant="outline" className="border-border hover:bg-secondary bg-transparent">
                  Create Free Account
                </Button>
              </Link>
            </div>

            <StatsCounter />
          </div>

          <div className="relative animate-slide-up stagger-5">
            <HeroAnimation />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 border-t border-border/50 bg-card/30 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete platform designed to help you prepare for technical interviews at top companies
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Terminal className="h-6 w-6" />}
              title="Real-time Execution"
              description="Run your code instantly with our lightning-fast execution engine. See results in milliseconds."
              gradient="from-cyan-500 to-blue-500"
              delay={1}
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Track Progress"
              description="Monitor your improvement with detailed statistics, streaks, and personalized insights."
              gradient="from-emerald-500 to-teal-500"
              delay={2}
            />
            <FeatureCard
              icon={<Trophy className="h-6 w-6" />}
              title="Interview Ready"
              description="Practice curated problems from actual interviews at Google, Meta, Amazon, and more."
              gradient="from-amber-500 to-orange-500"
              delay={3}
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Instant Feedback"
              description="Get immediate feedback on your solutions with comprehensive test cases and edge cases."
              gradient="from-violet-500 to-purple-500"
              delay={4}
            />
            <FeatureCard
              icon={<Timer className="h-6 w-6" />}
              title="Timed Sessions"
              description="Practice under pressure with timed coding sessions that simulate real interviews."
              gradient="from-rose-500 to-pink-500"
              delay={5}
            />
            <FeatureCard
              icon={<Code2 className="h-6 w-6" />}
              title="Multiple Languages"
              description="Write solutions in JavaScript, Python, Java, C++, and more popular languages."
              gradient="from-sky-500 to-indigo-500"
              delay={6}
            />
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Write code like you mean it</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our modern code editor comes with syntax highlighting, auto-completion, and a distraction-free
                interface. Focus on what matters - solving problems.
              </p>
              <ul className="space-y-3">
                {[
                  "Syntax highlighting for all major languages",
                  "Auto-save your progress as you code",
                  "Dark theme optimized for long sessions",
                  "Keyboard shortcuts for power users",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/problems">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Try the Editor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CodePreview />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 border-t border-border/50 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to ace your interviews?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of developers who have improved their skills and landed jobs at top tech companies.
          </p>
          <Link href="/auth/sign-up">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow">
              Start Free Today
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <span>CodePrep</span>
          </div>
          <p>Built for developers, by developers.</p>
        </div>
      </footer>
    </div>
  )
}
