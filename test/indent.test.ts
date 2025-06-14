import { describe, it, expect } from 'vitest';
import { autoIndent, detectIndentation, trimContent } from '../src/utils/indent.js';

describe('Indentation Utils', () => {
  describe('detectIndentation', () => {
    it('should detect spaces indentation', () => {
      const lines = ['', '  function test() {', '    return true;', '  }'];
      expect(detectIndentation(lines, 1)).toBe('  ');
      expect(detectIndentation(lines, 2)).toBe('    ');
    });

    it('should detect tabs indentation', () => {
      const lines = ['', '\tfunction test() {', '\t\treturn true;', '\t}'];
      expect(detectIndentation(lines, 1)).toBe('\t');
      expect(detectIndentation(lines, 2)).toBe('\t\t');
    });
  });

  describe('autoIndent', () => {
    it('should apply indentation to content', () => {
      const originalText = 'line 1\n  indented line\n    more indented\nline 4';
      const content = 'new line\nsecond new line';
      
      const result = autoIndent(content, 2, originalText);
      expect(result).toBe('  new line\n  second new line');
    });

    it('should preserve empty lines', () => {
      const originalText = 'line 1\n  indented line\nline 3';
      const content = 'new line\n\nsecond new line';
      
      const result = autoIndent(content, 2, originalText);
      expect(result).toBe('  new line\n\n  second new line');
    });
  });

  describe('trimContent', () => {
    it('should remove leading and trailing empty lines', () => {
      const content = '\n\nactual content\nmore content\n\n';
      const result = trimContent(content);
      expect(result).toBe('actual content\nmore content');
    });

    it('should preserve internal empty lines', () => {
      const content = '\nline 1\n\nline 3\n';
      const result = trimContent(content);
      expect(result).toBe('line 1\n\nline 3');
    });
  });
});