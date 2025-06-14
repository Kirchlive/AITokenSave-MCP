# 🚀 AITokenSave-MCP

**Smart copy-paste operations for AI workflows - Save 60-90% tokens by avoiding full file regeneration**

![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg) ![MCP](https://img.shields.io/badge/MCP-1.0-green.svg) ![NPX Ready](https://img.shields.io/badge/NPX-Ready-red.svg) ![Zero Config](https://img.shields.io/badge/Zero-Config-orange.svg)

## 🎯 Why AITokenSave-MCP?

Ever needed to modify just a few lines of code but AI regenerated the entire file? The traditional approach wastes massive amounts of tokens:

- **Manual copy-paste** - Loses formatting and requires complex prompts
- **Full file regeneration** - AI rewrites 200 lines to change 3 lines
- **No precise targeting** - "Add a function after line 42" becomes guesswork
- **Indentation nightmares** - Manual formatting breaks code structure

**AITokenSave-MCP solves this:**

- ✅ **Extract specific line ranges** with surgical precision
- ✅ **Insert content at exact positions** with auto-indentation  
- ✅ **Replace code blocks** without touching surrounding content
- ✅ **Save 60-90% tokens** in typical code modification tasks

## ⚡ How It Works

**1. Tell AI What You Need**
```
"Add this Express route after line 15"
```

**2. AI Uses Precise Tools**
```json
{
  "tool": "insert-at-line",
  "line": 15,
  "content": "app.get('/api/users', ...)"
}
```

**3. Perfect Result**
- ✅ Exact positioning
- ✅ Auto-indented code  
- ✅ Zero regeneration
- ✅ 90% fewer tokens

## 📊 Token Savings

| Task | Before (Full Regeneration) | After (Precise Tools) | Savings |
|------|---------------------------|---------------------|---------|
| Add function | 2000+ tokens | 200 tokens | **90%** |
| Replace config | 1500+ tokens | 150 tokens | **90%** |
| Extract snippet | 1200+ tokens | 100 tokens | **92%** |

## 🚀 Installation

### Option 1: NPX (Instant Use)
```bash
npx aitoken-save-mcp
```

### Option 2: Claude Desktop
Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "aitoken-save": {
      "command": "npx",
      "args": ["aitoken-save-mcp"],
      "transport": "stdio"
    }
  }
}
```

### Option 3: Global Install
```bash
npm install -g aitoken-save-mcp
aitoken-save-mcp
```

## 🛠️ Available Tools

### `extract-lines` - Copy specific ranges
```json
{
  "text": "source code",
  "start_line": 10,
  "end_line": 20
}
```

### `insert-at-line` - Insert with auto-indentation
```json
{
  "text": "original code",
  "content": "new code",
  "line": 25,
  "replace_lines": 3
}
```

### `copy-lines` - Enhanced extraction
```json
{
  "text": "source code", 
  "start_line": 5,
  "end_line": 15,
  "trim": true
}
```

## 💡 Usage Examples

**Express Route:** `insert-at-line` with exact positioning → 90% token savings
**Config Update:** `replace-lines` targeting specific block → 87% token savings  
**Extract Function:** `extract-lines` with perfect preservation → 85% token savings

### Quick Patterns
```bash
# Copy-paste workflow
extract-lines: start_line=45, end_line=60
insert-at-line: line=25, content=extracted_code

# Smart positioning
line: 0     # Beginning    line: -1    # End    line: 42   # After line 42
```

## 🏗️ Design & Development

**Minimal by Design:** Only 3 tools, zero config, auto-indentation
**Built for Efficiency:** ~50KB bundle, <5s install, memory efficient

```bash
# Development setup
git clone <repository-url> && cd aitoken-save-mcp
npm install && npm run dev
```

## ❓ FAQ

**Auto-indentation:** Detects surrounding code style automatically
**Line numbering:** 1-based indexing (line 1 = first line)  
**Language support:** Works with any programming language
**MCP compatibility:** Claude Desktop, Cursor, VS Code, etc.

## 🤝 Contributing

- Keep tools minimal and focused
- Auto-indentation must always work  
- No breaking changes to existing tools
- Comprehensive examples for new features

## 📄 License

MIT License - Free for commercial and personal use

---

**⭐ Stop wasting tokens on full file regeneration - Start using precision tools!**

*Built for efficiency. Designed for developers. Optimized for AI workflows.* 🤖✨