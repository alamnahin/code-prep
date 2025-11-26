"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newValue = value.substring(0, start) + "  " + value.substring(end)
      onChange(newValue)
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2
          textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  const lines = value.split("\n")

  return (
    <div className="relative flex h-full bg-[#0d1117]">
      {/* Line numbers */}
      <div className="flex flex-col border-r border-border/30 bg-[#0d1117] px-4 py-4 text-right font-mono text-sm text-muted-foreground/50 select-none">
        {lines.map((_, i) => (
          <div key={i} className="leading-6 hover:text-muted-foreground transition-colors">
            {i + 1}
          </div>
        ))}
      </div>
      {/* Editor */}
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full resize-none bg-transparent p-4 font-mono text-sm text-foreground leading-6 outline-none placeholder:text-muted-foreground/50 caret-primary"
          placeholder="Write your code here..."
          spellCheck={false}
        />
        {/* Subtle glow effect at cursor */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
      </div>
    </div>
  )
}
