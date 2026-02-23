import { getPrereqIds } from "./convertPrereqTreeIntoArray";

export function getMissingCourses(
  coursesList,
  requiredCourseIdSet,
  optionalCourseIdSet,
) {
  const newCoursesToAdd = new Set();
  coursesList.forEach((course) => {
    const prereqs = getPrereqIds(course.prereqs);
    prereqs.forEach((courseId) => {
      if (
        !requiredCourseIdSet.has(courseId) &&
        !optionalCourseIdSet.has(courseId)
      ) {
        newCoursesToAdd.add(courseId);
      }
    });
  });

  return [...newCoursesToAdd].map((courseId) => ({
    id: courseId,
    label: courseId,
    description: "No info available. Please refer to UofR's site.",
    prereqs: null,
  }));
}
