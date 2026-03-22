// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = ({ onAddNode }) => {
    return (
        <div className="toolbar">
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' onAddNode={onAddNode} />
                <DraggableNode type='llm' label='LLM' onAddNode={onAddNode} />
                <DraggableNode type='customOutput' label='Output' onAddNode={onAddNode} />
                <DraggableNode type='text' label='Text' onAddNode={onAddNode} />
                <DraggableNode type='delay' label='Delay' onAddNode={onAddNode} />
                <DraggableNode type='condition' label='Condition' onAddNode={onAddNode} />
                <DraggableNode type='transform' label='Transform' onAddNode={onAddNode} />
                <DraggableNode type='merge' label='Merge' onAddNode={onAddNode} />
                <DraggableNode type='split' label='Split' onAddNode={onAddNode} />
            </div>
        </div>
    );
};
