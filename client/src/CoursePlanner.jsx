import { useMemo, useState } from "react";
import { GraphView } from "./GraphView";
import { Sidebar } from "./Sidebar";
import { initialCourses } from "./coursesData";

const requiredCourses = initialCourses.filter((c) => c.required);
const optionalCourses = initialCourses.filter((c) => !c.required);

export function CoursePlanner() {
  const [selectedNode, setSelectedNode] = useState(null);
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

  const activeCourses = useMemo(() => {
    return [
      ...requiredCourses,
      ...optionalCourses.filter((c) => selectedOptionalCoursesIds.has(c.id)),
    ];
  }, [selectedOptionalCoursesIds]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <GraphView
          userGrades={userGrades}
          onNodeClick={setSelectedNode}
          courses={activeCourses}
        />
      </div>
      <Sidebar
        key={selectedNode?.id || "empty"}
        selectedNode={selectedNode}
        onChangeGrade={handleChangeGrade}
        userGrades={userGrades}
      />
    </div>
  );
}
