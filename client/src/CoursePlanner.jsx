import { useCallback, useMemo, useState } from "react";
import { GraphView } from "./GraphView";
import { Sidebar } from "./Sidebar";
import { CoursePickerSidebar } from "./CoursePickerSidebar";
import { initialCourses } from "./coursesData";
import { Button } from "@/components/ui/button";

const requiredCourses = initialCourses.filter((c) => c.required);
const optionalCourses = initialCourses.filter((c) => !c.required);

export function CoursePlanner() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showCoursePicker, setShowCoursePicker] = useState(false);
  const [selectedOptionalCoursesIds, setSelectedOptionalCoursesIds] = useState(
    new Set(),
  );

  const [userGrades, setUserGrades] = useState({
    MATH103: 60,
  });

  const handleChangeGrade = (newGrade) => {
    setUserGrades((prevGrades) => {
      return {
        ...prevGrades,
        [selectedNode.id]: parseFloat(newGrade),
      };
    });
  };
  const handleShowCoursePicker = () => {
    setShowCoursePicker((prev) => !prev);
  };
  const handleToggleOptionalCourse = useCallback((courseId) => {
    setSelectedOptionalCoursesIds((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  }, []);

  const activeCourses = useMemo(() => {
    return [
      ...requiredCourses,
      ...optionalCourses.filter((c) => selectedOptionalCoursesIds.has(c.id)),
    ];
  }, [selectedOptionalCoursesIds]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ flex: 1, position: "relative" }}>
        <Button
          onClick={handleShowCoursePicker}
          className="absolute right-4 top-4 z-10 ont-semibold shadow-md shadow-black/30 cursor-pointer"
          variant={showCoursePicker ? "secondary" : ""}
        >
          {showCoursePicker ? "Close Course Picker" : "+ Add More Courses"}
        </Button>

        <GraphView
          userGrades={userGrades}
          onNodeClick={setSelectedNode}
          courses={activeCourses}
        />
      </div>

      {!showCoursePicker && (
        <Sidebar
          key={selectedNode?.id || "empty"}
          selectedNode={selectedNode}
          onChangeGrade={handleChangeGrade}
          userGrades={userGrades}
        />
      )}

      {showCoursePicker && (
        <CoursePickerSidebar
          handleShowCoursePicker={handleShowCoursePicker}
          optionalCourses={optionalCourses}
          selectedOptionalCoursesIds={selectedOptionalCoursesIds}
          onToggleCourse={handleToggleOptionalCourse}
        />
      )}
    </div>
  );
}
