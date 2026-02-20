import { BORDER_COLORS, OPACITY } from "./constants";
import { getEdgeStatus } from "./getEdgeStatus";

/**
 * Applies visual styles to edges based on status and highlight state.
 *
 * @param {Array} edges - React Flow edge objects
 * @param {Array} nodes - React Flow node objects (for prereq lookup)
 * @param {Object} statusMap - Map of nodeId → status string
 * @param {Object} grades - Map of courseId → grade
 * @param {Set|null} highlightedNodeIds - Set of node ids to highlight, or null for no highlighting
 * @returns {Array} Styled edge objects
 */
export function applyStylesToEdges(
  edges,
  nodes,
  statusMap,
  grades,
  highlightedNodeIds,
) {
  const isHighlighting = highlightedNodeIds !== null;

  // build a lookup for target nodes by id
  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  return edges.map((edge) => {
    const sourceStatus = statusMap[edge.source];
    const targetStatus = statusMap[edge.target];

    let edgeStatus = "locked";

    if (sourceStatus === "locked") {
      edgeStatus = "locked";
    } else if (sourceStatus === "completed" && targetStatus === "completed") {
      edgeStatus = "completed";
    } else {
      const targetNode = nodeById.get(edge.target);
      if (targetNode) {
        const result = getEdgeStatus(
          targetNode.data.prereqs,
          edge.source,
          grades[edge.source],
        );
        edgeStatus = result.status;
      }
    }

    const isAnimated = edgeStatus === "clear";

    let opacity;
    if (isHighlighting) {
      const bothInHighlight =
        highlightedNodeIds.has(edge.source) &&
        highlightedNodeIds.has(edge.target);
      opacity = bothInHighlight ? OPACITY.NORMAL : OPACITY.DIMMED_EDGE;
    } else {
      opacity = edgeStatus !== "locked" ? OPACITY.NORMAL : OPACITY.LOCKED_EDGE;
    }

    return {
      ...edge,
      animated: isAnimated,
      zIndex: -10,
      style: {
        stroke: BORDER_COLORS[edgeStatus],
        strokeWidth: 2.5,
        opacity,
        transition: "opacity 300ms ease-in-out",
      },
    };
  });
}
