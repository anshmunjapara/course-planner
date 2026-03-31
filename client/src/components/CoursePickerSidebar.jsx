import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import { usePlannerUIStore } from "../stores/usePlannerUIStore";
import { useSelectedOptionalCourseIdStore } from "../stores/useSelectedOptionalCourseIdStore";
import { useCallback, useMemo, memo } from "react";

const CourseRow = memo(function CourseRow({ course, checked, onToggle }) {
  const handleCheckedChange = useCallback(() => {
    onToggle(course.id);
  }, [onToggle, course.id]);

  return (
    <FieldLabel className="cursor-pointer transition ease-in-out py-1">
      <Field orientation="horizontal">
        <Checkbox checked={checked} onCheckedChange={handleCheckedChange} />
        <FieldTitle>{course.label}</FieldTitle>
      </Field>
    </FieldLabel>
  );
});

export function CoursePickerSidebar({ optionalCourses }) {
  const setShowCoursePicker = usePlannerUIStore((s) => s.setShowCoursePicker);

  const toggleOptionalCourse = useSelectedOptionalCourseIdStore(
    (s) => s.toggleOptionalCourse,
  );

  const selectedOptionalCourseIds = useSelectedOptionalCourseIdStore(
    (s) => s.selectedOptionalCourseIds,
  );

  const selectedSet = useMemo(
    () => new Set(selectedOptionalCourseIds),
    [selectedOptionalCourseIds],
  );

  const handleShowCoursePicker = useCallback(() => {
    setShowCoursePicker();
  }, [setShowCoursePicker]);

  return (
    <>
      <div className="px-6 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Elective Courses
          </h2>
          <Button
            variant="ghost"
            onClick={handleShowCoursePicker}
            className="cursor-pointer"
          >
            X
          </Button>
        </div>
        <p className="mt-1 text-sm font-medium text-zinc-400">
          {selectedOptionalCourseIds.length} selected
        </p>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto gap-2 px-4 pb-6">
        {optionalCourses.map((course) => {
          return (
            <CourseRow
              key={course.id}
              course={course}
              checked={selectedSet.has(course.id)}
              onToggle={toggleOptionalCourse}
            />
          );
        })}
      </div>
    </>
  );
}
