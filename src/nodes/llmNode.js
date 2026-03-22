// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      handles={[
        { type: 'target', position: 'left', id: `${id}-system`, style: { top: '33%' } },
        { type: 'target', position: 'left', id: `${id}-prompt`, style: { top: '66%' } },
        { type: 'source', position: 'right', id: `${id}-response` },
      ]}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
};
