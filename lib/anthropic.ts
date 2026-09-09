import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

function getClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Anthropic({ apiKey });
  return client;
}

const PERSON_CONTEXT_MODEL = "claude-sonnet-5";

export async function generatePersonSummary(
  name: string,
  bookTitle: string
): Promise<string> {
  const anthropic = getClient();

  const demoMessage =
    `[Modo demo — falta o no es válida ANTHROPIC_API_KEY]\n\n` +
    `Aquí aparecería un resumen generado por IA de 15-20 líneas sobre ${name}: ` +
    `quién es, cuándo nació, patrimonio aproximado, empresas o logros principales, y un ` +
    `resumen breve de su vida y trayectoria. Configura una ANTHROPIC_API_KEY válida en el ` +
    `entorno para generar el contenido real.`;

  if (!anthropic) return demoMessage;

  try {
    const message = await anthropic.messages.create({
      model: PERSON_CONTEXT_MODEL,
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content:
            `Estás dentro de una app de lectura llamada Ledger. Un lector ha tocado el nombre ` +
            `"${name}", mencionado en el libro "${bookTitle}", para saber quién es esta persona real.\n\n` +
            `Escribe un resumen de 15-20 líneas, en español, con este contenido: quién es, cuándo nació ` +
            `(y falleció si aplica), patrimonio o logro económico relevante si se conoce, empresas o obras ` +
            `principales, y un resumen breve de su vida y trayectoria relevante al contexto del libro.\n\n` +
            `Si "${name}" no es una persona real identificable, dilo explícitamente en una sola línea ` +
            `en lugar de inventar datos. No uses markdown, solo texto plano en párrafos cortos.`,
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    return textBlock && textBlock.type === "text"
      ? textBlock.text.trim()
      : "No se ha podido generar el contexto en este momento.";
  } catch {
    return demoMessage;
  }
}
