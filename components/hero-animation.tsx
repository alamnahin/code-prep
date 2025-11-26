"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, XCircle, Play, Terminal } from "lucide-react"

const codeLines = [
  { type: "keyword", content: "function" },
  { type: "function", content: " twoSum" },
  { type: "plain", content: "(nums, target) {" },
  { type: "keyword", content: "  const" },
  { type: "plain", content: " map = " },
  { type: "keyword", content: "new" },
  { type: "function", content: " Map" },
  { type: "plain", content: "();" },
  { type: "keyword", content: "  for" },
  { type: "plain", content: " (" },
  { type: "keyword", content: "let" },
  { type: "plain", content: " i = " },
  { type: "number", content: "0" },
  { type: "plain", content: "; i < nums.length; i++) {" },
  { type: "keyword", content: "    const" },
  { type: "plain", content: " complement = target - nums[i];" },
  { type: "keyword", content: "    if" },
  { type: "plain", content: " (map.has(complement)) {" },
  { type: "keyword", content: "      return" },
  { type: "plain", content: " [map.get(complement), i];" },
  { type: "plain", content: "    }" },
  { type: "plain", content: "    map.set(nums[i], i);" },
  { type: "plain", content: "  }" },
  { type: "plain", content: "}" },
]

const testResults = [
  { input: "[2,7,11,15], 9", expected: "[0,1]", passed: true },
  { input: "[3,2,4], 6", expected: "[1,2]", passed: true },
  { input: "[3,3], 6", expected: "[0,1]", passed: true },
]

export function HeroAnimation() {
  const [currentLine, setCurrentLine] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [visibleResults, setVisibleResults] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= 12) {
          clearInterval(interval)
          setTimeout(() => setShowResults(true), 500)
          return prev
        }
        return prev + 1
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (showResults && visibleResults < testResults.length) {
      const timeout = setTimeout(() => {
        setVisibleResults((prev) => prev + 1)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [showResults, visibleResults])

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-3xl" />

      {/* Main container */}
      <div className="relative rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
        {/* Editor header */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-secondary/30">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center text-sm text-muted-foreground font-mono">two-sum.js</div>
          <div className="flex items-center gap-2">
            <Play className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Code area */}
        <div className="p-4 font-mono text-sm leading-6 min-h-[280px] bg-background/50">
          <div className="flex">
            {/* Line numbers */}
            <div className="pr-4 text-muted-foreground/50 select-none text-right">
              {Array.from({ length: 13 }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            {/* Code */}
            <div className="flex-1 overflow-hidden">
              <pre className="text-foreground">
                <code>
                  <span className="code-keyword">function</span>
                  <span className="code-function"> twoSum</span>
                  <span>(nums, target) {"{"}</span>
                  {currentLine >= 1 && (
                    <>
                      {"\n  "}
                      <span className="code-keyword">const</span>
                      <span> map = </span>
                      <span className="code-keyword">new</span>
                      <span className="code-function"> Map</span>
                      <span>();</span>
                    </>
                  )}
                  {currentLine >= 2 && (
                    <>
                      {"\n  "}
                      <span className="code-keyword">for</span>
                      <span> (</span>
                      <span className="code-keyword">let</span>
                      <span> i = </span>
                      <span className="code-number">0</span>
                      <span>{"; i < nums.length; i++) {"}</span>
                    </>
                  )}
                  {currentLine >= 3 && (
                    <>
                      {"\n    "}
                      <span className="code-keyword">const</span>
                      <span> complement = target - nums[i];</span>
                    </>
                  )}
                  {currentLine >= 4 && (
                    <>
                      {"\n    "}
                      <span className="code-keyword">if</span>
                      <span> (map.has(complement)) {"{"}</span>
                    </>
                  )}
                  {currentLine >= 5 && (
                    <>
                      {"\n      "}
                      <span className="code-keyword">return</span>
                      <span> [map.get(complement), i];</span>
                    </>
                  )}
                  {currentLine >= 6 && <>{"\n    }"}</>}
                  {currentLine >= 7 && (
                    <>
                      {"\n    "}
                      <span>map.set(nums[i], i);</span>
                    </>
                  )}
                  {currentLine >= 8 && <>{"\n  }"}</>}
                  {currentLine >= 9 && <>{"\n}"}</>}
                </code>
              </pre>
              {currentLine < 12 && <span className="inline-block w-2 h-5 bg-primary animate-typing ml-0.5" />}
            </div>
          </div>
        </div>

        {/* Results panel */}
        {showResults && (
          <div className="border-t border-border bg-secondary/20 p-4 animate-slide-up">
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Test Results</span>
            </div>
            <div className="space-y-2">
              {testResults.slice(0, visibleResults).map((result, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm animate-scale-in ${
                    result.passed
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {result.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="font-mono text-xs text-muted-foreground">{result.input}</span>
                  </div>
                  <span className="font-mono text-xs text-primary">{result.expected}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
