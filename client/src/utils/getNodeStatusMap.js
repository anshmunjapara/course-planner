import { getCourseStatus } from "./getCourseStatus";

export function getNodeStatusMap(nodes, grades) {
  const statusMap = {};

  nodes.forEach((node) => {
    const status = getCourseStatus(node, grades);
    statusMap[node.id] = status;
  });
  return statusMap;
}
