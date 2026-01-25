import { useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import { initialCourses } from "./coursesData";
import { getLayoutedNodes } from "./utils/layoutCalculator";
import { getPrereqIds } from "./utils/dataHelpers";
import { getCourseStatus } from "./utils/calculateCourseStatus";
import { STATUS_COLORS, BORDER_COLORS } from "./utils/constants";
import "@xyflow/react/dist/style.css";

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const [userGrades] = useState({
    CS110: 85,
    MATH103: 60,
    CS115: 90,
    MATH110: 85,
    CS210: 85,
    STAT160: 90,
  });

  useEffect(() => {
    const statusMap = {};
    const flowNodes = initialCourses.map((course) => {
      // get the status if course is [completed, locked, available]
      const status = getCourseStatus(course, userGrades);
      statusMap[course.id] = status;

      return {
        id: course.id,
        data: {
          label: course.label,
          prereqLogic: course.prereqs,
          status: status,
        },
        position: { x: 0, y: 0 },
        style: {
          background: STATUS_COLORS[status],
          border: `2px solid ${BORDER_COLORS[status]}`,
          borderRadius: "5px",
          width: 172,
          fontSize: "12px",
          padding: "5px",
          textAlign: "center",
        },
      };
    });

    const flowEdges = [];
    initialCourses.forEach((course) => {
      const prereqIds = getPrereqIds(course.prereqs);
      prereqIds.forEach((prereqId) => {
        const isAnimated = statusMap[prereqId] === "available";

        flowEdges.push({
          id: `${prereqId}-${course.id}`,
          source: prereqId,
          target: course.id,
          type: "default",
          animated: isAnimated,
          zIndex: isAnimated ? 10 : 0,
          style: {
            stroke: BORDER_COLORS[statusMap[prereqId]],
            strokeWidth: isAnimated ? 2.5 : 1,
          },
        });
      });
    });
    const layoutedNodes = getLayoutedNodes(flowNodes, flowEdges);
    setNodes(layoutedNodes);
    setEdges(flowEdges);
  }, []);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          colorMode="dark"
          fitView
        >
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}

export default App;
