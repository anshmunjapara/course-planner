import { getNodeStatusMap } from "./getNodeStatusMap";
import { getAncestorIds } from "./getAncestorIds";
import { applyStylesToNodes } from "./applyStylesToNodes";
import { applyStylesToEdges } from "./applyStylesToEdges";

/**
 * Applies all visual styles to the graph (nodes + edges).
 *
 * @param {Array} nodes - React Flow node objects
 * @param {Array} edges - React Flow edge objects
 * @param {Object} grades - Map of courseId → grade
 * @param {string|null} selectedNodeId - Currently selected node id, or null
 * @returns {{ styledNodes: Array, styledEdges: Array }}
 */
export function applyStylesToGraph(
  nodes,
  edges,
  grades,
  selectedNodeId = null,
) {
  const statusMap = getNodeStatusMap(nodes, grades);

  // Compute which nodes should be highlighted
  let highlightedNodeIds = null;

  if (selectedNodeId) {
    const ancestors = getAncestorIds(nodes, selectedNodeId);
    highlightedNodeIds = new Set(ancestors);
    highlightedNodeIds.add(selectedNodeId);
  }

  const styledNodes = applyStylesToNodes(nodes, statusMap, highlightedNodeIds);
  const styledEdges = applyStylesToEdges(
    edges,
    nodes,
    statusMap,
    grades,
    highlightedNodeIds,
  );

  return { styledNodes, styledEdges };
}
