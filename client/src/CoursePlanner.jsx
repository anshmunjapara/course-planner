import { useState, useEffect } from "react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import { applyStyles } from "./utils/applyStylesToNodes";
import { GraphView } from "./GraphView";
import { Sidebar } from "./Sidebar";
import { initialCourses } from "./coursesData";
import { getLayoutedNodes } from "./utils/layoutCalculator";
import { getPrereqIds } from "./utils/dataHelpers";

export function CoursePlanner() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const [userGrades, setUserGrades] = useState({
    CS110: 85,
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

  useEffect(() => {
    const rawNodes = initialCourses.map((course) => ({
      id: course.id,
      data: {
        label: course.label,
        prereqLogic: course.prereqs,
        description: course.description,
      },
      position: { x: 0, y: 0 },
    }));

    const rawEdges = initialCourses.flatMap((course) => {
      const prereqIds = getPrereqIds(course.prereqs);
      return prereqIds.map((prereqId) => ({
        id: `${prereqId}-${course.id}`,
        source: prereqId,
        target: course.id,
        type: "default",
      }));
    });

    const layoutedNodes = getLayoutedNodes(rawNodes, rawEdges);

    const { styledNodes, styledEdges } = applyStyles(
      layoutedNodes,
      rawEdges,
      userGrades,
      initialCourses,
    );

    setNodes(styledNodes);
    setEdges(styledEdges);
  }, []);

  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      const { styledNodes, styledEdges } = applyStyles(
        nodes,
        edges,
        userGrades,
        initialCourses,
      );

      setNodes(styledNodes);
      setEdges(styledEdges);
    }
  }, [userGrades]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <GraphView
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeClick={setSelectedNode}
        />
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
