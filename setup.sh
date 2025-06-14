#!/bin/bash

# AITokenSave-MCP Setup Script

echo "🚀 Setting up AITokenSave-MCP..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Run tests
echo "🧪 Running tests..."
npm test

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add to Claude Desktop config:"
echo "   {\"command\": \"npx\", \"args\": [\"aitoken-save-mcp\"], \"transport\": \"stdio\"}"
echo ""
echo "2. Or start development mode:"
echo "   npm run dev"
echo ""
echo "3. Or publish to npm:"
echo "   npm publish"