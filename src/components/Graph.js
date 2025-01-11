// Graph.js
import { useCallback } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const Graph = ({ initialNodes, initialEdges, setEdges, onNodesChange, onEdgesChange }) => {

  const onConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
    
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

export default Graph;
