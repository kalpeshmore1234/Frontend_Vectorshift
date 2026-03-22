// splitNode.js - Split one input into multiple outputs

import { BaseNode } from './BaseNode';

export const SplitNode = ({ id }) => {
  return (
    <BaseNode
      title="Split"
      handles={[
        { type: 'target', position: 'left', id: `${id}-input` },
        { type: 'source', position: 'right', id: `${id}-part1`, style: { top: '30%' } },
        { type: 'source', position: 'right', id: `${id}-part2`, style: { top: '70%' } },
      ]}
    >
      <span>Divides input into parts</span>
    </BaseNode>
  );
};
