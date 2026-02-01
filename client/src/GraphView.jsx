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
  onNodeClick,
}) {
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
