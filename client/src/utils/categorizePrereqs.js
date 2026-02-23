export function categorizePrereqs(prereqNode) {
  const result = {
    required: [],
    choiceGroups: [], // Array of arrays, e.g., [['STAT160', 'STAT200']]
  };

  if (!prereqNode) return result;
  function traverse(node, isInsideOr = false) {
    if (node.type === "course") {
      if (isInsideOr) {
        return [node.courseId];
      } else {
        result.required.push(node.courseId);
        return [node.courseId];
      }
    }

    if (node.type === "credit_hours") {
      const item = { type: "credit_hours", value: node.value };
      if (isInsideOr) {
        return [item];
      }
      result.required.push(item);
      return [];
    }

    if (node.type === "permission") {
      const item = {
        type: "permission",
        description: node.description || node.detail || "Permission required",
      };
      if (isInsideOr) {
        return [item];
      }
      result.required.push(item);
      return [];
    }

    if (node.type === "logic") {
      if (node.operator === "AND") {
        node.operands.forEach((operand) => traverse(operand, false));
      } else if (node.operator === "OR") {
        const options = node.operands.flatMap((operand) =>
          traverse(operand, true),
        );
        result.choiceGroups.push([...new Set(options)]);
      }
    }
  }

  traverse(prereqNode);
  return result;
}
