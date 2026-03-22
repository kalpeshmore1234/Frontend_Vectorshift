// draggableNode.js

import { useRef } from 'react';

export const DraggableNode = ({ type, label, onAddNode }) => {
    /** After a real drag, browsers may still fire click — skip the add-on-click once. */
    const suppressNextClickRef = useRef(false);

    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.currentTarget.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = (event) => {
      event.currentTarget.style.cursor = 'grab';
      suppressNextClickRef.current = true;
    };

    const onClick = () => {
      if (suppressNextClickRef.current) {
        suppressNextClickRef.current = false;
        return;
      }
      if (onAddNode) onAddNode(type);
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={onDragEnd}
        onClick={onClick}
        style={{ 
          cursor: 'grab', 
          minWidth: '90px', 
          height: '48px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: 'var(--vs-radius)',
          backgroundColor: 'var(--vs-bg-node)',
          border: '1px solid var(--vs-border)',
          justifyContent: 'center', 
          flexDirection: 'column',
          color: 'var(--vs-text-primary)',
          transition: 'all 0.15s ease'
        }} 
        draggable
      >
          <span>{label}</span>
      </div>
    );
  };
  