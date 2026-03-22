// BaseNode.js - Abstract base component for all pipeline nodes
// Provides consistent structure, styling, and handle placement

import { Handle, Position } from 'reactflow';

/**
 * Base node wrapper that handles common structure and styling for all nodes.
 * @param {Object} props
 * @param {string} props.title - Node type label (e.g., "Input", "LLM")
 * @param {Array} props.handles - Array of handle configs: { type: 'target'|'source', position: 'left'|'right', id: string, style?: object }
 * @param {React.ReactNode} props.children - Custom content for the node body
 * @param {Object} props.style - Override styles for the node container
 * @param {number} props.width - Node width (default: 200)
 * @param {number} props.height - Node height (default: 80)
 * @param {number} props.minWidth - Minimum width
 * @param {number} props.minHeight - Minimum height
 */
export const BaseNode = ({
  title,
  handles = [],
  children,
  style = {},
  width = 200,
  height = 'auto',
  minWidth,
  minHeight,
  ...rest
}) => {
  const resolvedMinH = minHeight ?? 80;
  const containerStyle = {
    position: 'relative',
    width,
    minWidth: minWidth ?? width,
    maxWidth: '100%',
    height,
    minHeight: resolvedMinH,
    padding: '12px 14px',
    boxSizing: 'border-box',
    background: 'var(--vs-bg-node)',
    border: '1px solid var(--vs-border)',
    borderRadius: 'var(--vs-radius)',
    color: 'var(--vs-text-primary)',
    overflow: 'visible',
    ...style,
  };

  const positionMap = { left: Position.Left, right: Position.Right };

  return (
    <div className="vs-node-card" style={containerStyle} {...rest}>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={positionMap[handle.position] ?? handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
      <div className="vs-node-title">{title}</div>
      {/* nodrag: stop React Flow from treating pointer events as node drag (fixes number spinners, inputs). */}
      {/* nowheel: prevent canvas zoom when scrolling inside fields */}
      <div className="vs-node-body nodrag nowheel">{children}</div>
    </div>
  );
};
