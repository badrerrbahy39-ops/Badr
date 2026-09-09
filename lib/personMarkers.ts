export type ContentSegment =
  | { type: "text"; value: string }
  | { type: "person"; name: string };

const MARKER_PATTERN = /\{\{([^}]+)\}\}/g;

export function parsePersonMarkers(paragraph: string): ContentSegment[] {
  const segments: ContentSegment[] = [];
  let lastIndex = 0;

  for (const match of paragraph.matchAll(MARKER_PATTERN)) {
    const [full, name] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      segments.push({ type: "text", value: paragraph.slice(lastIndex, index) });
    }
    segments.push({ type: "person", name: name.trim() });
    lastIndex = index + full.length;
  }

  if (lastIndex < paragraph.length) {
    segments.push({ type: "text", value: paragraph.slice(lastIndex) });
  }

  return segments;
}
