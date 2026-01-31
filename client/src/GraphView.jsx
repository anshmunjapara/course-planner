import { useEffect } from "react";
import { initialCourses } from "./coursesData";
import { getLayoutedNodes } from "./utils/layoutCalculator";
import { getPrereqIds } from "./utils/dataHelpers";
import { applyStyles } from "./utils/applyStylesToNodes";
import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export function GraphView({
  nodes,
  edges,
  userGrades,
  setNodes,
  onNodesChange,
  setEdges,
}) {
  useEffect(() => {
    const rawNodes = initialCourses.map((course) => ({
      id: course.id,
      data: { label: course.label, prereqLogic: course.prereqs },
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

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          colorMode="dark"
          fitView
        >
          <Background variant="dots" gap={25} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}
