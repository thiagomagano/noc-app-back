import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

export function createRouter() {
  return new Hono({ strict: false });
}

export default function createApp() {
  const app = createRouter();
  app.use(cors());
  app.use(logger());

  app.notFound(notFound);
  app.onError(onError);
  app.use(serveEmojiFavicon("⚽"));

  return app;
}
