export interface Problem {
  id: string
  title: string
  slug: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  starter_code: string
  solution?: string
  test_cases: TestCase[]
  created_at: string
  updated_at: string
}

export interface TestCase {
  input: Record<string, unknown>
  expected: unknown
}

export interface Submission {
  id: string
  user_id: string
  problem_id: string
  code: string
  language: string
  status: "pending" | "passed" | "failed"
  results?: TestResult[]
  created_at: string
}

export interface TestResult {
  passed: boolean
  input: Record<string, unknown>
  expected: unknown
  actual: unknown
  error?: string
}

export interface UserProgress {
  id: string
  user_id: string
  problem_id: string
  solved: boolean
  attempts: number
  last_submission_at?: string
  created_at: string
}
