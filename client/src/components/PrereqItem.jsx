const courseStatusClasses = {
  clear: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  notClear: "text-rose-300 border-rose-400/50 bg-rose-400/10",
  incomplete: "text-zinc-300 border-zinc-400/40 bg-zinc-400/10",
};

const typeTheme = {
  course: {
    container: "border-zinc-800/80 bg-zinc-950/40",
    header: "text-zinc-400",
    value: "text-zinc-100",
  },
  credit_hours: {
    container: "border-amber-500/30 bg-amber-500/5",
    header: "text-amber-400/70",
    value: "text-amber-200",
    pill: "border-amber-400/40 bg-amber-400/10 text-amber-400",
    title: "Credit Hour Requirement",
  },
  permission: {
    container: "border-purple-500/30 bg-purple-500/5",
    header: "text-purple-400/70",
    value: "text-purple-200",
    pill: "border-purple-400/40 bg-purple-400/10 text-purple-400",
    title: "Permission Required",
  },
};

export function PrereqItem({ item }) {
  const isInfoType =
    item.itemType === "credit_hours" || item.itemType === "permission";

  const theme = typeTheme[item.itemType] ?? typeTheme.course;

  const topText = isInfoType ? theme.title : item.msg;
  const mainText =
    item.itemType === "credit_hours"
      ? `Requires ${item.value} credit hours`
      : item.itemType === "permission"
        ? item.description
        : item.prereqId;

  const badgeText = isInfoType ? "info" : item.status;
  const badgeClass = isInfoType
    ? theme.pill
    : (courseStatusClasses[item.status] ??
      "text-zinc-200 border-zinc-700/70 bg-zinc-700/20");

  return (
    <div className={`mb-2 rounded-lg border px-3 py-2 ${theme.container}`}>
      <p className={`pb-2 text-xs ${theme.header}`}>{topText}</p>

      <div className="flex items-center justify-between">
        <span className={`text-sm font-semibold ${theme.value}`}>{mainText}</span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${badgeClass}`}
        >
          {badgeText}
        </span>
      </div>
    </div>
  );
}