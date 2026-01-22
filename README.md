# CodePrep

**Master Your Coding Interviews**

CodePrep is a modern, full-stack platform designed to help developers prepare for technical interviews. Practice real interview problems, run code instantly, and track your progress with detailed statistics.

## 🚀 Features

* **Real-time Code Execution**: Run your solutions instantly with a custom execution engine.
* **Interview-Ready Problems**: Curated collection of problems from top tech companies (Google, Meta, Amazon).
* **Progress Tracking**: Monitor your improvement with streaks, solve counts, and performance stats.
* **Modern Code Editor**: Distraction-free interface with syntax highlighting and auto-completion.
* **AI-Powered Hints**: Get unstuck with intelligent suggestions.
* **Secure Authentication**: User accounts and progress saving powered by Supabase Auth.
* **Responsive Design**: Beautiful UI built with Tailwind CSS and Shadcn UI.

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://www.google.com/search?q=https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.google.com/search?q=https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS 4](https://www.google.com/search?q=https://tailwindcss.com/) & [Shadcn UI](https://www.google.com/search?q=https://ui.shadcn.com/)
* **Backend & Database**: [Supabase](https://www.google.com/search?q=https://supabase.com/) (PostgreSQL, Auth)
* **Forms**: React Hook Form & Zod
* **Icons**: Lucide React

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router pages and API routes
│   ├── api/execute/      # Code execution API endpoint
│   ├── auth/             # Authentication pages (Login, Sign up)
│   └── problems/         # Problem listing and workspace pages
├── components/           # Reusable UI components (Shadcn + Custom)
├── lib/                  # Utilities, types, and Supabase client
├── public/               # Static assets
├── scripts/              # Database setup and seeding SQL scripts
└── styles/               # Global styles

```

## ⚡ Getting Started

### Prerequisites

* Node.js (v18 or higher)
* pnpm (recommended) or npm/yarn

### 1. Clone the repository

```bash
git clone https://github.com/alamnahin/code-prep.git
cd code-prep

```

### 2. Install dependencies

```bash
pnpm install

```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

```

### 4. Database Setup (Supabase)

This project uses Supabase for Authentication and Data storage.

1. Create a new project at [supabase.com](https://supabase.com).
2. Navigate to the SQL Editor in your Supabase dashboard.
3. **Create Tables**: Run the script located in `scripts/001-create-tables.sql`.
4. **Seed Data**: Run the script located in `scripts/002-seed-problems.sql`.

> **Detailed Guide:** For a step-by-step walkthrough of the Supabase configuration, please refer to the **[SUPABASE_SETUP.md](https://www.google.com/search?q=./SUPABASE_SETUP.md)** file included in this repository.

### 5. Run the application

```bash
pnpm dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## 🧩 How It Works

### Code Execution Engine

The platform uses a secure server-side execution environment located in `app/api/execute/route.ts`. When a user submits code:

1. The code is sent to the API route.
2. It is wrapped in a sandboxed function scope.
3. The code is run against defined test cases.
4. Results (Pass/Fail) are returned to the frontend.

### Database Schema

* **`problems`**: Stores title, description, difficulty, and test cases.
* **`submissions`**: Records user code history and pass/fail status.
* **`user_progress`**: Tracks solved problems to calculate stats and streaks.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
