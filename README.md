# EVK Logistic — Cotizador CBM

Copia independiente del cotizador de Taller Gregoriana. Tiene su propio repositorio,
su propio despliegue en Vercel y su propia base de datos en Supabase: nada de lo que
se guarde aquí llega al otro proyecto, ni al revés.

## Dónde vive

- Código: `vjzuniromero89-stack/EVKcotizador` (rama `main`; cada push publica en Vercel).
- Sitio: https://evkcotizador.vercel.app
- Base de datos: proyecto Supabase `evk-logistic` (`atltdrpxseildyvfeltq`).

## Cómo está armado

- `src/App.jsx` — la aplicación interna. `src/Catalogo.jsx` — catálogos y enlaces del cliente.
- `worker.js` — la API (`/api/*`) y `/runtime-config.js`, delante de Supabase.
- `api/index.js` + `vercel.json` — hacen que Vercel ejecute ese mismo `worker.js`.
- `migrations/` — el esquema de la base (4 tablas: productos, cotizaciones_clientes,
  cotizaciones_internas, configuracion).

## Variables en Vercel

`SUPABASE_URL` y `SUPABASE_ANON_KEY` (la clave publishable; nunca `service_role` ni
`sb_secret_`, porque la aplicación la comparte con el navegador).

## Comprobaciones

```bash
npm run build
npm test
```

`npm run dev` inicia solo Vite, con respuestas de prueba para el catálogo del cliente.
Después de publicar, https://evkcotizador.vercel.app/api/health debe mostrar `ok: true`.
