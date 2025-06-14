import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { 
  ListToolsRequestSchema,
  CallToolRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';
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
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        extractTool.definition,
        insertTool.definition,
        copyTool.definition
      ]
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
      let result: any;
      
      switch (name) {
        case 'extract-lines':
          result = await extractTool.execute(args);
          break;
        
        case 'insert-at-line':
          result = await insertTool.execute(args);
          break;
        
        case 'copy-lines':
          result = await copyTool.execute(args);
          break;
        
        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      // Return result in MCP format
      return {
        content: result.content
      };
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