import { usePlannerUIStore } from "../stores/usePlannerUIStore";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

export function AddMoreCoursesButton() {
  const showCoursePicker = usePlannerUIStore((s) => s.showCoursePicker);
  const setShowCoursePicker = usePlannerUIStore((s) => s.setShowCoursePicker);

  const handleShowCoursePicker = useCallback(() => {
    setShowCoursePicker();
  }, [setShowCoursePicker]);

  return (
    <Button
      onClick={handleShowCoursePicker}
      className="z-10 font-semibold shadow-md shadow-black/30 animate-pulse cursor-pointer"
      variant={showCoursePicker ? "secondary" : undefined}
    >
      {showCoursePicker ? "Close Course Picker" : "+ More CS Courses"}
    </Button>
  );
}
