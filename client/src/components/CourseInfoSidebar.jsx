import { GradeInput } from "./GradeInput";
import { SidebarSectionCard } from "./SidebarSectionCard";
import { PrerequisitesSection } from "./PrerequisitesSection";
import { usePlannerUIStore } from "../stores/usePlannerUIStore";

export function CourseInfoSidebar() {
  const selectedNode = usePlannerUIStore((s) => s.selectedNode);

  if (!selectedNode) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-m font-medium text-zinc-400">
        <p>Click on a course to view details</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7 px-4 py-8">
      <h2 className="text-2xl font-semibold tracking-wide text-white">
        {selectedNode.data.label}
      </h2>

      {selectedNode.data.description && (
        <SidebarSectionCard title={"Description"}>
          {selectedNode.data.description}
        </SidebarSectionCard>
      )}

      {selectedNode.data.status !== "locked" && (
        <div className="sidebar-section grade-section">
          <GradeInput selectedNode={selectedNode} />
        </div>
      )}

      <SidebarSectionCard title={"Prerequisites"}>
        <PrerequisitesSection prereqs={selectedNode.data.prereqs} />
      </SidebarSectionCard>
    </div>
  );
}
