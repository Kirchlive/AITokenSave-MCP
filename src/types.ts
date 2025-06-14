export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required: string[];
  };
}

export interface ToolResult {
  content: Array<{
    type: 'text';
    text: string;
  }>;
}

export interface ExtractLinesArgs {
  text: string;
  start_line: number;
  end_line: number;
}

export interface InsertAtLineArgs {
  text: string;
  content: string;
  line: number;
  replace_lines?: number;
}

export interface CopyLinesArgs {
  text: string;
  start_line: number;
  end_line: number;
  trim?: boolean;
}

export interface Tool {
  definition: ToolDefinition;
  execute: (args: unknown) => Promise<ToolResult>;
}