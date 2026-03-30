import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import { usePlannerUIStore } from "./stores/usePlannerUIStore";
import { useSelectedOptionalCourseIdStore } from "./stores/useSelectedOptionalCourseIdStore";
import { useCallback } from "react";

export function CoursePickerSidebar({ optionalCourses }) {
  const setShowCoursePicker = usePlannerUIStore((s) => s.setShowCoursePicker);

  const toggleOptionalCourse = useSelectedOptionalCourseIdStore(
    (s) => s.toggleOptionalCourse,
  );

  const selectedOptionalCourseIds = useSelectedOptionalCourseIdStore(
    (s) => s.selectedOptionalCourseIds,
  );

  const handleOnToggleCourse = useCallback(
    (courseId) => {
      toggleOptionalCourse(courseId);
    },
    [toggleOptionalCourse],
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
          const isSelected = selectedOptionalCourseIds.includes(course.id);
          return (
            <FieldLabel
              key={course.id}
              className="cursor-pointer transition ease-in-out py-1"
            >
              <Field orientation="horizontal">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handleOnToggleCourse(course.id)}
                />

                <FieldTitle>{course.label}</FieldTitle>
              </Field>
            </FieldLabel>
          );
        })}
      </div>
    </>
  );
}
