// submit.js - Sends pipeline to backend and shows response alert

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Local dev: default. Production: set REACT_APP_API_URL in Netlify (e.g. https://your-api.onrender.com)
const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8000').replace(/\/$/, '');

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
      const isLocal = API_URL.includes('localhost');
      const hint = isLocal
        ? `Local: cd backend && python -m uvicorn main:app --reload`
        : `Netlify: set REACT_APP_API_URL to your Render URL and redeploy.\nTrying: ${API_URL}`;
      alert(
        `Error: Could not reach the backend.\n\n${hint}\n\nDetails: ${err.message}`
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
