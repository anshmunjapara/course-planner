import { useState } from "react";

export function GradeInput({ selectedNode, onChangeGrade, userGrades }) {
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

  return (
    <>
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
    </>
  );
}
