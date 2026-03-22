// submit.js - Sends pipeline to backend and shows response alert

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const API_URL = 'http://localhost:8000';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({ nodes: state.nodes, edges: state.edges }),
    shallow
  );

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes.map((n) => ({
            id: n.id,
            type: n.type,
            position: n.position,
            data: n.data,
          })),
          edges: edges.map((e) => ({
            id: e.id,
            source: e.source,
            target: e.target,
            sourceHandle: e.sourceHandle,
            targetHandle: e.targetHandle,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      const message =
        `Pipeline Analysis\n` +
        `━━━━━━━━━━━━━━━━\n` +
        `Nodes: ${data.num_nodes}\n` +
        `Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? 'Yes ✓' : 'No ✗'}\n` +
        `━━━━━━━━━━━━━━━━`;

      alert(message);
    } catch (err) {
      alert(
        `Error: Could not reach the backend.\n\n` +
          `Make sure the backend is running:\n` +
          `cd backend && uvicorn main:app --reload\n\n` +
          `Details: ${err.message}`
      );
    }
  };

  return (
    <div className="submit-section">
      <button type="button" className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
