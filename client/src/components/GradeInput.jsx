import { Input } from "@/components/ui/input";
import { SidebarSectionCard } from "./SidebarSectionCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUserGradesStore } from "@/stores/useUserGradesStore";
import { usePlannerUIStore } from "@/stores/usePlannerUIStore";

export function GradeInput({ selectedNode }) {
  const userGrades = useUserGradesStore((s) => s.userGrades);
  const setUserGrades = useUserGradesStore((s) => s.setGrade);
  const setSelectedNodeId = usePlannerUIStore((s) => s.setSelectedNodeId);

  const [grade, setGrade] = useState(
    selectedNode ? userGrades[selectedNode.id] || "" : "",
  );

  const handleGradeChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setGrade("");
      return;
    }

    const num = Number(value);
    if (Number.isInteger(num) && num >= 0 && num <= 100) setGrade(value);
  };

  const handleGradeSubmit = () => {
    setUserGrades(selectedNode.id, grade === "" ? null : Number(grade));
    setSelectedNodeId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGradeSubmit();
    }
  };

  return (
    <SidebarSectionCard title={"Add Grade"}>
      <div className="flex items-center gap-3">
        <Input
          type="text"
          value={grade}
          onChange={handleGradeChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter grade (0-100)"
        />
        <Button className="cursor-pointer" onClick={handleGradeSubmit}>
          Set
        </Button>
      </div>
    </SidebarSectionCard>
  );
}
