import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export function GraphView({ nodes, edges, onNodesChange, onNodeClick }) {
  const handleNodeClick = (event, node) => {
    onNodeClick(node);
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeClick={handleNodeClick}
          colorMode="dark"
          fitView
        >
          <Background variant="dots" gap={25} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}
