import { Panel } from "@xyflow/react";
import { ResetGraph } from "./ResetGraph";
import { NodeSearch } from "./NodeSearch";
import { AddMoreCoursesButton } from "./AddMoreCoursesButton";

export function TopPanel() {
  return (
    <Panel
      position="top-center"
      className="flex justify-between items-start w-full gap-5 px-5"
    >
      <ResetGraph />
      <div className="w-full max-w-sm">
        <NodeSearch />
      </div>
      <AddMoreCoursesButton />
    </Panel>
  );
}
