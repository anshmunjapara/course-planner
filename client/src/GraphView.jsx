import { ReactFlow, Background, MiniMap } from "@xyflow/react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import { initialCourses } from "./coursesData";
import { useEffect } from "react";
import { applyStyles } from "./utils/applyStylesToNodes";
// import { getLayoutedNodes } from "./utils/layoutCalculator";
import { getLayoutedNodes } from "./utils/cytoscapeLayoutCalculator";
import { getPrereqIds } from "./utils/convertPrereqTreeIntoArray";
import "@xyflow/react/dist/style.css";

export function GraphView({ onNodeClick, userGrades }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

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

    const layoutedNodes = getLayoutedNodes(rawNodes, rawEdges, {
      name: "klay",
      nodeDimensionsIncludeLabels: true,
      fit: true,
      padding: 30,
      animate: false,
      klay: {
        direction: "DOWN", // 'DOWN', 'RIGHT', 'UP', 'LEFT'
        edgeRouting: "SPLINES",
        routeSelfLoopInside: true,
        thoroughness: 10, // 1-10 (higher is better but slower)
        spacing: 50, // General spacing
      },
    });

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
          colorMode="system"
          fitView
          minZoom={0.1} // Allow zooming out significantly
          maxZoom={1.5} // Prevent zooming in too far
        >
          <MiniMap
            nodeStrokeWidth={3}
            zoomable
            pannable
            style={{ height: 170, width: 270 }} 
            nodeColor={(node) => {
              // Optional: Match the minimap colors to your node styles
              return node.style?.background || "#ccc";
            }}
          />
          <Background variant="dots" gap={25} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}
