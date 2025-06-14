#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './server.js';

async function main() {
  console.error('Starting AITokenSave-MCP server...');
  
  const server = createServer();
  const transport = new StdioServerTransport();
  
  console.error('Server initialized, connecting transport...');
  
  await server.connect(transport);
  
  console.error('MCP server connected and ready!');
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.error('Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start the server
main().catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});