import { useCallback, useMemo, useState } from "react";
import { GraphView } from "./GraphView";
import { Sidebar } from "./Sidebar";
import { CoursePickerSidebar } from "./CoursePickerSidebar";
import { initialCourses } from "./coursesData";
import { getMissingCourses } from "./utils/getMissingCourses";
import { getAncestorIds } from "./utils/getAncestorIds";
import { Button } from "@/components/ui/button";

const requiredCourses = initialCourses.filter((c) => c.required);
const requiredCourseIds = new Set(requiredCourses.map((c) => c.id));
const allRequiredCourses = [
  ...requiredCourses,
  ...getMissingCourses(requiredCourses, requiredCourseIds),
];
console.log(allRequiredCourses);
const optionalCourses = initialCourses.filter((c) => !c.required);
const optionalCourseIds = new Set(optionalCourses.map((c) => c.id));
const alloptionalCourses = [
  ...optionalCourses,
  ...getMissingCourses(optionalCourses, optionalCourseIds),
];

const storedUserGrades = JSON.parse(localStorage.getItem("userGrades") || "{}");
const storedOptionalCourses = JSON.parse(
  localStorage.getItem("selectedOptionalCourses") || "[]",
);

export function CoursePlanner() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showCoursePicker, setShowCoursePicker] = useState(false);
  const [selectedOptionalCoursesIds, setSelectedOptionalCoursesIds] = useState(
    new Set(storedOptionalCourses),
  );

  const [userGrades, setUserGrades] = useState(storedUserGrades);

  const handleReset = useCallback(() => {
    setUserGrades({});
    setSelectedOptionalCoursesIds(new Set());
    setSelectedNode(null);
    setSelectedNodeId(null);
    setShowCoursePicker(false);
  }, []);

  const handleChangeGrade = useCallback(
    (newGrade) => {
      setUserGrades((prevGrades) => {
        const newGrades = {
          ...prevGrades,
          [selectedNode.id]: parseFloat(newGrade),
        };
        localStorage.setItem("userGrades", JSON.stringify(newGrades));
        return newGrades;
      });
      setSelectedNodeId(null);
    },
    [selectedNode],
  );

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
        const allAncestors = getAncestorIds(initialCourses, courseId);
        newSelectedCourses.add(courseId);
        allAncestors.forEach((id) => {
          if (!requiredCourseIds.has(id)) {
            newSelectedCourses.add(id);
          }
        });
      }
      localStorage.setItem(
        "selectedOptionalCourses",
        JSON.stringify([...newSelectedCourses]),
      );
      console.log(newSelectedCourses);
      return newSelectedCourses;
    });
  }, []);

  const activeCourses = useMemo(() => {
    return [
      ...allRequiredCourses,
      ...alloptionalCourses.filter((c) => selectedOptionalCoursesIds.has(c.id)),
    ];
  }, [selectedOptionalCoursesIds]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ flex: 3.5, position: "relative" }}>
        <Button
          onClick={handleShowCoursePicker}
          className="absolute right-4 top-4 z-10 ont-semibold shadow-md shadow-black/30 animate-pulse cursor-pointer"
          variant={showCoursePicker ? "secondary" : ""}
        >
          {showCoursePicker ? "Close Course Picker" : "+ More CS Courses"}
        </Button>

        <GraphView
          userGrades={userGrades}
          onNodeClick={setSelectedNode}
          courses={activeCourses}
          handleCloseCoursePicker={handleCloseCoursePicker}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
          onReset={handleReset}
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
