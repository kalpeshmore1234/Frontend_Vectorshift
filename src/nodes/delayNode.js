// delayNode.js - Represents a delay/wait in the pipeline

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(data?.delayMs ?? 1000);

  return (
    <BaseNode
      title="Delay"
      handles={[
        { type: 'target', position: 'left', id: `${id}-input` },
        { type: 'source', position: 'right', id: `${id}-output` },
      ]}
    >
      <label>
        Delay (ms):
        <input
          type="number"
          value={delayMs}
          onChange={(e) => setDelayMs(Number(e.target.value))}
          min={0}
          step={1}
        />
      </label>
    </BaseNode>
  );
};
