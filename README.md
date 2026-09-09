# Ledger

Web app de suscripción para terminar libros de finanzas y desarrollo personal:
meta diaria de páginas, lectura integrada (nunca se descarga) y contexto generado
por IA sobre las personas reales mencionadas en el texto.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- PostgreSQL + Prisma
- NextAuth (Credentials) para registro/login
- Stripe para la suscripción premium
- Anthropic API (Claude) para las recomendaciones del onboarding y el contexto
  de personas

## Desarrollo

1. Copia `.env.example` a `.env` y rellena las variables (como mínimo
   `DATABASE_URL`; el resto tienen fallback en modo demo si faltan).
2. Instala dependencias y prepara la base de datos:

   ```bash
   npm install
   npx prisma migrate dev
   npm run db:seed
   ```

3. Arranca el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Abre [http://localhost:3000](http://localhost:3000).

## Notas sobre el modo demo

- Sin `ANTHROPIC_API_KEY`, el contexto de personas y las recomendaciones del
  onboarding devuelven contenido de demostración en vez de fallar.
- Sin `STRIPE_SECRET_KEY` / `STRIPE_PRICE_ID_PREMIUM`, el botón "Actualizar a
  Premium" muestra un aviso en vez de romper el flujo.

## Estructura

- `app/` — rutas (App Router): landing, onboarding, librería, lector, cuenta,
  y API routes.
- `components/` — componentes de UI, agrupados por área (reader, library,
  account, layout).
- `lib/` — clientes compartidos (Prisma, NextAuth, Anthropic, Stripe) y
  utilidades.
- `prisma/schema.prisma` — modelo de datos. `prisma/seed.ts` — libro de prueba
  con capítulos completos (`Los Principios del Dinero`) más un catálogo de
  libros de referencia (solo metadata) para probar librería y onboarding.
