import dagre from "@dagrejs/dagre";

const nodeWidth = 150;
const nodeHeight = 150;

export const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: "TB",
    // nodesep: 80, // Horizontal space between nodes (default is 50)
    // ranksep: 100, // Vertical space between levels (default is 50)
  });

  // Feed nodes to Dagre
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // Feed edges to Dagre
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate Layout
  dagre.layout(dagreGraph);

  // Return nodes with new X/Y positions
  // We shift position because Dagre anchors center, React Flow anchors top-left
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return layoutedNodes;
};
