# AITokenSave-MCP Usage Examples

This file demonstrates practical usage scenarios for the AITokenSave-MCP tools.

## Example 1: Extract Function from File

### Source Code:
```javascript
function setupServer() {
  const express = require('express');
  const app = express();
  
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  return app;
}

function startServer(app) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
```

### Tool Call:
```json
{
  "tool": "extract-lines",
  "arguments": {
    "text": "function setupServer() {\n  const express = require('express');\n  const app = express();\n  \n  app.get('/', (req, res) => {\n    res.send('Hello World!');\n  });\n  \n  return app;\n}\n\nfunction startServer(app) {\n  const PORT = process.env.PORT || 3000;\n  app.listen(PORT, () => {\n    console.log(`Server running on port ${PORT}`);\n  });\n}",
    "start_line": 11,
    "end_line": 16
  }
}
```

### Result:
```javascript
function startServer(app) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
```

## Example 2: Insert New Route

### Target Code:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);
```

### New Route to Insert:
```javascript
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});
```

### Tool Call:
```json
{
  "tool": "insert-at-line",
  "arguments": {
    "text": "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(3000);",
    "content": "app.get('/api/users', (req, res) => {\n  res.json({ users: [] });\n});",
    "line": 6
  }
}
```

### Result:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000);
```

## Example 3: Replace Configuration Block

### Original Config:
```yaml
server:
  port: 3000
  host: localhost
  
database:
  host: localhost
  port: 5432
  name: myapp
  
logging:
  level: info
  file: app.log
```

### Tool Call (Replace database section):
```json
{
  "tool": "insert-at-line",
  "arguments": {
    "text": "server:\n  port: 3000\n  host: localhost\n  \ndatabase:\n  host: localhost\n  port: 5432\n  name: myapp\n  \nlogging:\n  level: info\n  file: app.log",
    "content": "database:\n  host: prod-db.example.com\n  port: 5432\n  name: production_app\n  ssl: true\n  pool_size: 20",
    "line": 4,
    "replace_lines": 4
  }
}
```

### Result:
```yaml
server:
  port: 3000
  host: localhost
  
database:
  host: prod-db.example.com
  port: 5432
  name: production_app
  ssl: true
  pool_size: 20
  
logging:
  level: info
  file: app.log
```

## Example 4: Copy with Trimming

### Source (with extra whitespace):
```javascript


function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}


```

### Tool Call:
```json
{
  "tool": "copy-lines",
  "arguments": {
    "text": "\n\n\nfunction calculateTotal(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}\n\n\n",
    "start_line": 1,
    "end_line": 9,
    "trim": true
  }
}
```

### Result:
```javascript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

## Pro Tips

1. **Use line -1 for appending**: `"line": -1` adds content at the end
2. **Use line 0 for prepending**: `"line": 0` adds content at the beginning  
3. **Auto-indentation works automatically**: No need to manually format indentation
4. **Combine extract + insert**: Copy from one file and insert into another in two calls
5. **Use replace_lines for updates**: Replace existing code blocks efficiently