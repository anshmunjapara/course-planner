import { useCallback, useMemo, useState } from "react";
import { GraphView } from "./GraphView";
import { Sidebar } from "./Sidebar";
import { CoursePickerSidebar } from "./CoursePickerSidebar";
import { initialCourses } from "./coursesData";
import { Button } from "@/components/ui/button";

const requiredCourses = initialCourses.filter((c) => c.required);
const optionalCourses = initialCourses.filter((c) => !c.required);
const storedUserGrades = JSON.parse(
  localStorage.getItem("userGrades") || '{"MATH103": 60}',
);
const storedOptionalCourses = JSON.parse(
  localStorage.getItem("selectedOptionalCourses") || "[]",
);

export function CoursePlanner() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showCoursePicker, setShowCoursePicker] = useState(false);
  const [selectedOptionalCoursesIds, setSelectedOptionalCoursesIds] = useState(
    new Set(storedOptionalCourses),
  );

  const [userGrades, setUserGrades] = useState(storedUserGrades);

  const handleChangeGrade = (newGrade) => {
    setUserGrades((prevGrades) => {
      const newGrades = {
        ...prevGrades,
        [selectedNode.id]: parseFloat(newGrade),
      };
      localStorage.setItem("userGrades", JSON.stringify(newGrades));
      return newGrades;
    });
  };

  const handleShowCoursePicker = () => {
    setShowCoursePicker((prev) => !prev);
  };

  const handleCloseCoursePicker = () => {
    setShowCoursePicker(false);
  };

  const handleToggleOptionalCourse = useCallback((courseId) => {
    setSelectedOptionalCoursesIds((prev) => {
      const newSelectedCourses = new Set(prev);
      if (newSelectedCourses.has(courseId)) {
        newSelectedCourses.delete(courseId);
      } else {
        newSelectedCourses.add(courseId);
      }
      localStorage.setItem(
        "selectedOptionalCourses",
        JSON.stringify([...newSelectedCourses]),
      );
      return newSelectedCourses;
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
          handleCloseCoursePicker={handleCloseCoursePicker}
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
