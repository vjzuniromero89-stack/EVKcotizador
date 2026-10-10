/** Vercel: ejecuta el mismo worker.js que atiende /api/* y /runtime-config.js. */
import worker from "../worker.js";

export const config = { runtime: "edge" };

const noExiste = () => new Response(JSON.stringify({ ok: false, error: "No existe." }), {
  status: 404,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});

export default function handler(request) {
  const url = new URL(request.url);
  // vercel.json envía aquí la ruta original en "__ruta".
  const ruta = url.searchParams.get("__ruta");
  if (ruta != null) {
    url.searchParams.delete("__ruta");
    url.pathname = ruta.startsWith("/") ? ruta : `/api/${ruta}`;
  }
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
    ASSETS: { fetch: noExiste },
  };
  return worker.fetch(new Request(url, request), env);
}
