import { Panel } from "@xyflow/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Info } from "lucide-react";

export function Legend() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Panel position="bottom-left">
      {!isOpen ? (
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        >
          <Info />
          Legend
        </Button>
      ) : (
        <div className="rounded-lg border border-white/10 bg-zinc-950/10 p-3 text-xs text-zinc-200 shadow-lg backdrop-blur">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Legend
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-7 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] cursor-pointer"
            >
              Close
            </Button>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span>Completed course</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span>Failed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
              <span>Locked</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="h-px w-6 bg-zinc-400/70" />
              <span>Prerequisite edge</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="h-0 w-6 border-t border-dotted border-yellow-400" />
              <span>Prereq satisfied, next course not yet completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-0 w-6 border-t border-solid border-emerald-400" />
              <span>Prereq satisfied, both courses completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-0 w-6 border-t border-solid border-rose-400" />
              <span>Prereq not clear</span>
            </div>
          </div>
        </div>
      )}
    </Panel>
  );
}
