import { useMemo } from "react";
import { categorizePrereqs } from "@/utils/categorizePrereqs";
import { getEdgeStatus } from "@/utils/getEdgeStatus";
import { PrereqItem } from "./PrereqItem";

export function PrerequisitesSection({ prereqs, userGrades }) {
  const {
    requiredPrereqsWithStatus,
    choiceGroupPrereqsWithStatus,
    hasAnyPrereqs,
  } = useMemo(() => {
    const safePrereqs = prereqs ?? {};

    const { required, choiceGroups } = categorizePrereqs(safePrereqs);

    const requiredPrereqsWithStatus = required.map((item) => {
      if (typeof item === "object") return { itemType: item.type, ...item };

      const prereqId = item;
      const { status, msg } = getEdgeStatus(
        safePrereqs,
        prereqId,
        userGrades?.[prereqId],
      );
      return { itemType: "course", prereqId, status, msg };
    });

    const choiceGroupPrereqsWithStatus = choiceGroups
      .map((group) =>
        group
          .map((item) => {
            if (typeof item === "object")
              return { itemType: item.type, ...item };

            const prereqId = item;
            const { status, msg } = getEdgeStatus(
              safePrereqs,
              prereqId,
              userGrades?.[prereqId],
            );
            if (status === "error") return null;
            return { itemType: "course", prereqId, status, msg };
          })
          .filter(Boolean),
      )
      .filter((g) => g.length > 0);

    const hasAnyPrereqs =
      requiredPrereqsWithStatus.length > 0 ||
      choiceGroupPrereqsWithStatus.length > 0;

    return {
      requiredPrereqsWithStatus,
      choiceGroupPrereqsWithStatus,
      hasAnyPrereqs,
    };
  }, [prereqs, userGrades]);

  if (!hasAnyPrereqs)
    return (
      <p className="text-sm text-zinc-500 italic">No prerequisites required</p>
    );

  return (
    <>
      {requiredPrereqsWithStatus.map((item, index) => {
        return (
          <PrereqItem key={`req-${index}`} item={item} />
        );
      })}

      {choiceGroupPrereqsWithStatus.length > 0 && (
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-700/50" />
          <p className="shrink-0 text-xs font-medium tracking-wide text-zinc-400">
            Satisfy at least one of the following
          </p>
          <div className="h-px flex-1 bg-zinc-700/50" />
        </div>
      )}

      {choiceGroupPrereqsWithStatus.map((group, index) => (
        <div key={`choice-group-${index}`}>
          {group.map((item, itemIndex) => (
            <PrereqItem key={`choice-${index}-${itemIndex}`} item={item} />
          ))}
        </div>
      ))}
    </>
  );
}
