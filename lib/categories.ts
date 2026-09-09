export const CATEGORY_LABELS: Record<string, string> = {
  finanzas: "Finanzas",
  "desarrollo-personal": "Desarrollo personal",
  mentalidad: "Mentalidad",
  carisma: "Carisma",
  biografia: "Biografía",
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}
