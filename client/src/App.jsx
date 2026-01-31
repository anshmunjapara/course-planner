import { useState } from "react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import { GraphView } from "./GraphView";

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const [userGrades] = useState({
    CS110: 85,
    MATH103: 60,
    CS115: 90,
    MATH110: 85,
    CS210: 85,
    STAT160: 90,
  });

  return (
    <>
      <GraphView
        nodes={nodes}
        edges={edges}
        userGrades={userGrades}
        setEdges={setEdges}
        setNodes={setNodes}
        onNodesChange={onNodesChange}
      />
    </>
  );
}

export default App;
