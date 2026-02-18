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

    if (node.type === "logic") {
      if (node.operator === "AND") {
        node.operands.forEach((operand) => traverse(operand, isInsideOr));
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
