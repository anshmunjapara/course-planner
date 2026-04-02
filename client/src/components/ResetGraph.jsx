import { Button } from "./ui/button";
import { Menu, RotateCcw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePlannerUIStore } from "@/stores/usePlannerUIStore";

export function ResetGraph() {
  const resetUI = usePlannerUIStore((s) => s.resetUI);

  const handleReset = () => resetUI();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="cursor-pointer">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={handleReset}
          className="cursor-pointer text-red-400"
        >
          <RotateCcw className="text-red-400" />
          Reset Graph
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
