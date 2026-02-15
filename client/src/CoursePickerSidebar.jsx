import "./CoursePickerSidebar.css";

export function CoursePickerSidebar({
  optionalCourses,
  selectedOptionalCoursesIds,
  onToggleCourse,
}) {
  return (
    <div className="course-picker-sidebar">
      <div className="course-picker-header">
        <h2>Elective Courses</h2>
        <p className="course-picker-subtitle">
          {selectedOptionalCoursesIds.length} selected
        </p>
      </div>
      <div className="course-picker-list">
        {optionalCourses.map((course) => {
          const isSelected = selectedOptionalCoursesIds.has(course.id);
          return (
            <label
              key={course.id}
              className={`course-picker-item ${isSelected ? "selected" : ""}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleCourse(course.id)}
                className="course-picker-checkbox"
              />
              <div className="course-picker-info">
                <span className="course-picker-id">{course.id}</span>
                <span className="course-picker-label">{course.label}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
