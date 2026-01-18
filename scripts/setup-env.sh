#!/bin/bash

# Supabase Quick Setup Script
# This script helps you set up your Supabase environment variables

echo "🚀 Supabase Setup Script for Code Prep"
echo "========================================"
echo ""

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/N): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "❌ Setup cancelled."
        exit 0
    fi
fi

echo "Please enter your Supabase credentials."
echo "You can find these in your Supabase dashboard:"
echo "Project Settings > API"
echo ""

read -p "Enter your Supabase Project URL: " supabase_url
read -p "Enter your Supabase Anon Key: " supabase_key

# Create .env.local file
cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=$supabase_key
EOF

echo ""
echo "✅ .env.local file created successfully!"
echo ""
echo "Next steps:"
echo "1. Run your SQL scripts in Supabase SQL Editor:"
echo "   - scripts/001-create-tables.sql"
echo "   - scripts/002-seed-problems.sql"
echo "2. Start your development server: pnpm dev"
echo ""
echo "For detailed instructions, see SUPABASE_SETUP.md"
