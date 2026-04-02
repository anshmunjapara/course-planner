import { GraphView } from "../GraphView";
import { CourseInfoSidebar } from "../components/CourseInfoSidebar";
import { ResponsiveShell } from "../components/ResponsiveShell";
import { CoursePickerSidebar } from "../components/CoursePickerSidebar";
import { initialCourses } from "../coursesData";
import { getMissingCourses } from "../utils/getMissingCourses";
import { usePlannerUIStore } from "../stores/usePlannerUIStore";
import { useSelectedOptionalCourseIdStore } from "../stores/useSelectedOptionalCourseIdStore";
import { useMemo } from "react";

const requiredCourses = initialCourses.filter((c) => c.required);
const requiredCourseIds = new Set(requiredCourses.map((c) => c.id));
const optionalCourses = initialCourses.filter((c) => !c.required);
const optionalCourseIds = new Set(optionalCourses.map((c) => c.id));

const allRequiredCourses = [
  ...requiredCourses,
  ...getMissingCourses(requiredCourses, requiredCourseIds, optionalCourseIds),
];

const alloptionalCourses = [
  ...optionalCourses,
  ...getMissingCourses(optionalCourses, requiredCourseIds, optionalCourseIds),
];

export function CoursePlannerPage() {
  const selectedNode = usePlannerUIStore((s) => s.selectedNode);
  const showCoursePicker = usePlannerUIStore((s) => s.showCoursePicker);

  const selectedOptionalCourseIds = useSelectedOptionalCourseIdStore(
    (s) => s.selectedOptionalCourseIds,
  );

  const selectedOptionalCourseIdsSet = useMemo(
    () => new Set(selectedOptionalCourseIds),
    [selectedOptionalCourseIds],
  );

  const activeCourses = useMemo(() => {
    return [
      ...allRequiredCourses,
      ...alloptionalCourses.filter((c) =>
        selectedOptionalCourseIdsSet.has(c.id),
      ),
    ];
  }, [selectedOptionalCourseIdsSet]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ flex: 3.5, position: "relative" }}>
        <GraphView courses={activeCourses} />
      </div>

      <ResponsiveShell>
        {showCoursePicker ? (
          <CoursePickerSidebar optionalCourses={optionalCourses} />
        ) : (
          <CourseInfoSidebar key={selectedNode?.id || "empty"} />
        )}
      </ResponsiveShell>
    </div>
  );
}
