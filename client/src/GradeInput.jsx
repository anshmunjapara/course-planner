import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function GradeInput({ selectedNode, onChangeGrade, userGrades }) {
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
    onChangeGrade(grade);
  };

  return (
    <Card className="border-zinc-800/80 bg-zinc-900/40 shadow-none px-6">
      <h3 className="text-lg font-semibold uppercase text-zinc-400 ">
        Add Grade
      </h3>
      <div className="flex items-center gap-3">
        <Input
          type="text"
          value={grade}
          onChange={handleGradeChange}
          placeholder="Enter grade (0-100)"
        />
        <Button className="cursor-pointer" onClick={handleGradeSubmit}>
          Set
        </Button>
      </div>
    </Card>
  );
}
