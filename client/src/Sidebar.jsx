import { GradeInput } from "./GradeInput";
import { getPrereqIds } from "./utils/convertPrereqTreeIntoArray";
import { getEdgeStatus } from "./utils/getEdgeStatus";
import "./Sidebar.css";

export function Sidebar({ selectedNode, onChangeGrade, userGrades }) {
  const handleGradeSubmit = (newGrade) => {
    onChangeGrade(newGrade);
  };

  if (!selectedNode) {
    return (
      <div className="sidebar">
        <div className="sidebar-empty">
          <p>Click on a course to view details</p>
        </div>
      </div>
    );
  }

  const prereqList = getPrereqIds(selectedNode.data.prereqs);
  const prereqListWithStatus = prereqList.map((prereqId) => {
    const status = getEdgeStatus(
      selectedNode.data.prereqs,
      prereqId,
      userGrades[prereqId],
    );

    return { prereqId, status };
  });

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-title">{selectedNode.data.label}</h2>

        {selectedNode.data.description && (
          <div className="sidebar-section">
            <h3>Description</h3>
            <p>{selectedNode.data.description}</p>
          </div>
        )}

        {selectedNode.data.status !== "locked" && (
          <div className="sidebar-section grade-section">
            <GradeInput
              selectedNode={selectedNode}
              onChangeGrade={handleGradeSubmit}
              userGrades={userGrades}
            />
          </div>
        )}

        {selectedNode.data.prereqs && (
          <div className="sidebar-section">
            <h3>Prerequisites</h3>
            <div className="prereq-list">
              {prereqListWithStatus.length === 0 ? (
                <p className="prereq-empty">No prerequisites</p>
              ) : (
                prereqListWithStatus.map(({ prereqId, status }) => (
                  <div
                    key={prereqId}
                    className={`prereq-item prereq-${status}`}
                  >
                    <span className="prereq-id">{prereqId}</span>
                    <span className="prereq-status">{status}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
