"use client"

import ReactMarkdown from "react-markdown"

interface ProblemDescriptionProps {
  description: string
}

export function ProblemDescription({ description }: ProblemDescriptionProps) {
  return (
    <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          code: ({ children, className }) => {
            const isInline = !className
            if (isInline) {
              return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{children}</code>
            }
            return (
              <pre className="rounded-lg bg-zinc-950 p-4">
                <code className="font-mono text-sm text-zinc-100">{children}</code>
              </pre>
            )
          },
        }}
      >
        {description}
      </ReactMarkdown>
    </div>
  )
}
