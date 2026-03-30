import { useCallback, useMemo, useState } from "react";
import { GraphView } from "./GraphView";
import { CourseInfoSidebar } from "./CourseInfoSidebar";
import { ResponsiveShell } from "./components/ResponsiveShell";
import { CoursePickerSidebar } from "./CoursePickerSidebar";
import { initialCourses } from "./coursesData";
import { getMissingCourses } from "./utils/getMissingCourses";
import { getAncestorIds } from "./utils/getAncestorIds";
import { Button } from "@/components/ui/button";
import { useUserGradesStore } from "./stores/useUserGradesStore";

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
  const setUserGrades = useUserGradesStore((state) => state.setGrade);
  const resetUserGrades = useUserGradesStore((state) => state.resetGrades);

  const isPanelOpen = !!selectedNode || showCoursePicker;
  const handlePanelChange = (open) => {
    if (!open) {
      setSelectedNode(null);
      setSelectedNodeId(null);
      setShowCoursePicker(false);
    }
  };

  const handleReset = useCallback(() => {
    resetUserGrades();
    setSelectedOptionalCoursesIds(new Set());
    setSelectedNode(null);
    setSelectedNodeId(null);
    setShowCoursePicker(false);
  }, [resetUserGrades]);

  const handleChangeGrade = useCallback(
    (newGrade) => {
      if (!selectedNode?.id) return;
      setUserGrades(selectedNode.id, parseFloat(newGrade));
      setSelectedNodeId(null);
    },
    [selectedNode, setUserGrades],
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
          onNodeClick={setSelectedNode}
          courses={activeCourses}
          handleCloseCoursePicker={handleCloseCoursePicker}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
          onReset={handleReset}
        />
      </div>

      <ResponsiveShell open={isPanelOpen} onOpenChange={handlePanelChange}>
        {showCoursePicker ? (
          <CoursePickerSidebar
            handleShowCoursePicker={handleShowCoursePicker}
            optionalCourses={optionalCourses}
            selectedOptionalCoursesIds={selectedOptionalCoursesIds}
            onToggleCourse={handleToggleOptionalCourse}
          />
        ) : (
          <CourseInfoSidebar
            key={selectedNode?.id || "empty"}
            selectedNode={selectedNode}
            onChangeGrade={handleChangeGrade}
          />
        )}
      </ResponsiveShell>
    </div>
  );
}
