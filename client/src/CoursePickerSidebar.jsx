import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";

export function CoursePickerSidebar({
  optionalCourses,
  selectedOptionalCoursesIds,
  onToggleCourse,
}) {
  return (
    <div className="w-100 h-screen shrink-0 overflow-y-auto border-l border-zinc-00 bg-zinc-950 text-zinc-100 shadow-xl">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Elective Courses
        </h2>
        <p className="mt-1 text-sm font-medium text-zinc-400">
          {selectedOptionalCoursesIds.size} selected
        </p>
      </div>
      <div className="flex flex-col gap-2 px-4 pb-6">
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
