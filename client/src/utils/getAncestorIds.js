import { getPrereqIds } from "./convertPrereqTreeIntoArray";

export function getAncestorIds(allCourses, selectedCourseId) {
  const courseNode = allCourses.find((c) => c.id === selectedCourseId);
  if (!courseNode) return [];

  const prereqIds = getPrereqIds(courseNode.data.prereqs);
  const ancestorIds = new Set(prereqIds);

  // Recursively find ancestors of each prerequisite
  prereqIds.forEach((prereqId) => {
    const prereqAncestors = getAncestorIds(allCourses, prereqId);
    prereqAncestors.forEach((id) => ancestorIds.add(id));
  });

  return Array.from(ancestorIds);
}
