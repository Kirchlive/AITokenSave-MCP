import { Tool } from '../types.js';
import { copyLinesSchema, validateLineNumbers } from '../utils/validation.js';
import { trimContent } from '../utils/indent.js';

export const copyTool: Tool = {
  definition: {
    name: 'copy-lines',
    description: 'Copy specific lines from text content with optional trimming',
    inputSchema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'The text content to copy lines from'
        },
        start_line: {
          type: 'number',
          description: 'Starting line number (1-based)'
        },
        end_line: {
          type: 'number',
          description: 'Ending line number (1-based, inclusive)'
        },
        trim: {
          type: 'boolean',
          description: 'Remove leading/trailing empty lines',
          default: false
        }
      },
      required: ['text', 'start_line', 'end_line']
    }
  },

  execute: async (args: unknown) => {
    const { text, start_line, end_line, trim } = copyLinesSchema.parse(args);
    
    validateLineNumbers(text, start_line, end_line);
    
    const lines = text.split('\n');
    const copiedLines = lines.slice(start_line - 1, end_line);
    let result = copiedLines.join('\n');
    
    if (trim) {
      result = trimContent(result);
    }
    
    return {
      content: [{
        type: 'text',
        text: result
      }]
    };
  }
};