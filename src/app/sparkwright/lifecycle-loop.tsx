export type Stage = { label: string; tone?: "once" | "highlight" };

export default function LifecycleLoop({
  stages,
  label,
}: {
  stages: Stage[];
  label: string;
}) {
  return (
    <ol aria-label={label} className="mt-8 flex flex-wrap items-center gap-2">
      {stages.map((stage, i) => (
        <li key={stage.label} className="flex items-center gap-2">
          <span
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              stage.tone === "once"
                ? "border-orange/35 bg-orange/[0.06] text-orange-light"
                : stage.tone === "highlight"
                  ? "border-teal/40 bg-teal/[0.09] text-foreground"
                  : "border-border bg-surface text-foreground"
            }`}
          >
            {stage.label}
          </span>
          {i < stages.length - 1 && (
            <span aria-hidden="true" className="text-xs text-muted-foreground">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
