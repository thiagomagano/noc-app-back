import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
};

export const admins = sqliteTable("admins", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  phone: text().unique(),
  ...timestamps,
});

export const selectAdminsSchema = createSelectSchema(admins);

export const insertAdminsSchema = createInsertSchema(admins);

export const players = sqliteTable("players", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  skill: integer("skill_level").notNull(),
  phone: text("phone_number").notNull(),
  shirt: integer("shirt_number"),
  isGoalkeaper: integer("is_goalkeaper", { mode: "boolean" })
    .notNull()
    .default(false),
  image: text(),
  ...timestamps,
});
