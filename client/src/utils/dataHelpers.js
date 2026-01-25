/**
 * Flattens a recursive prerequisite tree into a simple array of Course IDs.
 * Used for drawing edges in React Flow.
 * * @param {Object} prereqNode - The root of the prerequisite tree (or a branch).
 * @returns {Array<string>} - A list of unique Course IDs (e.g. ['CS110', 'MATH103'])
 */
export function getPrereqIds(prereqNode) {
  // 1. Safety check: If node is null/undefined, return empty array
  if (!prereqNode) return [];

  // 2. Base Case: It is a specific course
  if (prereqNode.type === 'course') {
    return [prereqNode.courseId];
  }

  // 3. Recursive Case: It is a Logic Group (AND / OR)
  if (prereqNode.type === 'logic') {
    // Run this function on every child operand
    // .flatMap() combines the results into one single array
    const childIds = prereqNode.operands.flatMap(operand => getPrereqIds(operand));
    
    // Remove duplicates (e.g. if MATH 110 is listed twice in complex logic)
    return [...new Set(childIds)];
  }

  return [];
}