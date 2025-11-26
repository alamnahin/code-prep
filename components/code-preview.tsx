"use client"

import { useState, useEffect } from "react"

export function CodePreview() {
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const tabs = ["JavaScript", "Python", "TypeScript"]

  const codeExamples = [
    `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], 
      currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}`,
    `def max_sub_array(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i],
            current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum`,
    `function maxSubArray(nums: number[]): number {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], 
      currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}`,
  ]

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-3xl" />

      <div className="relative rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
        {/* Tab bar */}
        <div className="flex items-center border-b border-border bg-secondary/30">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === i
                  ? "text-foreground border-b-2 border-primary bg-background/50"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Code */}
        <div className="p-4 font-mono text-sm bg-background/50">
          <pre className="text-foreground overflow-x-auto">
            <code>{codeExamples[activeTab]}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
