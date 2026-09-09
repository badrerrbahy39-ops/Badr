import { parsePersonMarkers } from "@/lib/personMarkers";

export function ChapterText({
  content,
  onSelectPerson,
}: {
  content: string;
  onSelectPerson: (name: string) => void;
}) {
  const paragraphs = content.trim().split(/\n\s*\n/);

  return (
    <div className="space-y-5 text-lg leading-relaxed text-neutral-800 dark:text-neutral-200">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>
          {parsePersonMarkers(paragraph).map((segment, j) =>
            segment.type === "text" ? (
              <span key={j}>{segment.value}</span>
            ) : (
              <button
                key={j}
                type="button"
                onClick={() => onSelectPerson(segment.name)}
                className="rounded px-0.5 font-medium text-amber-700 underline decoration-amber-400 decoration-2 underline-offset-2 transition hover:bg-amber-100 dark:text-amber-400 dark:decoration-amber-600 dark:hover:bg-amber-900/30"
              >
                {segment.name}
              </button>
            )
          )}
        </p>
      ))}
    </div>
  );
}
