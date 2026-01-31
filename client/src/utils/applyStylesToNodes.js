import { getCourseStatus } from "./calculateCourseStatus";
import { STATUS_COLORS, BORDER_COLORS } from "./constants";
export const applyStyles = (nodes, edges, grades, courses) => {
  const statusMap = {};

  // Style Nodes
  const styledNodes = nodes.map((node) => {
    const course = courses.find((c) => c.id === node.id);
    const status = getCourseStatus(course, grades);
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
      },
    };
  });

  // Style Edges
  const styledEdges = edges.map((edge) => {
    const targetStatus = statusMap[edge.target];
    const isAnimated = targetStatus === "available";

    return {
      ...edge,
      animated: isAnimated,
      zIndex: isAnimated ? 10 : 0,
      style: {
        stroke: BORDER_COLORS[targetStatus],
        strokeWidth: isAnimated ? 2.5 : 2,
        opacity: isAnimated ? 1 : 0.7,
      },
    };
  });

  return { styledNodes, styledEdges };
};
