import { ReactFlow, Background, MiniMap } from "@xyflow/react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import { useCallback, useEffect, useMemo, memo } from "react";
import { Legend } from "./components/Legend";
import { SearchComponent } from "./components/SearchComponent";
import { applyStylesToGraph } from "./utils/applyStylesToGraph";
import { getLayoutedNodes } from "./utils/cytoscapeLayoutCalculator";
import { getPrereqIds } from "./utils/convertPrereqTreeIntoArray";
import { ResetGraph } from "./components/ResetGraph";
import "@xyflow/react/dist/style.css";

const containerStyle = { width: "100%", height: "100%" };
const miniMapStyle = { height: 170, width: 270 };
const layoutOptions = {
  name: "klay",
  nodeDimensionsIncludeLabels: true,
  fit: true,
  padding: 30,
  animate: false,
  klay: {
    direction: "DOWN",
    edgeRouting: "SPLINES",
    routeSelfLoopInside: true,
    thoroughness: 10, // 1-10 (higher is better but slower)
    spacing: 50, // General spacing
  },
};

const MemoizedLegend = memo(Legend);
const NodeSearch = memo(SearchComponent);

export function GraphView({
  onNodeClick,
  userGrades,
  courses,
  handleCloseCoursePicker,
  selectedNodeId,
  setSelectedNodeId,
  onReset,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const activeCourseIds = useMemo(
    () => new Set(courses.map((c) => c.id)),
    [courses],
  );

  const { layoutedNodes, rawEdges } = useMemo(() => {
    const rawNodes = courses.map((course) => ({
      id: course.id,
      data: {
        label: course.label,
        prereqs: course.prereqs,
        description: course.description,
        required: course.required,
      },
      position: { x: 0, y: 0 },
    }));

    const rawEdges = courses.flatMap((course) => {
      const prereqIds = getPrereqIds(course.prereqs);
      const filteredPrereqIds = prereqIds.filter((prereqId) =>
        activeCourseIds.has(prereqId),
      );
      return filteredPrereqIds.map((prereqId) => ({
        id: `${prereqId}-${course.id}`,
        source: prereqId,
        target: course.id,
        type: "default",
      }));
    });

    const layoutedNodes = getLayoutedNodes(rawNodes, rawEdges, layoutOptions);

    return { layoutedNodes, rawEdges };
  }, [courses, activeCourseIds]);

  useEffect(() => {
    if (!layoutedNodes.length) return;

    const { styledNodes, styledEdges } = applyStylesToGraph(
      layoutedNodes,
      rawEdges,
      userGrades,
    );

    setNodes(styledNodes);
    setEdges(styledEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutedNodes, rawEdges]); // ← only run on layout changes

  useEffect(() => {
    setNodes((currentNodes) => {
      if (!currentNodes.length) return currentNodes;

      const { styledNodes, styledEdges } = applyStylesToGraph(
        currentNodes, // ← use current positions, not layoutedNodes
        rawEdges,
        userGrades,
        selectedNodeId,
      );

      setEdges(styledEdges);
      return styledNodes;
    });
  }, [userGrades, selectedNodeId, rawEdges, setNodes, setEdges]);

  const handleNodeClick = useCallback(
    (event, node) => {
      handleCloseCoursePicker();
      onNodeClick(node);
      setSelectedNodeId((prev) => (prev === node.id ? null : node.id));
    },
    [onNodeClick, handleCloseCoursePicker, setSelectedNodeId],
  );

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const handlePaneMove = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  return (
    <>
      <div style={containerStyle}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          onMove={handlePaneMove}
          colorMode="dark"
          fitView
          minZoom={0.1} // Allow zooming out significantly
          maxZoom={1.5} // Prevent zooming in too far
        >
          <MiniMap nodeStrokeWidth={3} zoomable pannable style={miniMapStyle} />
          <Background variant="dots" gap={25} size={1} />
          <MemoizedLegend />
          <NodeSearch />
          <ResetGraph onReset={onReset} />
        </ReactFlow>
      </div>
    </>
  );
}
