import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
};

export const adminsTable = pgTable("admins", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  phone: varchar({ length: 30 }).unique(),
  ...timestamps,
});

export const playersTable = pgTable("players", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 30 }).notNull(),
  position: varchar({ length: 30 }).notNull(),
  skill: varchar({ length: 30 }).notNull(),
  wins: integer(),
  games: integer(),
  shirt: integer(),
  image: varchar(),
  ...timestamps,
});
