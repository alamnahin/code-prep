"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User } from "@supabase/supabase-js"
import { LogOut, Settings, UserIcon, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserNavProps {
  user: User | null
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/login">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Login
          </Button>
        </Link>
        <Link href="/auth/sign-up">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow">Sign Up</Button>
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-secondary">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan-400">
            <UserIcon className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline text-sm">{user.email?.split("@")[0]}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card border-border">
        <DropdownMenuItem asChild>
          <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            Admin Panel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center gap-2 text-red-400 focus:text-red-400 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
