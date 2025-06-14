import { z } from 'zod';

export const extractLinesSchema = z.object({
  text: z.string(),
  start_line: z.number().min(1),
  end_line: z.number().min(1)
}).refine(data => data.start_line <= data.end_line, {
  message: "start_line must be less than or equal to end_line"
});

export const insertAtLineSchema = z.object({
  text: z.string(),
  content: z.string(),
  line: z.number().int(),
  replace_lines: z.number().int().min(0).default(0)
});

export const copyLinesSchema = z.object({
  text: z.string(),
  start_line: z.number().min(1),
  end_line: z.number().min(1),
  trim: z.boolean().default(false)
}).refine(data => data.start_line <= data.end_line, {
  message: "start_line must be less than or equal to end_line"
});

/**
 * Validates line numbers against text content
 */
export function validateLineNumbers(text: string, startLine: number, endLine?: number): void {
  const lines = text.split('\n');
  const maxLine = lines.length;
  
  if (startLine > maxLine) {
    throw new Error(`start_line (${startLine}) exceeds text length (${maxLine} lines)`);
  }
  
  if (endLine && endLine > maxLine) {
    throw new Error(`end_line (${endLine}) exceeds text length (${maxLine} lines)`);
  }
}