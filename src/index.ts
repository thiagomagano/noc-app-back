import { serve } from "@hono/node-server";
import app from "@/app";
import env from "@/env";

import "dotenv/config";

const port = env?.PORT;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
