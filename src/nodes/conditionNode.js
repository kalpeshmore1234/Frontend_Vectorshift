// conditionNode.js - Conditional branch node

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id }) => {
  const [condition, setCondition] = useState('');

  return (
    <BaseNode
      title="Condition"
      handles={[
        { type: 'target', position: 'left', id: `${id}-input` },
        { type: 'source', position: 'right', id: `${id}-true`, style: { top: '30%' } },
        { type: 'source', position: 'right', id: `${id}-false`, style: { top: '70%' } },
      ]}
    >
      <label>
        Condition:
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g., x > 0"
        />
      </label>
    </BaseNode>
  );
};
