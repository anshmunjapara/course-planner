import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GradeInput } from "./components/GradeInput";
import { getEdgeStatus } from "./utils/getEdgeStatus";
import { categorizePrereqs } from "./utils/categorizePrereqs";

const statusPillClasses = {
  clear: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  notClear: "text-rose-300 border-rose-400/50 bg-rose-400/10",
  incomplete: "text-zinc-300 border-zinc-400/40 bg-zinc-400/10",
};

export function Sidebar({ selectedNode, onChangeGrade, userGrades }) {
  const handleGradeSubmit = (newGrade) => {
    onChangeGrade(newGrade);
  };

  if (!selectedNode) {
    return (
      <div className="lg:flex-1 md:flex-2 h-screen shrink-0 overflow-y-auto border-l border-zinc-800 bg-zinc-950 text-zinc-100 shadow-xl">
        <div className="flex h-full items-center justify-center px-6 text-m font-medium text-zinc-400">
          <p>Click on a course to view details</p>
        </div>
      </div>
    );
  }

  const categorizePrereqsRes = categorizePrereqs(selectedNode.data.prereqs);
  console.log(categorizePrereqsRes);
  const requiredPrereqs = categorizePrereqsRes.required;
  const choiceGroupPrereqs = categorizePrereqsRes.choiceGroups;
  let choiceGroupPrereqsWithStatus = []; // [[{prereqId, status, msg}, ...], [...]]]

  const requiredPrereqListWithStatus = requiredPrereqs.map((prereqId) => {
    const { status, msg } = getEdgeStatus(
      selectedNode.data.prereqs,
      prereqId,
      userGrades[prereqId],
    );

    return { prereqId, status, msg };
  });
  console.log(requiredPrereqListWithStatus);
  choiceGroupPrereqs.forEach((group) => {
    const res = [];
    group.forEach((prereqId) => {
      const { status, msg } = getEdgeStatus(
        selectedNode.data.prereqs,
        prereqId,
        userGrades[prereqId],
      );
      if (status !== "error") {
        res.push({
          prereqId,
          status,
          msg,
        });
      }
    });
    return choiceGroupPrereqsWithStatus.push(res);
  });

  return (
    <div className="lg:flex-1 md:flex-2 h-screen shrink-0 overflow-y-auto border-l border-zinc-00 bg-zinc-950 text-zinc-100 shadow-xl">
      <div className="flex flex-col gap-7 px-6 py-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {selectedNode.data.label}
        </h2>

        {selectedNode.data.description && (
          <Card className="border-zinc-800/80 bg-zinc-900/40 shadow-none">
            <CardHeader className="pb-px">
              <CardTitle className="text-lg font-semibold uppercase text-zinc-400">
                Description
              </CardTitle>
              <CardDescription className="text-m leading-6 text-zinc-300">
                {selectedNode.data.description}
              </CardDescription>
            </CardHeader>
          </Card>
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

        <Card className="border-zinc-800/80 bg-zinc-900/40 shadow-none">
          <CardHeader>
            <CardTitle className="text-lg font-semibold uppercase text-zinc-400">
              Prerequisites
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {requiredPrereqListWithStatus.length !== 0 &&
              requiredPrereqListWithStatus.map(({ prereqId, status, msg }) => (
                <div
                  key={prereqId}
                  className=" rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-3 py-2"
                >
                  <p className="text-xs text-zinc-400 pb-2">{msg}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-100">
                      {prereqId}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                        statusPillClasses[status] ??
                        "text-zinc-200 border-zinc-700/70 bg-zinc-700/20"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>
              ))}

            {choiceGroupPrereqsWithStatus.length > 0 && (
              <>
                <hr className="border-zinc-700/50" />
                {choiceGroupPrereqsWithStatus.map((group, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-xs text-zinc-400">
                      Satisfy at least one of the following:
                    </p>
                    {group.map(({ prereqId, status, msg }) => (
                      <div
                        key={prereqId}
                        className=" rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-3 py-2"
                      >
                        <p className="text-xs text-zinc-400 pb-2">{msg}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-zinc-100">
                            {prereqId}
                          </span>
                          <span
                            className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                              statusPillClasses[status] ??
                              "text-zinc-200 border-zinc-700/70 bg-zinc-700/20"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
