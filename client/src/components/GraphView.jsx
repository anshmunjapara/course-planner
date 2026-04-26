import { ReactFlow, Background, MiniMap } from "@xyflow/react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import { useCallback, useEffect, useMemo, memo } from "react";
import { Legend } from "./Legend";
import { applyStylesToGraph } from "../utils/applyStylesToGraph";
import { getLayoutedNodes } from "../utils/cytoscapeLayoutCalculator";
import { getPrereqIds } from "../utils/convertPrereqTreeIntoArray";
import "@xyflow/react/dist/style.css";
import { useUserGradesStore } from "../stores/useUserGradesStore";
import { usePlannerUIStore } from "../stores/usePlannerUIStore";
import { TopPanel } from "./TopPanel";
import { useIsMobile } from "../hooks/useIsMobile";

const containerStyle = { width: "100%", height: "100dvh", overflow: "hidden" };
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
const MemoizedTopPanel = memo(TopPanel);

export function GraphView({ courses }) {
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

    const activeCourseIds = new Set(courses.map((c) => c.id));

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
  }, [courses]);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges] = useEdgesState(rawEdges);

  const userGrades = useUserGradesStore((state) => state.userGrades);
  const selectedNodeId = usePlannerUIStore((s) => s.selectedNodeId);
  const setSelectedNode = usePlannerUIStore((s) => s.setSelectedNode);
  const setSelectedNodeId = usePlannerUIStore((s) => s.setSelectedNodeId);
  const setShowCoursePicker = usePlannerUIStore((s) => s.setShowCoursePicker);

  const isMobile = useIsMobile();

  useEffect(() => {
    setNodes((currentNodes) => {
      const currentIds = new Set(currentNodes.map((n) => n.id));
      const layoutedIds = new Set(layoutedNodes.map((n) => n.id));

      const nodeSetChanged =
        currentIds.size !== layoutedIds.size ||
        [...layoutedIds].some((id) => !currentIds.has(id));

      // If courses changed (new/removed nodes), rebuild from layouted nodes.
      // Otherwise keep current positions and only restyle.
      const baseNodes = nodeSetChanged ? layoutedNodes : currentNodes;

      const { styledNodes, styledEdges } = applyStylesToGraph(
        baseNodes,
        rawEdges,
        userGrades,
        selectedNodeId,
      );

      setEdges(styledEdges);
      return styledNodes;
    });
  }, [layoutedNodes, rawEdges, userGrades, selectedNodeId, setNodes, setEdges]);

  const handleNodeClick = useCallback(
    (event, node) => {
      setShowCoursePicker(false);
      setSelectedNode(node);
      setSelectedNodeId(node.id);
    },
    [setSelectedNode, setSelectedNodeId, setShowCoursePicker],
  );

  const handlePaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const handlePaneMoveStart = useCallback(() => {
    if (selectedNodeId !== null) setSelectedNodeId(null);
  }, [selectedNodeId, setSelectedNodeId]);

  return (
    <>
      <div style={containerStyle}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          onMoveStart={handlePaneMoveStart}
          colorMode="dark"
          fitView
          fitViewOptions={{
            padding: 0.5,
            duration: 800,
          }}
          minZoom={0.1} // Allow zooming out significantly
          maxZoom={1.5} // Prevent zooming in too far
          proOptions={{ hideAttribution: true }}
        >
          {!isMobile && (
            <MiniMap
              nodeStrokeWidth={3}
              zoomable
              pannable
              style={miniMapStyle}
            />
          )}

          <Background variant="dots" gap={25} size={1} />
          <MemoizedLegend />
          <MemoizedTopPanel />
        </ReactFlow>
      </div>
    </>
  );
}
