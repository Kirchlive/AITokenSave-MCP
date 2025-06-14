import { Tool } from '../types.js';
import { extractLinesSchema, validateLineNumbers } from '../utils/validation.js';

export const extractTool: Tool = {
  definition: {
    name: 'extract-lines',
    description: 'Extract specific lines from text content',
    inputSchema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'The text content to extract lines from'
        },
        start_line: {
          type: 'number',
          description: 'Starting line number (1-based)'
        },
        end_line: {
          type: 'number',
          description: 'Ending line number (1-based, inclusive)'
        }
      },
      required: ['text', 'start_line', 'end_line']
    }
  },

  execute: async (args: unknown) => {
    const { text, start_line, end_line } = extractLinesSchema.parse(args);
    
    validateLineNumbers(text, start_line, end_line);
    
    const lines = text.split('\n');
    const extractedLines = lines.slice(start_line - 1, end_line);
    
    return {
      content: [{
        type: 'text',
        text: extractedLines.join('\n')
      }]
    };
  }
};