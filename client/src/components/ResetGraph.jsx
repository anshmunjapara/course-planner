import { Panel } from "@xyflow/react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ResetGraph({ onReset }) {
  const handleReset = () => {
    localStorage.removeItem("userGrades");
    localStorage.removeItem("selectedOptionalCourses");
    onReset();
  };

  return (
    <Panel position="top-left">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="cursor-pointer">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuItem
            onClick={handleReset}
            className="cursor-pointer text-red-400"
          >
            Reset Graph
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Panel>
  );
}
