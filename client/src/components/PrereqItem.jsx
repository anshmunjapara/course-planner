const statusPillClasses = {
  clear: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  notClear: "text-rose-300 border-rose-400/50 bg-rose-400/10",
  incomplete: "text-zinc-300 border-zinc-400/40 bg-zinc-400/10",
};

export function PrereqItem({ item }) {
  if (item.itemType === "credit_hours") {
    return (
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 mb-2">
        <p className="pb-1 text-xs text-amber-400/70">
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
  } else if (item.itemType === "permission") {
    return (
      <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 px-3 py-2 mb-2">
        <p className="pb-1 text-xs text-purple-400/70">Permission Required</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-purple-200">
            {item.description}
          </span>
          <span className="rounded-full border border-purple-400/40 bg-purple-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-400">
            info
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 px-3 py-2 mb-2">
        <p className="pb-2 text-xs text-zinc-400">{item.msg}</p>
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
}
