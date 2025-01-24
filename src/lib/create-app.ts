import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

const app = new Hono();

// TODO: Importar Rotas

export default function createApp() {
  app.use(cors());
  app.use(logger());

  app.notFound(notFound);
  app.onError(onError);
  app.use(serveEmojiFavicon("⚽"));

  return app;
}
