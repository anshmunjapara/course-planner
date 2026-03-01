import { GradeInput } from "./components/GradeInput";
import { SidebarSectionCard } from "./components/SidebarSectionCard";
import { getEdgeStatus } from "./utils/getEdgeStatus";
import { categorizePrereqs } from "./utils/categorizePrereqs";

const statusPillClasses = {
  clear: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  notClear: "text-rose-300 border-rose-400/50 bg-rose-400/10",
  incomplete: "text-zinc-300 border-zinc-400/40 bg-zinc-400/10",
};

export function CourseInfoSidebar({ selectedNode, onChangeGrade, userGrades }) {
  const handleGradeSubmit = (newGrade) => {
    onChangeGrade(newGrade);
  };

  if (!selectedNode) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-m font-medium text-zinc-400">
        <p>Click on a course to view details</p>
      </div>
    );
  }

  const categorizePrereqsRes = categorizePrereqs(selectedNode.data.prereqs);
  console.log(categorizePrereqsRes);
  const requiredPrereqs = categorizePrereqsRes.required;
  const choiceGroupPrereqs = categorizePrereqsRes.choiceGroups;
  let choiceGroupPrereqsWithStatus = []; // [[{prereqId, status, msg}, ...], [...]]]

  // Process required prereqs — items can be strings (courseIds) or objects (credit_hours/permission)
  const requiredPrereqsWithStatus = requiredPrereqs.map((item) => {
    if (typeof item === "object") {
      return { itemType: item.type, ...item };
    }
    const prereqId = item;
    const { status, msg } = getEdgeStatus(
      selectedNode.data.prereqs,
      prereqId,
      userGrades[prereqId],
    );
    return { itemType: "course", prereqId, status, msg };
  });

  // Process choice groups — items can also be strings or objects
  choiceGroupPrereqs.forEach((group) => {
    const res = group
      .map((item) => {
        if (typeof item === "object") {
          return { itemType: item.type, ...item };
        }
        const prereqId = item;
        const { status, msg } = getEdgeStatus(
          selectedNode.data.prereqs,
          prereqId,
          userGrades[prereqId],
        );
        if (status === "error") return null;
        return { itemType: "course", prereqId, status, msg };
      })
      .filter(Boolean);
    choiceGroupPrereqsWithStatus.push(res);
  });

  const hasAnyPrereqs =
    requiredPrereqsWithStatus.length > 0 ||
    choiceGroupPrereqsWithStatus.length > 0;

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
          <GradeInput
            selectedNode={selectedNode}
            onChangeGrade={handleGradeSubmit}
            userGrades={userGrades}
          />
        </div>
      )}

      <SidebarSectionCard title={"Prerequisites"}>
        {!hasAnyPrereqs && (
          <p className="text-sm text-zinc-500 italic">
            No prerequisites required
          </p>
        )}

        {requiredPrereqsWithStatus.map((item, index) =>
          renderPrereqItem(item, `req-${index}`),
        )}

        {choiceGroupPrereqsWithStatus.length > 0 && (
          <>
            {requiredPrereqsWithStatus.length > 0 && (
              <hr className="border-zinc-700/50" />
            )}
            {choiceGroupPrereqsWithStatus.map((group, index) => (
              <div key={index} className="space-y-2">
                <p className="text-xs text-zinc-400">
                  Satisfy at least one of the following:
                </p>
                {group.map((item, itemIndex) =>
                  renderPrereqItem(item, `choice-${index}-${itemIndex}`),
                )}
              </div>
            ))}
          </>
        )}
      </SidebarSectionCard>
    </div>
  );
}

function renderPrereqItem(item, key) {
  if (item.itemType === "credit_hours") {
    return (
      <div
        key={key}
        className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2"
      >
        <p className="text-xs text-amber-400/70 pb-1">
          Credit Hour Requirement
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-amber-200">
            Requires {item.value} credit hours
          </span>
          <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-400">
            info
          </span>
        </div>
      </div>
    );
  }

  if (item.itemType === "permission") {
    return (
      <div
        key={key}
        className="rounded-lg border border-purple-500/30 bg-purple-500/5 px-3 py-2"
      >
        <p className="text-xs text-purple-400/70 pb-1">Permission Required</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-purple-200">
            {item.description}
          </span>
          <span className="rounded-full border border-purple-400/40 bg-purple-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-400">
            Info
          </span>
        </div>
      </div>
    );
  }

  // Default: course prereq
  return (
    <div
      key={key}
      className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-3 py-2"
    >
      <p className="text-xs text-zinc-400 pb-2">{item.msg}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-100">
          {item.prereqId}
        </span>
        <span
          className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
            statusPillClasses[item.status] ??
            "text-zinc-200 border-zinc-700/70 bg-zinc-700/20"
          }`}
        >
          {item.status}
        </span>
      </div>
    </div>
  );
}
