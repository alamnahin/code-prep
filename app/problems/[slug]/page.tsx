import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ProblemWorkspace } from "@/components/problem-workspace"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProblemPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: problem } = await supabase.from("problems").select("*").eq("slug", slug).single()

  if (!problem) {
    notFound()
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <ProblemWorkspace problem={problem} userId={user?.id} />
}
