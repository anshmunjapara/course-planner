import { useState } from "react";
import { GraphView } from "./GraphView";
import { Sidebar } from "./Sidebar";

export function CoursePlanner() {
  const [selectedNode, setSelectedNode] = useState(null);

  const [userGrades, setUserGrades] = useState({
    // CS110: ,
    MATH103: 60,
    // CS115: 90,
    // MATH110: 85,
    // CS210: 85,
    // STAT160: 90,
  });

  const handleChangeGrade = (newGrade) => {
    setUserGrades((prevGrades) => {
      return {
        ...prevGrades,
        [selectedNode.id]: parseFloat(newGrade),
      };
    });
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <GraphView userGrades={userGrades} onNodeClick={setSelectedNode} />
      </div>
      <Sidebar
        key={selectedNode?.id || "empty"}
        selectedNode={selectedNode}
        onChangeGrade={handleChangeGrade}
        userGrades={userGrades}
      />
    </div>
  );
}
