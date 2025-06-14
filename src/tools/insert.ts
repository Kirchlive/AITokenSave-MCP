import { Tool } from '../types.js';
import { insertAtLineSchema } from '../utils/validation.js';
import { autoIndent } from '../utils/indent.js';

export const insertTool: Tool = {
  definition: {
    name: 'insert-at-line',
    description: 'Insert content at a specific line, optionally replacing existing lines',
    inputSchema: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'Original text content'
        },
        content: {
          type: 'string',
          description: 'Content to insert'
        },
        line: {
          type: 'number',
          description: 'Target line position (0=start, -1=end, positive=after that line)'
        },
        replace_lines: {
          type: 'number',
          description: 'Number of existing lines to replace (default: 0)',
          default: 0
        }
      },
      required: ['text', 'content', 'line']
    }
  },

  execute: async (args: unknown) => {
    const { text, content, line, replace_lines } = insertAtLineSchema.parse(args);
    
    const lines = text.split('\n');
    const totalLines = lines.length;
    
    // Determine insertion position
    let insertPosition: number;
    if (line === -1) {
      insertPosition = totalLines; // End of file
    } else if (line === 0) {
      insertPosition = 0; // Beginning of file
    } else {
      insertPosition = Math.min(line, totalLines); // After specified line
    }
    
    // Apply auto-indentation
    const indentedContent = autoIndent(content, insertPosition, text);
    const contentLines = indentedContent.split('\n');
    
    // Insert content and optionally replace existing lines
    lines.splice(insertPosition, replace_lines, ...contentLines);
    
    return {
      content: [{
        type: 'text',
        text: lines.join('\n')
      }]
    };
  }
};