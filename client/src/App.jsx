import { useState } from "react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import { GraphView } from "./GraphView";
import { Sidebar } from "./Sidebar";
import "./App.css";

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const [userGrades] = useState({
    CS110: 85,
    MATH103: 60,
    CS115: 90,
    MATH110: 85,
    CS210: 85,
    STAT160: 90,
  });

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <GraphView
          nodes={nodes}
          edges={edges}
          userGrades={userGrades}
          setEdges={setEdges}
          setNodes={setNodes}
          onNodesChange={onNodesChange}
          onNodeClick={setSelectedNode}
        />
      </div>
      <Sidebar selectedNode={selectedNode} />
    </div>
  );
}

export default App;
