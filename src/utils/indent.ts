/**
 * Detects the indentation of a specific line
 */
export function detectIndentation(lines: string[], targetLineIndex: number): string {
  if (targetLineIndex < 0 || targetLineIndex >= lines.length) {
    return '';
  }
  
  const line = lines[targetLineIndex];
  const match = line.match(/^(\s*)/);
  return match ? match[1] : '';
}

/**
 * Applies auto-indentation to content based on the target position
 */
export function autoIndent(content: string, targetLine: number, originalText: string): string {
  const lines = originalText.split('\n');
  const targetLineIndex = targetLine === -1 ? lines.length - 1 : Math.max(0, targetLine - 1);
  
  // Detect indentation of the target line or nearby lines
  let indent = '';
  
  // Try to find indentation from the target line or nearby lines
  for (let i = targetLineIndex; i >= Math.max(0, targetLineIndex - 3); i--) {
    if (lines[i] && lines[i].trim()) {
      indent = detectIndentation(lines, i);
      break;
    }
  }
  
  // If no indentation found, look forward
  if (!indent) {
    for (let i = targetLineIndex + 1; i < Math.min(lines.length, targetLineIndex + 4); i++) {
      if (lines[i] && lines[i].trim()) {
        indent = detectIndentation(lines, i);
        break;
      }
    }
  }
  
  // Apply indentation to each non-empty line of the content
  return content
    .split('\n')
    .map(line => {
      if (line.trim() === '') {
        return line; // Keep empty lines as-is
      }
      return indent + line.trim();
    })
    .join('\n');
}

/**
 * Trims whitespace from content while preserving structure
 */
export function trimContent(content: string): string {
  const lines = content.split('\n');
  
  // Remove empty lines from start and end
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  
  return lines.join('\n');
}