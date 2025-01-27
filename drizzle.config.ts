import env from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    // url: env.DATABASE_URL,
    url: "postgres://postgres:mypassword@localhost:5432/postgres",
  },
  verbose: true,
  strict: true,
});
