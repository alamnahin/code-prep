import { type NextRequest, NextResponse } from "next/server"
import type { TestCase, TestResult } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { code, testCases } = await request.json()

    const results: TestResult[] = []

    for (const testCase of testCases as TestCase[]) {
      try {
        // Create a function from the user's code
        const functionMatch = code.match(/function\s+(\w+)\s*\(/)
        if (!functionMatch) {
          results.push({
            passed: false,
            input: testCase.input,
            expected: testCase.expected,
            actual: null,
            error: "Could not find a function definition",
          })
          continue
        }

        const functionName = functionMatch[1]

        // Prepare the arguments from test case input
        const args = Object.values(testCase.input)

        // Create and execute the function
        const wrappedCode = `
          ${code}
          return ${functionName}(...args);
        `

        const fn = new Function("args", wrappedCode)
        const actual = fn(args)

        // Compare results (deep equality)
        const passed = JSON.stringify(actual) === JSON.stringify(testCase.expected)

        results.push({
          passed,
          input: testCase.input,
          expected: testCase.expected,
          actual,
        })
      } catch (error) {
        results.push({
          passed: false,
          input: testCase.input,
          expected: testCase.expected,
          actual: null,
          error: error instanceof Error ? error.message : "Runtime error",
        })
      }
    }

    return NextResponse.json({ results })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to execute code" },
      { status: 500 },
    )
  }
}
