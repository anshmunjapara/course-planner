import { useCallback, useMemo, useState } from "react";
import { GraphView } from "./GraphView";
import { Sidebar } from "./Sidebar";
import { CoursePickerSidebar } from "./CoursePickerSidebar";
import { initialCourses } from "./coursesData";

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
        <button
          onClick={() => setShowCoursePicker((prev) => !prev)}
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 10,
            padding: "10px 18px",
            background: showCoursePicker
              ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
              : "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            color: "#fff",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "all 0.2s ease",
          }}
        >
          {showCoursePicker ? "Close Course Picker" : "+ Add More Courses"}
        </button>
        <GraphView
          userGrades={userGrades}
          onNodeClick={setSelectedNode}
          courses={activeCourses}
        />
      </div>
      {showCoursePicker && (
        <CoursePickerSidebar
          optionalCourses={optionalCourses}
          selectedOptionalCoursesIds={selectedOptionalCoursesIds}
          onToggleCourse={handleToggleOptionalCourse}
        />
      )}
      {!showCoursePicker && (
        <Sidebar
          key={selectedNode?.id || "empty"}
          selectedNode={selectedNode}
          onChangeGrade={handleChangeGrade}
          userGrades={userGrades}
        />
      )}
    </div>
  );
}
