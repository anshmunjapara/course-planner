import cytoscape from "cytoscape";
import klay from "cytoscape-klay";

cytoscape.use(klay);

const nodeWidth = 150;
const nodeHeight = 150;

export const getLayoutedNodes = (
  nodes,
  edges,
  layoutOptions = { name: "grid" },
) => {
  const cy = cytoscape({
    headless: true,
    styleEnabled: true,
    elements: [
      ...nodes.map((node) => ({
        data: { id: node.id },
        // Apply dimensions via style so the layout algorithm respects them
        style: {
          width: nodeWidth,
          height: nodeHeight,
          shape: "rectangle",
        },
      })),

      // Convert your edges to Cytoscape format
      ...edges.map((edge) => ({
        data: {
          source: edge.source,
          target: edge.target,
          id: edge.id,
        },
      })),
    ],
  });

  cy.layout({
    ...(typeof layoutOptions === "string"
      ? { name: layoutOptions }
      : layoutOptions),

    // IMPORTANT: animate must be false for synchronous calculation
    animate: false,

    // Helps with spacing in some layouts
    nodeDimensionsIncludeLabels: true,
    fit: true,
  }).run();

  const layoutedNodes = nodes.map((node) => {
    // Get the node from Cytoscape
    const cyNode = cy.getElementById(node.id);
    const position = cyNode.position();

    return {
      ...node,
      // 4. Shift Position
      // Cytoscape anchors at Center (0,0 is center of node)
      // React Flow anchors at Top-Left (0,0 is top-left corner)
      position: {
        x: position.x - nodeWidth / 2,
        y: position.y - nodeHeight / 2,
      },
    };
  });

  return layoutedNodes;
};
