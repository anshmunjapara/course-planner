import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";

export function CoursePickerSidebar({
  optionalCourses,
  selectedOptionalCoursesIds,
  onToggleCourse,
  handleShowCoursePicker,
}) {
  return (
    <div className="flex-1 flex flex-col w-100 h-screen shrink-0 border-l border-zinc-00 bg-zinc-950 text-zinc-100 shadow-xl">
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
          {selectedOptionalCoursesIds.size} selected
        </p>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto gap-2 px-4 pb-6">
        {optionalCourses.map((course) => {
          const isSelected = selectedOptionalCoursesIds.has(course.id);
          return (
            <FieldLabel
              key={course.id}
              className="cursor-pointer transition ease-in-out py-1"
            >
              <Field orientation="horizontal">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onToggleCourse(course.id)}
                />

                <FieldTitle>{course.label}</FieldTitle>
              </Field>
            </FieldLabel>
          );
        })}
      </div>
    </div>
  );
}
