// src/utils/calculateCourseStatus.js

/**
 * Recursive function to evaluate if a prerequisite tree is satisfied.
 * @param {Object} node - The part of the tree to check (logic or course).
 * @param {Object} userGrades - Key-value pair of { CourseID: Grade }.
 * @returns {boolean} - True if satisfied, False if not.
 */
export function evaluatePrereq(node, userGrades) {
  // If no prereqs exist (null/undefined), it's automatically met.
  if (!node) return true;

  // BASE CASE: It is a specific course requirement
  if (node.type === "course") {
    const grade = userGrades[node.courseId];
    // Check if user has a grade AND it meets the minimum
    // (If minGrade is missing, assume 50)
    const requiredGrade = node.minGrade || 50;

    if (grade !== undefined && grade >= requiredGrade) {
      return true;
    }
    return false;
  }

  // RECURSIVE CASE: It is a logic group (AND / OR)
  if (node.type === "logic") {
    if (node.operator === "AND") {
      // ALL children must be true
      return node.operands.every((child) => evaluatePrereq(child, userGrades));
    } else if (node.operator === "OR") {
      // AT LEAST ONE child must be true
      return node.operands.some((child) => evaluatePrereq(child, userGrades));
    }
  }

  return false; // Fallback
}

/**
 * Determines the visual status of a course.
 */
export function getCourseStatus(courseNode, userGrades) {
  const grade = userGrades[courseNode.id];

  // If user already passed it -> COMPLETED
  if (grade !== undefined && grade >= 50) {
    return "completed";
  }

  if (grade !== undefined && grade < 50) {
    return "failed";
  }
  // If user hasn't passed, check if they are ALLOWED to take it
  const isUnlocked = evaluatePrereq(courseNode.data.prereqs, userGrades);

  if (isUnlocked) {
    return "available";
  }

  // 3. Otherwise -> LOCKED
  return "locked";
}
