#!/bin/bash

# AITokenSave-MCP Setup Script

# Farb-Definitionen (robuste Terminal-Erkennung)
GREEN=""
YELLOW=""
RED=""
NC=""

# Prüfe, ob das Terminal Farben unterstützt, und ob die Abfrage erfolgreich ist
if tput setaf 1 &>/dev/null; then
  colors=$(tput colors 2>/dev/null)
  if [ -n "$colors" ] && [ "$colors" -ge 8 ]; then
    GREEN="\033[0;32m"
    YELLOW="\033[0;33m"
    RED="\033[0;31m"
    NC="\033[0m"
  fi
fi

echo -e "${GREEN}🚀 Setting up AITokenSave-MCP...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ required. Current version: $(node --version)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) detected${NC}"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Build the project
echo -e "${YELLOW}🔨 Building project...${NC}"
npm run build

# Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"
npm test

echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Add to Claude Desktop config:"
echo "   {\"command\": \"npx\", \"args\": [\"aitoken-save-mcp\"], \"transport\": \"stdio\"}"
echo ""
echo "2. Or start development mode:"
echo "   npm run dev"
echo ""
echo "3. Or publish to npm:"
echo "   npm publish"