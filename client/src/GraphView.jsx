import { ReactFlow, Background, MiniMap } from "@xyflow/react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import { initialCourses } from "./coursesData";
import { useCallback, useEffect, useMemo } from "react";
import { applyStyles } from "./utils/applyStylesToNodes";
import { getLayoutedNodes } from "./utils/cytoscapeLayoutCalculator";
import { getPrereqIds } from "./utils/convertPrereqTreeIntoArray";
import "@xyflow/react/dist/style.css";

const containerStyle = { width: "100%", height: "100%" };
const miniMapStyle = { height: 170, width: 270 };

export function GraphView({ onNodeClick, userGrades }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const { layoutedNodes, rawEdges } = useMemo(() => {
    const rawNodes = initialCourses.map((course) => ({
      id: course.id,
      data: {
        label: course.label,
        prereqs: course.prereqs,
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

    return { layoutedNodes, rawEdges };
  }, []);

  useEffect(() => {
    const { styledNodes, styledEdges } = applyStyles(
      layoutedNodes,
      rawEdges,
      userGrades,
    );

    setNodes(styledNodes);
    setEdges(styledEdges);
  }, [userGrades, layoutedNodes, rawEdges, setNodes, setEdges]);

  const handleNodeClick = useCallback(
    (event, node) => {
      onNodeClick(node);
    },
    [onNodeClick],
  );

  return (
    <>
      <div style={containerStyle}>
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
          <MiniMap nodeStrokeWidth={3} zoomable pannable style={miniMapStyle} />
          <Background variant="dots" gap={25} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}
