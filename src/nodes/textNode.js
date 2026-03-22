// textNode.js - Text node with variable interpolation and dynamic sizing

import { useState, useMemo, useRef, useEffect } from 'react';
import { BaseNode } from './BaseNode';

// Valid JavaScript variable name: starts with letter, underscore, or $; contains only letters, digits, underscore, $
const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVariables(text) {
  const vars = new Set();
  let match;
  const re = new RegExp(VAR_REGEX.source, 'g');
  while ((match = re.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return Array.from(vars);
}

const MIN_WIDTH = 200;
const MIN_HEIGHT = 80;
const ROW_HEIGHT = 22;
const CHAR_WIDTH = 8;
const PADDING = 24;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text ?? '{{input}}');
  const textareaRef = useRef(null);

  const variables = useMemo(() => extractVariables(currText), [currText]);

  const handles = useMemo(() => {
    const result = variables.map((v, i) => ({
      type: 'target',
      position: 'left',
      id: `${id}-${v}`,
      style: variables.length > 1 ? { top: `${((i + 1) / (variables.length + 1)) * 100}%` } : undefined,
    }));
    result.push({ type: 'source', position: 'right', id: `${id}-output` });
    return result;
  }, [id, variables]);

  const [dimensions, setDimensions] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });

  useEffect(() => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = 'auto';
    el.style.width = 'auto';
    const lines = currText.split('\n').length;
    const maxLineLen = Math.max(...currText.split('\n').map((l) => l.length), 1);
    const height = Math.max(MIN_HEIGHT, Math.min(lines * ROW_HEIGHT + PADDING, 300));
    const width = Math.max(MIN_WIDTH, Math.min(maxLineLen * CHAR_WIDTH + PADDING, 400));
    setDimensions({ width, height });
  }, [currText]);

  return (
    <BaseNode
      title="Text"
      handles={handles}
      width={dimensions.width}
      height={dimensions.height}
      minWidth={MIN_WIDTH}
      minHeight={MIN_HEIGHT}
    >
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        placeholder="Enter text. Use {{ variableName }} for variables."
        style={{
          width: '100%',
          minHeight: 36,
          resize: 'none',
          overflow: 'hidden',
          fontSize: 12,
          background: 'var(--vs-bg-dark)',
          color: 'var(--vs-text-primary)',
          border: '1px solid var(--vs-border)',
          borderRadius: 4,
          padding: 6,
          boxSizing: 'border-box',
        }}
        rows={2}
      />
    </BaseNode>
  );
};
