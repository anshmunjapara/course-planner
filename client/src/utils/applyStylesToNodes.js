import { STATUS_COLORS, BORDER_COLORS, OPACITY } from "./constants";

/**
 * Applies visual styles to nodes based on their status and highlight state.
 *
 * @param {Array} nodes - React Flow node objects
 * @param {Object} statusMap - Map of nodeId → status string
 * @param {Set|null} highlightedNodeIds - Set of node ids to highlight, or null for no highlighting
 * @returns {Array} Styled node objects
 */
export function applyStylesToNodes(nodes, statusMap, highlightedNodeIds) {
  const isHighlighting = highlightedNodeIds !== null;

  return nodes.map((node) => {
    const status = statusMap[node.id] || "locked";

    let opacity;
    if (isHighlighting) {
      opacity = highlightedNodeIds.has(node.id) ? OPACITY.NORMAL : OPACITY.DIMMED_NODE;
    } else {
      opacity = status !== "locked" ? OPACITY.NORMAL : OPACITY.LOCKED;
    }

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
        opacity,
        transition: "opacity 300ms ease-in-out",
      },
    };
  });
}