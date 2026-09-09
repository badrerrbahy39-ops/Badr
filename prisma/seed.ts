import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const chapters = [
  {
    order: 1,
    title: "El interés compuesto",
    startPage: 1,
    endPage: 4,
    content: `Pocas fuerzas en las finanzas personales son tan poderosas, y tan mal entendidas, como el interés compuesto. {{Benjamin Franklin}} lo describió mejor que nadie cuando, en su testamento, dejó pequeñas sumas de dinero a las ciudades de Boston y Filadelfia con la condición de que se prestaran a artesanos jóvenes durante cien años antes de poder tocar el capital. Sabía que el tiempo, más que la cantidad inicial, era el verdadero motor del crecimiento.

La mayoría de la gente subestima esto porque nuestra intuición está entrenada para pensar en línea recta, no en curvas exponenciales. Una cantidad modesta, invertida con constancia durante décadas, puede superar con facilidad a una fortuna inicial mucho mayor que se queda quieta.

{{Warren Buffett}} suele repetir una idea parecida: la mayor parte de su patrimonio se construyó después de los cincuenta años, no porque sus decisiones de inversión mejoraran de golpe, sino porque el capital acumulado durante décadas empezó a moverse por sí solo. La paciencia, en sus palabras, es la verdadera ventaja competitiva del inversor particular frente a quien busca resultados inmediatos.

Entender esto cambia la pregunta que nos hacemos sobre el dinero. Ya no es "¿cuánto puedo ganar este año?", sino "¿qué decisiones de hoy seguirán generando valor dentro de veinte años?".`,
  },
  {
    order: 2,
    title: "Construir antes de gastar",
    startPage: 5,
    endPage: 9,
    content: `{{Andrew Carnegie}} llegó a Estados Unidos como inmigrante escocés sin apenas recursos y terminó controlando la mayor parte de la producción de acero del país. Su filosofía era simple de enunciar y difícil de practicar: reinvertir las ganancias en la propia capacidad productiva antes de aumentar el nivel de vida personal.

Esa misma lógica, aplicada a una economía doméstica, es la que separa a quienes acumulan patrimonio de quienes simplemente ganan un buen sueldo. No se trata de cuánto entra, sino de qué parte se convierte en algo que sigue produciendo cuando dejamos de trabajar.

{{John D. Rockefeller}} llevaba un registro personal de cada ingreso desde que era adolescente, mucho antes de fundar Standard Oil. Ese hábito de medir con precisión, decía, le enseñó a ver el dinero como un sistema con reglas propias, no como un premio aleatorio.

El patrón se repite en distintas épocas y sectores: quienes construyen patrimonio duradero tienden a posponer el consumo visible a cambio de capacidad productiva invisible. No es una cuestión de privación, sino de secuencia.`,
  },
  {
    order: 3,
    title: "El riesgo de no arriesgar nada",
    startPage: 10,
    endPage: 14,
    content: `{{Henry Ford}} pasó por varias quiebras antes de que la Ford Motor Company funcionara. Cada fracaso, según sus propias memorias, fue una fuente de información más valiosa que cualquier éxito temprano: le mostró con precisión qué suposiciones eran falsas.

Guardar dinero sin exponerlo nunca a ningún riesgo parece la opción prudente, pero tiene un coste silencioso: la inflación erosiona el poder adquisitivo del efectivo inmóvil año tras año. La verdadera pregunta no es si asumir riesgo, sino qué tipo de riesgo estamos dispuestos a entender y gestionar.

{{Warren Buffett}} distingue entre especular y invertir precisamente por esto: la especulación apuesta sobre movimientos de precio a corto plazo que nadie controla, mientras que la inversión se basa en entender un negocio o un activo lo bastante bien como para tolerar su volatilidad sin salir corriendo.

Al final, la relación de una persona con el dinero se parece mucho a un hábito de lectura: los resultados no llegan por una decisión aislada y brillante, sino por la repetición constante de decisiones razonables durante mucho tiempo.`,
  },
];

const catalog: {
  slug: string;
  title: string;
  author: string;
  description: string;
  category: string;
  totalPages: number;
  isPremium: boolean;
}[] = [
  {
    slug: "padre-rico-padre-pobre",
    title: "Padre Rico, Padre Pobre",
    author: "Robert Kiyosaki",
    description:
      "Qué enseñan los ricos a sus hijos sobre el dinero que las clases media y pobre no enseñan.",
    category: "finanzas",
    totalPages: 336,
    isPremium: true,
  },
  {
    slug: "el-hombre-mas-rico-de-babilonia",
    title: "El Hombre Más Rico de Babilonia",
    author: "George S. Clason",
    description:
      "Parábolas clásicas sobre ahorro, inversión y prosperidad ambientadas en la antigua Babilonia.",
    category: "finanzas",
    totalPages: 144,
    isPremium: false,
  },
  {
    slug: "la-psicologia-del-dinero",
    title: "La Psicología del Dinero",
    author: "Morgan Housel",
    description:
      "Lecciones atemporales sobre riqueza, avaricia y felicidad, y cómo se comporta realmente la gente con el dinero.",
    category: "finanzas",
    totalPages: 256,
    isPremium: true,
  },
  {
    slug: "piense-y-hagase-rico",
    title: "Piense y Hágase Rico",
    author: "Napoleon Hill",
    description:
      "Los principios de éxito extraídos del estudio de cientos de personas que amasaron grandes fortunas.",
    category: "mentalidad",
    totalPages: 320,
    isPremium: true,
  },
  {
    slug: "mindset-la-actitud-del-exito",
    title: "Mindset: La Actitud del Éxito",
    author: "Carol S. Dweck",
    description:
      "Cómo la mentalidad de crecimiento frente a la mentalidad fija determina el éxito en los negocios, el deporte y la vida.",
    category: "mentalidad",
    totalPages: 288,
    isPremium: true,
  },
  {
    slug: "habitos-atomicos",
    title: "Hábitos Atómicos",
    author: "James Clear",
    description:
      "Un método sencillo y probado para construir buenos hábitos y eliminar los malos, paso a paso.",
    category: "desarrollo-personal",
    totalPages: 320,
    isPremium: true,
  },
  {
    slug: "el-poder-de-los-habitos",
    title: "El Poder de los Hábitos",
    author: "Charles Duhigg",
    description:
      "Por qué hacemos lo que hacemos en la vida y en los negocios, y cómo transformar los hábitos que nos frenan.",
    category: "desarrollo-personal",
    totalPages: 400,
    isPremium: true,
  },
  {
    slug: "como-ganar-amigos-e-influir-sobre-las-personas",
    title: "Cómo Ganar Amigos e Influir sobre las Personas",
    author: "Dale Carnegie",
    description:
      "El clásico manual de relaciones humanas para generar confianza, persuadir y liderar con carisma.",
    category: "carisma",
    totalPages: 288,
    isPremium: true,
  },
  {
    slug: "steve-jobs",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    description:
      "La biografía autorizada del cofundador de Apple, basada en más de cuarenta entrevistas con él mismo.",
    category: "biografia",
    totalPages: 656,
    isPremium: true,
  },
];

async function main() {
  const book = await db.book.upsert({
    where: { slug: "principios-del-dinero" },
    update: {},
    create: {
      slug: "principios-del-dinero",
      title: "Los Principios del Dinero",
      author: "Ledger (libro de prueba)",
      description:
        "Libro de demostración usado para validar el lector y el contexto de personas reales generado por IA. No es contenido comercial.",
      category: "finanzas",
      totalPages: 14,
      isPremium: false,
      chapters: {
        create: chapters,
      },
    },
    include: { chapters: true },
  });

  console.log(`Seeded book "${book.title}" (${book.id}) with ${book.chapters.length} chapters.`);

  for (const entry of catalog) {
    await db.book.upsert({
      where: { slug: entry.slug },
      update: {},
      create: entry,
    });
  }

  console.log(`Seeded ${catalog.length} catalog-only books.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
