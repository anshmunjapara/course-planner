import { useState } from "react";
import "./Sidebar.css";

export function Sidebar({ selectedNode, onChangeGrade, userGrades }) {
  const [grade, setGrade] = useState(
    selectedNode ? userGrades[selectedNode.id] || "" : "",
  );

  const handleGradeChange = (e) => {
    const value = e.target.value;
    setGrade(value);
  };

  const handleGradeSubmit = () => {
    onChangeGrade(grade);
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

        <div className="sidebar-section grade-section">
          <h3>Add Grade</h3>
          <div className="grade-input-container">
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Enter grade (0-100)"
              value={grade}
              onChange={handleGradeChange}
              className="grade-input"
            />
            <button onClick={handleGradeSubmit} className="grade-button">
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
