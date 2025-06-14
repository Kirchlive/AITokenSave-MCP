import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { extractTool } from './tools/extract.js';
import { insertTool } from './tools/insert.js';
import { copyTool } from './tools/copy.js';

export function createServer(): Server {
  const server = new Server({
    name: 'aitoken-save-mcp',
    version: '1.0.0'
  }, {
    capabilities: {
      tools: {}
    }
  });

  // List available tools
  server.setRequestHandler('tools/list', async () => {
    return {
      tools: [
        extractTool.definition,
        insertTool.definition,
        copyTool.definition
      ]
    };
  });

  // Handle tool calls
  server.setRequestHandler('tools/call', async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
      switch (name) {
        case 'extract-lines':
          return await extractTool.execute(args);
        
        case 'insert-at-line':
          return await insertTool.execute(args);
        
        case 'copy-lines':
          return await copyTool.execute(args);
        
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      // Return error in MCP format
      return {
        content: [{
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        }],
        isError: true
      };
    }
  });

  return server;
}