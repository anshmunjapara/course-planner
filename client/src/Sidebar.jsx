import { GradeInput } from "./GradeInput";
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
      </div>
    </div>
  );
}
