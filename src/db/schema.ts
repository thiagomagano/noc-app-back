import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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

export const players = sqliteTable("players", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  phone: text("phone_number").notNull(),
  email: text(),
  skill: integer("skill_level").notNull(),
  stamina: integer().notNull(),
  shirt: integer("shirt_number"),
  isGoalkeeper: integer("is_goalkeaper", { mode: "boolean" })
    .notNull()
    .default(false),
  image: text(),
  ...timestamps,
});
