import { getCourseStatus } from "./getCourseStatus";
import { STATUS_COLORS, BORDER_COLORS } from "./constants";
import { getEdgeStatus } from "./getEdgeStatus";

export const applyStyles = (nodes, edges, grades) => {
  const statusMap = {};

  // Style Nodes
  const styledNodes = nodes.map((node) => {
    const status = getCourseStatus(node, grades);
    statusMap[node.id] = status;

    return {
      ...node,
      data: { ...node.data, status },
      style: {
        background: STATUS_COLORS[status],
        border: `2px solid ${BORDER_COLORS[status]}`,
        borderRadius: "5px",
        width: 172,
        fontSize: "18px",
        padding: "10px",
        textAlign: "center",
        opacity: status !== "locked" ? 1 : 0.4,
      },
    };
  });

  // Style Edges
  const styledEdges = edges.map((edge) => {
    const targetStatus = statusMap[edge.target];
    const sourceStatus = statusMap[edge.source];
    let edgeStatus = "locked";

    if (sourceStatus === "locked") {
      edgeStatus = "locked";
    } else if (sourceStatus === targetStatus && sourceStatus === "completed") {
      edgeStatus = "completed";
    } else {
      const targetCourseNode = nodes.find((n) => n.id === edge.target);
      const edgeStatusResult = getEdgeStatus(
        targetCourseNode.data.prereqs,
        edge.source,
        grades[edge.source],
      );
      edgeStatus = edgeStatusResult.status;
    }

    const isAnimated = edgeStatus === "clear";

    return {
      ...edge,
      animated: isAnimated,
      zIndex: -10,
      style: {
        stroke: BORDER_COLORS[edgeStatus],
        strokeWidth: 2.5,
        opacity: edgeStatus !== "locked" ? 1 : 0.3,
      },
    };
  });

  return { styledNodes, styledEdges };
};
