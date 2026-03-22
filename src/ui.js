// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { DelayNode } from './nodes/delayNode';
import { ConditionNode } from './nodes/conditionNode';
import { TransformNode } from './nodes/transformNode';
import { MergeNode } from './nodes/mergeNode';
import { SplitNode } from './nodes/splitNode';
import { PipelineToolbar } from './toolbar';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  delay: DelayNode,
  condition: ConditionNode,
  transform: TransformNode,
  merge: MergeNode,
  split: SplitNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const addNodeOfType = useCallback(
      (type, screenPosition) => {
        const nodeID = getNodeID(type);
        let position = { x: 120, y: 120 };

        if (reactFlowInstance && reactFlowWrapper.current) {
          const bounds = reactFlowWrapper.current.getBoundingClientRect();
          position =
            screenPosition != null
              ? reactFlowInstance.project({
                  x: screenPosition.x - bounds.left,
                  y: screenPosition.y - bounds.top,
                })
              : reactFlowInstance.project({
                  x: bounds.width / 2 - 80,
                  y: bounds.height / 2 - 40,
                });
        }

        addNode({
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        });
      },
      [reactFlowInstance, getNodeID, addNode]
    );

    const onDrop = useCallback(
      (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const raw = event?.dataTransfer?.getData('application/reactflow');
        if (!raw) return;

        const appData = JSON.parse(raw);
        const type = appData?.nodeType;
        if (typeof type === 'undefined' || !type) return;

        addNodeOfType(type, { x: event.clientX, y: event.clientY });
      },
      [addNodeOfType]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <PipelineToolbar onAddNode={(type) => addNodeOfType(type)} />
        <p className="pipeline-hint">
          <strong>Build a pipeline:</strong> drag a node from above onto the canvas, or <strong>click</strong> a node
          button to place it in the center. Then drag from the <strong>purple dots</strong> (handles) on one node to
          another to connect them. Click <strong>Submit</strong> when done.
        </p>
        <div ref={reactFlowWrapper} className="react-flow-wrap">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
                <Background color="var(--vs-border)" gap={gridSize} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
        </>
    )
}
