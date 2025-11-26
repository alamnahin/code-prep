import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="h-8 w-8 text-emerald-500" />
            <span className="text-xl font-bold">CodePrep</span>
          </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <Mail className="h-6 w-6 text-emerald-500" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>We&apos;ve sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            <p>Please check your email and click the confirmation link to activate your account.</p>
            <p className="mt-4">
              <Link href="/auth/login" className="text-emerald-600 underline underline-offset-4">
                Back to login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
