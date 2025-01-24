import { drizzle } from "drizzle-orm/node-postgres";
import env from "@/env";

const db = drizzle({ connection: env.DATABASE_URL, casing: "snake_case" });
