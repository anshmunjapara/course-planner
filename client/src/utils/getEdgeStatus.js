export function getEdgeStatus(
  targetCoursePrereqLogic,
  sourceCourseId,
  userGradeSource,
) {
  const prereqCondition = getPrereqCondition(
    targetCoursePrereqLogic,
    sourceCourseId,
  );

  if (!prereqCondition) {
    return "available";
  }

  const requiredGrade = prereqCondition.minGrade;
  if (userGradeSource >= requiredGrade) {
    return "completed";
  } else if (userGradeSource >= 50 && userGradeSource < requiredGrade) {
    return "available";
  } else {
    return "locked";
  }
}

function getPrereqCondition(prereqNode, sourceCourseId) {
  if (!prereqNode) return {};

  if (prereqNode.type === "course" && prereqNode.courseId === sourceCourseId) {
    return { minGrade: prereqNode.minGrade };
  }

  // 3. Recursive Case: It is a Logic Group (AND / OR)
  if (prereqNode.type === "logic") {
    // Check each operand for the sourceCourseId
    for (const operand of prereqNode.operands) {
      const result = getPrereqCondition(operand, sourceCourseId);
      if (result) {
        return result;
      }
    }
  }
}
