export function getEdgeStatus(
  targetCourseprereqs,
  sourceCourseId,
  userGradeSource,
) {
  const prereqCondition = getPrereqCondition(
    targetCourseprereqs,
    sourceCourseId,
  );

  if (!prereqCondition) {
    return { status: "clear", msg: "" };
  }

  const requiredGrade = prereqCondition.minGrade
    ? prereqCondition.minGrade
    : 50;

  let result = "clear";
  if (userGradeSource >= requiredGrade) {
    result = "clear";
  } else if (userGradeSource >= 50 && userGradeSource < requiredGrade) {
    result = "notClear";
  } else {
    result = "incomplete";
  }

  return { status: result, msg: `Requires minimum grade of ${requiredGrade}` };
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
